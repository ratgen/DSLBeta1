package dk.sdu.bdd.xtext.web.services;

import java.util.ArrayList;
import java.util.HashMap;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.xtext.web.server.IServiceContext;
import org.eclipse.xtext.web.server.InvalidRequestException;
import org.eclipse.xtext.web.server.XtextServiceDispatcher;
import org.eclipse.xtext.web.server.model.IWebResourceSetProvider;
import org.eclipse.xtext.AbstractElement;
import org.eclipse.xtext.AbstractRule;
import org.eclipse.xtext.Alternatives;
import org.eclipse.xtext.Assignment;
import org.eclipse.xtext.CrossReference;
import org.eclipse.xtext.Grammar;
import org.eclipse.xtext.Group;
import org.eclipse.xtext.Keyword;
import org.eclipse.xtext.ParserRule;
import org.eclipse.xtext.RuleCall;
import dk.sdu.bdd.xtext.services.BddDslGrammarAccess;
import dk.sdu.bdd.xtext.web.services.blockly.blocks.Block;
import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Fields.FieldDropdown;
import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Inputs.InputStatement;
import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Inputs.InputValue;
import dk.sdu.bdd.xtext.web.services.blockly.toolbox.Category;
import dk.sdu.bdd.xtext.web.services.blockly.toolbox.CategoryItem;
import dk.sdu.bdd.xtext.web.services.blockly.toolbox.CategoryToolBox;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.inject.Inject;

public class AstServiceDispatcher extends XtextServiceDispatcher {
	@Inject
	private IWebResourceSetProvider resourceSetProvider;
	
	@Inject
	private BddDslGrammarAccess grammarAccess;
	
	private static HashMap<String, HashMap<String, ArrayList<String>>> blockFeatures = new HashMap<>(); 
	
	@Override
	protected ServiceDescriptor createServiceDescriptor(String serviceType, IServiceContext context){
		if (serviceType != null) {
			switch (serviceType) {
				case "ast":
					return getAstService(context);
				default:
					return super.createServiceDescriptor(serviceType, context);
			}
		} 
		else {
			throw new InvalidRequestException("The service type '" + serviceType + "' is not supported.");
		}
	}
	
	ServiceDescriptor getAstService(IServiceContext context) {
		String resource = context.getParameter("resource");
		ResourceSet resourceSet = resourceSetProvider.get(resource, context);
		
		EList<Resource> list = resourceSet.getResources();
		for (Resource item : list) {
			//used for working with the AST.
			URI uri = item.getURI();
			EList<EObject> objectContents = item.getContents();
		}
		
		//TODO: Better categoires
		//setup toolbox
		CategoryToolBox toolBox = new CategoryToolBox();
		Category all = new Category("all");
		toolBox.addCategory(all);
		
		ArrayList<Block> blockArray = new ArrayList<>();
		blockArray.addAll(parseGrammar(grammarAccess.getGrammar(), all));
		
		ObjectMapper objectMapper = new ObjectMapper();
		//remove all fields that are null;
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		
		try {
			String blockarr = objectMapper.writeValueAsString(blockArray);
			String toolboxstr = objectMapper.writeValueAsString(toolBox);
			
			ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
			serviceDescriptor.setService(() -> {
		        return new AstServiceResult(blockarr, toolboxstr);
		     });
			return serviceDescriptor;
		} catch (JsonProcessingException e) {
 			ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
			serviceDescriptor.setService(() -> {
		        return new AstServiceResult("err", "err");
		     });
			e.printStackTrace();
			return serviceDescriptor;

		}
		
		
	}
	
	ArrayList<Block> parseGrammar(Grammar grammar, Category categoryContent) {
		ArrayList<Block> blockArray = new ArrayList<>();
		EList<AbstractRule> rules = grammar.getRules();

		for (AbstractRule rule : rules) {
			System.out.println("rule: " + rule.getName());
			if (rule instanceof ParserRule) {
				ParserRule parserRule = (ParserRule) rule;
				Block block = parseRule(parserRule);
				// TODO: rule specific code
				if(rule.getName().equals("Model")) {
					block.setOutput(null);
				}
				
				blockArray.add(block);
				categoryContent.addCategoryItem(new CategoryItem(block.getType())); 
				
				System.out.println("rule contents: \n" + dump(rule, "    ")); 
				
			}
		}
		
		return blockArray;
	}
	
	//Parse a rule and return a Blockly Block representing the Rule
	private Block parseRule(ParserRule rule) {
		
		Block block = new Block(rule.getName());
		
		TreeIterator<EObject> iterator =  rule.eAllContents();
				
		while(iterator.hasNext()) {
			EObject next = iterator.next();
			
			boolean prune = parseLoop(next, block);
		
			if (prune) {
				iterator.prune();
			}
			
		}
			
		return block;
	}
	
