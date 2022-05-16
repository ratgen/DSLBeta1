package dk.sdu.bdd.xtext.web.services;

import java.util.ArrayList;

import org.eclipse.emf.common.util.EList;

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
		JSONArray blockArray = new JSONArray();

		EList<AbstractRule> rules = grammarAccess.getGrammar().getRules();
		for (AbstractRule rule : rules) {
			System.out.println("rule: " + rule.getName());
			if (rule.getClass() == ParserRuleImpl.class) {
				ParserRule parserRule = (ParserRule) rule;
					
				JSONObject block = parseRule(parserRule);
				blockArray.add(block);
				System.out.println(block);
				System.out.println("rule contents: \n" + dump(rule, "    ")); 
			}
		}
		
		
		ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
		serviceDescriptor.setService(() -> {
	        return new AstServiceResult(blockArray.toJSONString());
	      });
		return serviceDescriptor;
	}
	
	//Parse a rule and return a Blockly Block representing the Rule
	private JSONObject parseRule(ParserRule rule) {
		JSONObject json = new JSONObject();
		
		parseLoop(rule, json);
		
		return json;
	}
	
	private JSONObject parseLoop(EObject obj) {
		
		if (obj.getClass() == GroupImpl.class) {
			
			
			//obj.eContents().forEach((item) -> {parseLoop(item);});
		}
		if (obj.getClass() == KeywordImpl.class) {

		}
		if (obj.getClass() == AssignmentImpl.class) {
			
		}
		if (obj.getClass() == RuleCallImpl.class) {
			
		}
		if (obj.getClass() == AlternativesImpl.class) {
			
		}
		if (obj.getClass() == CrossReference.class) {
		}
		return null;
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
