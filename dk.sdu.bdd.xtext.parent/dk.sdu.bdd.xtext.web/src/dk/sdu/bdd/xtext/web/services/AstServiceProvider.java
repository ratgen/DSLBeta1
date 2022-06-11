package dk.sdu.bdd.xtext.web.services;

import java.util.ArrayList;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dk.sdu.bdd.xtext.bddDsl.Model;

public class AstServiceProvider {
	public AstServiceProvider() {
		
	}
	
	public String parseResource(Resource resource) {
		ObjectMapper objectMapper = new ObjectMapper();

		
		//used for working with the AST.
		URI uri = resource.getURI();
		System.out.println("Resource  URI: " + uri);
		EList<EObject> objectContents = resource.getContents();
		System.out.println("item contents " + objectContents);
		for (EObject obj : objectContents) {
		    if (obj instanceof Model) {
		    	Model model = (Model) obj;
		    	return ((Model) obj).getName();
		    }
			System.out.println("EObject_string: " + obj.toString());
			
			System.out.println(AstServiceDispatcher.dump(obj, "   "));
		}
		System.out.println();
		System.out.println();
		return "m";
	}
	
	public String parseArr(ArrayList<String> arr) {
		ObjectMapper objectMapper = new ObjectMapper();

		
		//used for working with the AST.
		try {
			return objectMapper.writeValueAsString(arr);

		} catch (JsonProcessingException e) {
			return "err";
		}
	}
}
