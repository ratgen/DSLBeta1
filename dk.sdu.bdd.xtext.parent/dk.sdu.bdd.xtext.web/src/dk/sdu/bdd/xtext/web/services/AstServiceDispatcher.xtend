package dk.sdu.bdd.xtext.web.services

import org.eclipse.xtext.web.server.IServiceContext
import org.eclipse.xtext.web.server.InvalidRequestException
import org.eclipse.xtext.web.server.XtextServiceDispatcher

class AstServiceDispatcher extends XtextServiceDispatcher {
	override ServiceDescriptor createServiceDescriptor(String serviceType, IServiceContext context){
		if (serviceType !== null) {
			switch (serviceType) {
				case "ast":
					return getAstService(context)
				case "revert":
					return getLoadResourceService(true, context)
				case "save":
					return getSaveResourceService(context)
				case "update":
					return getUpdateDocumentService(context)
				case "assist":
					return getContentAssistService(context)
				case "validate":
					return getValidationService(context)
				case "hover":
					return getHoverService(context)
				case "highlight":
					return getHighlightingService(context)
				case "occurrences":
					return getOccurrencesService(context)
				case "format":
					return getFormattingService(context)
				case "generate":
					return getGeneratorService(context)
				
				default:
					throw new InvalidRequestException("The service type '" + serviceType + "' is not supported.")
			}
		} 
		else {
			throw new InvalidRequestException("The service type '" + serviceType + "' is not supported.");
		}
	}
	
	def ServiceDescriptor getAstService(IServiceContext context) {
		var serviceDescriptor = new ServiceDescriptor()
		serviceDescriptor.service = service(serviceDescriptor)
		return serviceDescriptor
	}
	
	def Object service(ServiceDescriptor serviceDescriptor) {
		try {
			System.out.println("called service")
			return "this"
		} catch (Throwable throwable) {
			return handleError(serviceDescriptor, throwable);
		}
	}
}