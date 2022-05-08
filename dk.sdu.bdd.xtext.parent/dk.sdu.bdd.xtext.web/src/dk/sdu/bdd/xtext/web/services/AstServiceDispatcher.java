package dk.sdu.bdd.xtext.web.services;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.xtext.web.server.IServiceContext;
import org.eclipse.xtext.web.server.InvalidRequestException;
import org.eclipse.xtext.web.server.XtextServiceDispatcher;
import org.eclipse.xtext.web.server.model.IWebResourceSetProvider;

import dk.sdu.bdd.xtext.bddDsl.StatePhrase;
import dk.sdu.bdd.xtext.bddDsl.impl.ScenarioImpl;
import dk.sdu.bdd.xtext.bddDsl.impl.ScenarioStateImpl;

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
		String resource = context.getParameter("resource");
		System.out.println("Resource " + resource);
		ResourceSet resourceSet = resourceSetProvider.get(resource, context);
		
		EList<Resource> list = resourceSet.getResources();
		for (Resource item : list) {
			URI uri = item.getURI();
			System.out.println("Resource  URI: " + uri);
			EList<EObject> objectContents = item.getContents();
			System.out.println("item contents " + objectContents);
			for (EObject obj : objectContents) {
				System.out.println("EObject_string: " + obj.toString());
				eContentExplorer(obj);
			}
			System.out.println();
			System.out.println();

		}

		/*
	    if (object != null) {
	      serviceDescriptor.setService(() -> {
	        return new AstServiceResult(object.getClass().toString());
	      });
	    } else {
	      
	
	    }*/
		ServiceDescriptor serviceDescriptor = new ServiceDescriptor();		
		serviceDescriptor.setService(() -> {
	        return new AstServiceResult(resource);
	      });
		return serviceDescriptor;
	}
	
	private void eContentExplorer(EObject obj) {
		for (EObject cont : obj.eContents()) {
			System.out.println("EObject content string: " + cont.toString());
			if(cont.getClass() == ScenarioStateImpl.class) {
				EList<StatePhrase> states = ((ScenarioStateImpl) cont).getStates();
				for (StatePhrase stat : states) {
					System.out.println(" entity " + stat.getEntity());
					System.out.println(" propery " + stat.getProperty());
				}
			}
			if(cont.getClass() == ScenarioImpl.class) {
				ScenarioImpl scenario = (ScenarioImpl) cont;
				System.out.println(scenario.getName());
				eContentExplorer(scenario.getPreStateE());
				eContentExplorer(scenario.getPreState());
				eContentExplorer(scenario.getPostState());
				eContentExplorer(scenario.getActionE());
				eContentExplorer(scenario.getPreState1());
				eContentExplorer(scenario.getAction1());
				eContentExplorer(scenario.getPostState1());
				eContentExplorer(scenario.getPreStateE1());
				eContentExplorer(scenario.getPreState2());
				eContentExplorer(scenario.getAction2());
				eContentExplorer(scenario.getPostState2());
			}
			if (cont.eContents().size() != 0) {
				eContentExplorer(cont);
			}
		}
	}
	
}
