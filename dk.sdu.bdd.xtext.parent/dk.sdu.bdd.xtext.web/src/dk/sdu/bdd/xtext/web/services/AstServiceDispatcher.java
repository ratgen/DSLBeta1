package dk.sdu.bdd.xtext.web.services;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.xtext.web.server.IServiceContext;
import org.eclipse.xtext.web.server.InvalidRequestException;
import org.eclipse.xtext.web.server.XtextServiceDispatcher;
import org.eclipse.xtext.web.server.model.IWebResourceSetProvider;

import com.google.inject.Inject;

public class AstServiceDispatcher extends XtextServiceDispatcher {
	@Inject
	private IWebResourceSetProvider resourceSetProvider;
	
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
	ResourceSet resourceSet = resourceSetProvider.get(context.getParameter("resource"), context);
    URI uri = URI.createURI("resource:/scenarios.bdd");
    System.out.println(uri);
	EObject object =  resourceSet.getEObject(uri, false);
	ServiceDescriptor serviceDescriptor = new ServiceDescriptor();
    if (object != null) {
      serviceDescriptor.setService(() -> {
        return new AstServiceResult(object.getClass().toString());
      });
    } else {
      serviceDescriptor.setService(() -> {
        return new AstServiceResult("result not available");
      });

    }
		return serviceDescriptor;
	}
	
}
