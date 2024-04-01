package dk.sdu.bdd.xtext.web.services;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class AstServiceProvider {
	public AstServiceProvider() {
		
	}
	
	public ArrayNode getAst(EList<Resource> resourceList) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);

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
        
        return astArray;
	}
	
	private ObjectNode serializeAST(Resource resource) {
        ObjectNode rootNode = new ObjectMapper().createObjectNode();
        EObject rootElement = resource.getContents().get(0);
        serializeEObject(rootElement, rootNode);
        return rootNode;
    }
	
	private void serializeEObject(EObject eObject, ObjectNode parentNode) {
        parentNode = getParentNodeWithProperties(eObject, parentNode);
		
        ArrayNode childrenArray = parentNode.putArray("nodes");
        for (EObject child : eObject.eContents()) {
            ObjectNode childNode = new ObjectMapper().createObjectNode();
            serializeEObject(child, childNode);
            childrenArray.add(childNode);
        }
    }
	
	private ObjectNode getParentNodeWithProperties(EObject eObject, ObjectNode parentNode) {	
        parentNode.put("value", getEObjectString(eObject));
		
		return parentNode;
	}
	
	private String getEObjectString(EObject mod_) {	
	    var res = mod_.toString().replaceFirst(".*[.]impl[.](.*)Impl[^(]*", "$1 ");
	    
	    for (EObject a :mod_.eCrossReferences()) {
	        res +=  "->" + a.toString().replaceFirst(".*[.]impl[.](.*)Impl[^(]*", "$1 ");
	    }
	    
	    return res.trim().replace("\"", "");
	}
}