	private boolean parseLoop(EObject obj, Block block) {
		
		if (obj instanceof Group) {
			Group group = (Group) obj;
			if (group.getCardinality() == null) {
				//continue walking the tree;
				return false;
			} 
			return parseGroup(group, block);
		}
		
		if (obj instanceof Keyword) {
			Keyword keyWord = (Keyword) obj;
			return parseKeyword(keyWord, block);
		} 
		
		if (obj instanceof RuleCall) {
			RuleCall rule = (RuleCall) obj;
			return parseRuleCall(rule, block);			
		}
		
		if (obj instanceof Alternatives) {			
			Alternatives alternatives = (Alternatives) obj;
			return parseAlternatives(alternatives, block);
			
		}
		if (obj.getClass() == CrossReference.class) {
		}
		return false;
	}

	private boolean parseAlternatives(Alternatives alternatives, Block block) {
		
		FieldDropdown dropDown = new FieldDropdown("alternativs");
		getDropDownArgumentOptions(alternatives, dropDown);		
		//use a dropdown menu to select between alternatives
		dropDown.addOption(" ");
		
		if (alternatives.getCardinality() == null) {
			
		}
		
		else if (alternatives.getCardinality().equals("*")) {
			InputStatement inputStatement = new InputStatement("alternatives_statement");
			for (EObject item : alternatives.eContents()) {
				if (item instanceof Assignment) {
					Assignment assign = (Assignment) item;
					RuleCall ele = (RuleCall) assign.getTerminal();
					AbstractRule rule = ele.getRule();
					inputStatement.addCheck(rule.getName());
				}
			}
			block.addArgument(inputStatement);
		}

		
		block.addArgument(dropDown);
		return true;
	}

	private void getDropDownArgumentOptions(Alternatives alternatives, FieldDropdown dropDown) {
		
		for (EObject content : alternatives.eContents()) {
			if (content instanceof Keyword) {
				Keyword keyWord = (Keyword) content;
				dropDown.addOption(keyWord.getValue());
			}
			
			if(content instanceof Group) {
				String option = "";
				EList<EObject> groupContent = content.eContents();
				
				for (EObject groupMember : groupContent) {
					if (groupMember instanceof Keyword) {
						Keyword keyWord = (Keyword) groupMember;
						option = option.concat(keyWord.getValue() + " ");
					}
					
				}
				if (option != "") {
					dropDown.addOption(option);
				}
			}
			if (content instanceof Assignment) {
				Assignment assign = (Assignment) content;
				ParserRule rule = (ParserRule) assign.eContents().get(0).eCrossReferences().get(0);
			
				dropDown.addOption(rule.getName());
			}
			if (content instanceof RuleCall) {
				RuleCall call = (RuleCall) content;
				AbstractRule rule = call.getRule();
				
				dropDown.addRule(rule.getName());
			}
			if (content instanceof Assignment) {
				Assignment assign = (Assignment) content;
				RuleCall ruleCall = (RuleCall) assign.getTerminal();
				AbstractRule rule =  ruleCall.getRule();
				dropDown.addRule(rule.getName());
			}
		}
	}

	private boolean parseRuleCall(RuleCall rule, Block block) {
		AbstractRule abstractRule = rule.getRule();
		
		InputValue argument = new InputValue("name_" + abstractRule.getName());
		argument.addCheck(abstractRule.getName());

		
		return false;
	}

	private boolean parseKeyword(Keyword keyWord, Block block) {
		
		if (keyWord.getCardinality() == null) {
			block.addMessage(keyWord.getValue() + " ");
		}
		//TODO: create dropdown as it is optional
		else if (keyWord.getCardinality().equals("?")) {
			
		}
		return false;
	}

	private boolean parseGroup(Group group, Block block) {
		
		FieldDropdown argument = new FieldDropdown("optionalGroup");
		for (AbstractElement groupMember : group.getElements() ) {
			if (groupMember instanceof Keyword) {
				Keyword keyWord = (Keyword) groupMember;
				argument.addOption(keyWord.getValue() + " ");
			}
		}
		
		if (group.getCardinality().equals("*")) {
			block.addMessage("this");
			block.addArgument(new InputStatement("this"));
		}
		
		if (group.getCardinality().equals("?")) {
			argument.addOption(" ");
		}

		return true;
	}
	
	private static String dump(EObject mod_, String indent) {
		
	    var res = indent + mod_.toString().replaceFirst(".*[.]impl[.](.*)Impl[^(]*", "$1 ");
	    
	   
	    for (EObject a :mod_.eCrossReferences()) {
	        res +=  "->" + a.toString().replaceFirst(".*[.]impl[.](.*)Impl[^(]*", "$1 ");
	    }
	    res += "\n";
	    for (EObject f :mod_.eContents()) {
	        res += dump(f, indent+"    ");
	    }
	    
	    return res;
	}
}
