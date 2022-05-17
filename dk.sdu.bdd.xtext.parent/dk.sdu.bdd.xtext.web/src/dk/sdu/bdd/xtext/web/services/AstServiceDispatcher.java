package dk.sdu.bdd.xtext.web.services;

import java.util.ArrayList;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
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
import org.eclipse.xtext.Group;
import org.eclipse.xtext.Keyword;
import org.eclipse.xtext.ParserRule;
import org.eclipse.xtext.RuleCall;
import org.eclipse.xtext.impl.AlternativesImpl;
import org.eclipse.xtext.impl.AssignmentImpl;
import org.eclipse.xtext.impl.GroupImpl;
import org.eclipse.xtext.impl.KeywordImpl;
import org.eclipse.xtext.impl.ParserRuleImpl;
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
		System.out.println("Resource " + resource);
		ResourceSet resourceSet = resourceSetProvider.get(resource, context);
		
		EList<Resource> list = resourceSet.getResources();
		for (Resource item : list) {
			URI uri = item.getURI();
			System.out.println("Resource  URI: " + uri);
			EList<EObject> objectContents = item.getContents();
			System.out.println("item contents " + objectContents);
			//for (EObject obj : objectContents) {
				//System.out.println("EObject_string: " + obj.toString());
				
				
				//System.out.println(dump(obj, "   "));
			//}
		}
		JSONObject toolbox = new JSONObject();
		JSONObject toolboxCategory = new JSONObject();
		
		toolboxCategory.put("kind", "category");
		toolboxCategory.put("name", "all");
		
		JSONArray categoryContent = new JSONArray();
		
		toolbox.put("kind", "categoryToolbox");
		
		
		JSONArray blockArray = new JSONArray();

		EList<AbstractRule> rules = grammarAccess.getGrammar().getRules();
		for (AbstractRule rule : rules) {
			System.out.println("rule: " + rule.getName());
			if (rule.getClass() == ParserRuleImpl.class) {
				ParserRule parserRule = (ParserRule) rule;
					
				JSONObject block = parseRule(parserRule);
				blockArray.add(block);
				
				
				JSONObject catItem = new JSONObject();
				catItem.put("kind", "block");
				catItem.put("type",  block.get("type"));
				
				
				categoryContent.add(catItem);

			
				System.out.println(block);
				System.out.println("rule contents: \n" + dump(rule, "    ")); 
			}
		}
		
		toolboxCategory.put("contents", categoryContent);
		toolbox.put("contents", toolboxCategory);

		System.out.println();
		
		ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
		serviceDescriptor.setService(() -> {
	        return new AstServiceResult(blockArray.toJSONString(), toolbox.toJSONString());
	     });
		return serviceDescriptor;
	}
	
	class ParseData {
		String message;
		JSONObject argument;

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
		}
		
		
		
	}
	
	//Parse a rule and return a Blockly Block representing the Rule
	private JSONObject parseRule(ParserRule rule) {
		JSONObject json = new JSONObject();
		json.put("type", rule.getName());
		json.put("output", rule.getName());
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
			}
			System.out.println(next);
		}
		
		json.put("message0", message0);
		if (arguments.size() > 0 ) {
			json.put("args0", arguments);
		}
		
		return json;
	}
	
	private ParseData parseLoop(EObject obj, int argCount) {
		ParseData data = null;
		
		/*if (obj.getClass() == GroupImpl.class) {
			for (EObject groupMemeber : obj.eContents() ) {
				return parseLoop(groupMemeber, json);
			}
		}*/
		if (obj.getClass() == KeywordImpl.class) {
			data = new ParseData();
			Keyword keyWord = (Keyword) obj;
			data.setMessage(keyWord.getValue() + " ");
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
		if (obj.getClass() == RuleCallImpl.class) {
			data = new ParseData();
			RuleCall rule = (RuleCall) obj;
			
			AbstractRule abstractRule = rule.getRule();
			
			JSONObject argument = new JSONObject();
			argument.put("type", "input_value");
			argument.put("name", "name_" + abstractRule.getName());
			argument.put("check", abstractRule.getName());
			
			data.setArgument(argument);
			data.setMessage("%" + argCount + " ");			
		}
		/*
		if (obj.getClass() == AlternativesImpl.class) {
			Alternatives alternatives = (Alternatives) obj;
			
			
			JSONObject argument = new JSONObject();
			argument.put("type", "field_dropdown");
			argument.put("name", "ALTERNATIVES");
			
			JSONArray argumentOptions = new JSONArray();
			argument.put("options", argumentOptions);
			
			EList<EObject> altContents = alternatives.eContents();
			for (EObject content : altContents) {
				if (content.getClass() == Keyword.class) {
					Keyword keyWord = (Keyword) content;
					argumentOptions.add(parseKeyword(keyWord));
				}
				
				if(content.getClass() == Group.class) {
					String option = "";
					EList<EObject> groupContent = content.eContents();
					
					for (EObject groupMember : groupContent) {
						if (groupMember.getClass() == Keyword.class) {
							Keyword keyWord = (Keyword) groupMember;
							option = option.concat(parseKeyword(keyWord));
						}
						
					}
				}
			}
			
		}*/
		if (obj.getClass() == CrossReference.class) {
		}
		return data;
	}
	
	
	private EList<EObject> parseGroup(Group group){
		return group.eContents();
	}
	
	private String parseKeyword(Keyword keyword) {
		return keyword.getValue();
	}
	
	private String parseAssignment(Assignment assignment) {
		for (EObject rule : assignment.eContents()) {
			if(rule.getClass() == RuleCallImpl.class) {
				RuleCall call = (RuleCall) rule;
				ParserRule ref = (ParserRule) call.eCrossReferences().get(0);
				return ref.getName();
			}
		}
		return "";
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
