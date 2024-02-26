package dk.sdu.bdd.xtext.web.services;

import java.util.ArrayList;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import dk.sdu.bdd.xtext.bddDsl.ImperativeEntityDef;
import dk.sdu.bdd.xtext.bddDsl.Model;

public class AstServiceProvider {
	public AstServiceProvider() {
		
	}
	
	public String getAstJson(EList<Resource> resourceList) {
        ObjectMapper mapper = new ObjectMapper();

        ArrayNode astArray = mapper.createArrayNode();

        for (Resource resource : resourceList) {
            if (resource.isLoaded() && !resource.getContents().isEmpty()) {
            	System.err.println("Resource: " + resource.getURI());
            	ObjectNode astJson = serializeAST(resource);
                astArray.add(astJson);
            } else {
                System.err.println("Empty or unloaded resource: " + resource.getURI());
            }
        }
        
        return astArray.toString();
	}
	
	private ObjectNode serializeAST(Resource resource) {
        ObjectNode rootNode = new ObjectMapper().createObjectNode();
        EObject rootElement = resource.getContents().get(0);
        serializeEObject(rootElement, rootNode);
        return rootNode;
    }
	
	private void serializeEObject(EObject eObject, ObjectNode parentNode) {
        // Serialize EObject's attributes
        parentNode.put("name", eObject.getClass().getName());
        
        ArrayNode childrenArray = parentNode.putArray("children");
        for (EObject child : eObject.eContents()) {
            ObjectNode childNode = new ObjectMapper().createObjectNode();
            serializeEObject(child, childNode);
            childrenArray.add(childNode);
        }
    }
}
