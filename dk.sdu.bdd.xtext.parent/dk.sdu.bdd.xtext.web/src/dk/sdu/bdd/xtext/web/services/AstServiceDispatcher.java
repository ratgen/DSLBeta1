package dk.sdu.bdd.xtext.web.services;

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
		ServiceDescriptor serviceDescriptor = new ServiceDescriptor();
		serviceDescriptor.setService(() -> {
			return new AstServiceResult("resfult");
		});
		return serviceDescriptor;
	}
	
}