package dk.sdu.bdd.xtext.web.services;

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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
import org.eclipse.xtext.TerminalRule;
import org.eclipse.xtext.impl.RuleCallImpl;

import dk.sdu.bdd.xtext.services.BddDslGrammarAccess;

import com.google.inject.Inject;

public class AstServiceDispatcher extends XtextServiceDispatcher {
	@Inject
	private IWebResourceSetProvider resourceSetProvider;
	
	@Inject
	private BddDslGrammarAccess grammarAccess;
		
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
			URI uri = item.getURI();
			EList<EObject> objectContents = item.getContents();
		}
		
		
		//setup toolbox
		JSONObject toolbox = new JSONObject();
		toolbox.put("kind", "categoryToolbox");
		
		//contents toolbox
		JSONArray toolboxContents = new JSONArray();
		toolbox.put("contents", toolboxContents);

		
		JSONObject category = new JSONObject();
		category.put("kind", "category");
		category.put("name", "all");
		
		
		toolboxContents.add(category);
		
		JSONArray categoryContent = new JSONArray();
		category.put("contents", categoryContent);
		
		JSONArray blockArray = new JSONArray();


		blockArray.addAll(parseGrammar(grammarAccess.getGrammar(), categoryContent));
		//blockArray.addAll(parseGrammar(grammarAccess.getTerminalsGrammarAccess().getGrammar(), categoryContent));
		
		//addIdBlock(categoryContent, blockArray);

		
		ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
		serviceDescriptor.setService(() -> {
	        return new AstServiceResult(blockArray.toJSONString(), toolbox.toJSONString());
	     });
		return serviceDescriptor;
	}

	private void addIdBlock(JSONArray categoryContent, JSONArray blockArray) {
		//add terminals
		JSONObject id = new JSONObject();
		id.put("type", "ID");
		id.put("message0", "%1");
		id.put("output", "ID");

		
		JSONObject text = new JSONObject();
		text.put("type", "field_input");
		text.put("name", "ID");
		text.put("text", "your_id");
		text.put("spellcheck", false);
		
		JSONArray add = new JSONArray();
		add.add(text);
		
		id.put("args0", add);
		
		blockArray.add(id);
		
		JSONObject cc = new JSONObject();
		cc.put("kind", "block");
		cc.put("type", "ID");
		categoryContent.add(cc);
	}
	
	JSONArray parseGrammar(Grammar grammar, JSONArray categoryContent) {
		JSONArray blockArray = new JSONArray();
		EList<AbstractRule> rules = grammar.getRules();

		for (AbstractRule rule : rules) {
			System.out.println("rule: " + rule.getName());
			System.out.println(rule);
			if (rule instanceof ParserRule) {
				ParserRule parserRule = (ParserRule) rule;
					
				JSONObject block = parseRule(parserRule);
				
				// TODO: rule specific code
				if(rule.getName().equals("Model")) {
					block.remove("output");
				}
				
				blockArray.add(block);

				
				JSONObject catItem = new JSONObject();
				catItem.put("kind", "block");
				catItem.put("type",  block.get("type"));
				
				
				categoryContent.add(catItem);

				//System.out.println(block);
				if (rule.getName().equals("Scenario") || rule.getName().equals("Model")) {
					System.out.println("rule contents: \n" + dump(rule, "    ")); 
				}
				
			}
			if (rule instanceof TerminalRule) {
				System.out.println("rule contents: \n" + dump(rule, "    ")); 
			}
		}
		
		return blockArray;
	}
	
	class ParseData {
		String message;
		JSONObject argument;
		boolean prune;

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public JSONObject getArgument() {
			return argument;
		}

		public void setArgument(JSONObject argument) {
			this.argument = argument;
		}

		
		ParseData(){
			message = "";
			argument = null;
			prune = false;
		}

		public boolean isPrune() {
			return prune;
		}

		public void setPrune(boolean prune) {
			this.prune = prune;
		}
		
		
		
	}
	
	//Parse a rule and return a Blockly Block representing the Rule
	private JSONObject parseRule(ParserRule rule) {
		JSONObject json = new JSONObject();
		json.put("type", rule.getName());
		json.put("output", rule.getName());
		json.put("tooltip", rule.getName());
		String message0 = "";
		int argCount = 1;
		JSONArray arguments = new JSONArray();
		
		TreeIterator<EObject> iterator =  rule.eAllContents();
				
		while(iterator.hasNext()) {
			EObject next = iterator.next();
			
			ParseData data = parseLoop(next, argCount);
			if (data != null ) {
				message0 = message0.concat(data.getMessage());
				JSONObject argument = data.getArgument();
				if (argument != null) {
					arguments.add(data.getArgument());
					argCount++;
				}
				if (data.prune) {
					iterator.prune();
				}
			}
		}
		
		json.put("message0", message0);
		if (arguments.size() > 0 ) {
			json.put("args0", arguments);
		}
		
		return json;
	}
	
	private ParseData parseLoop(EObject obj, int argCount) {
		ParseData data = null;
		
		if (obj instanceof Group) {
			Group group = (Group) obj;
			if (group.getCardinality() == null) {
				//continue walking the tree;
				return null;
			} 
			data = parseGroup(argCount, group);
		}
		
		if (obj instanceof Keyword) {
			Keyword keyWord = (Keyword) obj;
			data = parseKeyword(keyWord);
		}
		/*
		if (obj.getClass() == AssignmentImpl.class) {
			Assignment assignment = (Assignment) obj;
			ParserRule rule = (ParserRule) assignment.eContents().get(0).eCrossReferences().get(0);
			
			JSONObject argument = new JSONObject();
			argument.put("type", "input_value");
			argument.put("name", "feature_name_" + assignment.getFeature());
			argument.put("check", rule.getName());
			
		}*/
		if (obj instanceof RuleCall) {
			RuleCall rule = (RuleCall) obj;
			data = parseRuleCall(argCount, rule);			
		}
		
		if (obj instanceof Alternatives) {			
			Alternatives alternatives = (Alternatives) obj;
			data = parseAlternatives(argCount, alternatives);
			
		}
		if (obj.getClass() == CrossReference.class) {
		}
		return data;
	}

	private ParseData parseAlternatives(int argCount, Alternatives alternatives) {
		ParseData data = new ParseData();
		data.setPrune(true);

		JSONObject argument = new JSONObject();
		argument.put("type", "field_dropdown");
		argument.put("name", "ALTERNATIVES");

		JSONArray argumentOptions = null;
				
		
		//use a dropdown menu to select between alternatives
		if  (alternatives.getCardinality() == null) {
			argumentOptions = getDropDownArgumentOptions(alternatives);

		}
		else if (alternatives.getCardinality().equals("?")) {
			argumentOptions = getDropDownArgumentOptions(alternatives);

			//add an empty array to argumentOptions such that the such can choose ""
			JSONArray emptyArray = new JSONArray();
			emptyArray.add("");
			emptyArray.add("");
			argumentOptions.add(emptyArray);
		}
		else if (alternatives.getCardinality().equals("*")) {
			//TODO: input statement for each block (modelref, declarativeref, imperativeref, scenario)
			for (Object statement: argumentOptions) {
				JSONArray a = (JSONArray) statement;
				String key = (String) a.get(0);
				
				
			}
		}
		
		data.setArgument(argument);
		data.setMessage("%" + argCount + " ");
		
		if (argumentOptions.size() < 1) { 
			return null;
		}
		argument.put("options", argumentOptions);

		return data;
	}

	private JSONArray getDropDownArgumentOptions(Alternatives alternatives) {
		JSONArray argumentOptions = new JSONArray();
		
		for (EObject content : alternatives.eContents()) {
			if (content instanceof Keyword) {
				JSONArray arr = new JSONArray();
				Keyword keyWord = (Keyword) content;
				arr.add(keyWord.getValue());
				arr.add(keyWord.getValue());

				argumentOptions.add(arr);
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
					JSONArray arr = new JSONArray();
					arr.add(option);
					arr.add(option);

					argumentOptions.add(arr);
				}
			}
		}
		return argumentOptions;
	}

	private ParseData parseRuleCall(int argCount, RuleCall rule) {
		ParseData data = new ParseData();
		
		AbstractRule abstractRule = rule.getRule();
		JSONObject argument = new JSONObject();
		
		//required
		if (rule.getCardinality() == null) {
			argument.put("type", "input_value");
			argument.put("name", "name_" + abstractRule.getName());
			argument.put("check", abstractRule.getName());
		}
		//one or more
		else if (rule.getCardinality().equals("*")) {
			argument.put("type", "input_value");
			argument.put("name", "name_" + abstractRule.getName());
			argument.put("check", abstractRule.getName());
		}
		//optional
		else if (rule.getCardinality().equals("?")) {
			argument.put("type", "input_value");
			argument.put("name", "name_" + abstractRule.getName());
			argument.put("check", abstractRule.getName());
		}
		
		data.setArgument(argument);
		data.setMessage("%" + argCount + " ");
		
		return data;
	}

	private ParseData parseKeyword(Keyword keyWord) {
		ParseData data;
		data = new ParseData();
		
		if (keyWord.getCardinality() == null) {
			data.setMessage(keyWord.getValue() + " ");
		}
		//TODO: create dropdown as it is optional
		else if (keyWord.getCardinality().equals("?")) {
			
		}
		return data;
	}

	private ParseData parseGroup(int argCount, Group group) {
		ParseData data;
		
		
		
		data = new ParseData();
		
		
		data.setMessage("%" + argCount + " ");
		
		JSONObject argument = new JSONObject();
		argument.put("type", "field_dropdown");
		argument.put("name", "optional_GROUP");
		
		JSONArray argumentOptions = new JSONArray();
		argument.put("options", argumentOptions);
		
		
		String msg = "";
		for (AbstractElement groupMember : group.getElements() ) {
			if (groupMember instanceof Keyword) {
				Keyword keyWord = (Keyword) groupMember;
				msg = msg.concat(keyWord.getValue() + " ");
			}
		}

		JSONArray arr = new JSONArray();
		arr.add(msg);
		arr.add(msg);
		
		argumentOptions.add(arr.clone());
		
		if (group.getCardinality().equals("?")) {
			arr.clear();
			arr.add("");
			arr.add("");
			argumentOptions.add(arr);
		}
		System.out.println(argumentOptions);
		data.setArgument(argument);
		data.setPrune(true);
		return data;
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
