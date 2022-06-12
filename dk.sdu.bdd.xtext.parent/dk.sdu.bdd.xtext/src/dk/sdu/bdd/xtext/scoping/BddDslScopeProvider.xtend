package dk.sdu.bdd.xtext.scoping

import dk.sdu.bdd.xtext.bddDsl.ActionDef
import dk.sdu.bdd.xtext.bddDsl.BddDslPackage
import dk.sdu.bdd.xtext.bddDsl.ImperativeEntityDef
import dk.sdu.bdd.xtext.bddDsl.ImperativeEntityRef
import dk.sdu.bdd.xtext.bddDsl.DeclarativeEntityDef
import dk.sdu.bdd.xtext.bddDsl.DeclarativeEntityRef
import dk.sdu.bdd.xtext.bddDsl.Model
import dk.sdu.bdd.xtext.bddDsl.PropertyDef
import dk.sdu.bdd.xtext.bddDsl.StateName
import org.eclipse.emf.ecore.EObject
import org.eclipse.emf.ecore.EReference
import org.eclipse.xtext.EcoreUtil2
import org.eclipse.xtext.scoping.IScope
import org.eclipse.xtext.scoping.Scopes
import dk.sdu.bdd.xtext.bddDsl.ImperativeActionDef
import dk.sdu.bdd.xtext.bddDsl.ImperativePropertyDef
import dk.sdu.bdd.xtext.bddDsl.ImperativeStateName

class BddDslScopeProvider extends AbstractBddDslScopeProvider {
	
	override IScope getScope(EObject context, EReference reference) {
		if (reference.EType == BddDslPackage.eINSTANCE.stateName) {
			scopeForDecEntityModelElements(context, StateName);
			
		} else if (reference.EType == BddDslPackage.eINSTANCE.actionDef) {
			scopeForDecEntityModelElements(context, ActionDef);
			
		} else if (reference.EType == BddDslPackage.eINSTANCE.propertyDef) {
			scopeForDecEntityModelElements(context, PropertyDef);
		}	else if (reference.EType == BddDslPackage.eINSTANCE.imperativeActionDef) {
			scopeForImpEntityModelElements(context, ImperativeActionDef);
		} else if (reference.EType == BddDslPackage.eINSTANCE.imperativePropertyDef) {
			scopeForImpEntityModelElements(context, ImperativePropertyDef);
			
		} else if (reference.EType == BddDslPackage.eINSTANCE.imperativeStateName) {
			scopeForImpEntityModelElements(context, ImperativeStateName);
		} else if (reference.EType == BddDslPackage.eINSTANCE.imperativeEntityDef) {
			Scopes.scopeFor(getAllImpEntityDefs(findAncestorOfType(context, Model)));
			
		} else if (reference.EType == BddDslPackage.eINSTANCE.declarativeEntityDef) {
			Scopes.scopeFor(getAllDecEntityDefs(findAncestorOfType(context, Model)));
		} else {
			super.getScope(context, reference)		
		}
	}

	def Iterable<? extends DeclarativeEntityDef> getAllDecEntityDefs(Model model) {
		val allDecEntityDefs = <DeclarativeEntityDef>newArrayList
		allDecEntityDefs += model.declarativeEntityDef
		for (modelRef : model.modelRefs) {
			allDecEntityDefs += getAllDecEntityDefs(modelRef.modelRef)			
		}
		allDecEntityDefs
	}
	def Iterable<? extends ImperativeEntityDef> getAllImpEntityDefs(Model model) {
			val allImpEntityDefs = <ImperativeEntityDef>newArrayList
			allImpEntityDefs += model.imperativeEntityDef
			for (modelRef : model.modelRefs) {
				allImpEntityDefs += getAllImpEntityDefs(modelRef.modelRef)			
			}
			allImpEntityDefs
		}
		
		
	def <T extends EObject> IScope scopeForImpEntityModelElements(EObject context, Class<T> clazz) {
		val allImpModelElements = <T>newArrayList
		val impEntityDefs = <ImperativeEntityDef>newArrayList
		val contextImpEntityDef = findImpWEntityDef(context)

		if (contextImpEntityDef !== null) {
			impEntityDefs += contextImpEntityDef
		} else {
			impEntityDefs += getAllImpEntityDefs(findAncestorOfType(context, Model))
		}
		
		for (entityDef : impEntityDefs) {
			for (T modelElement : getAllInheritedContentsOfType(entityDef, clazz)) {
				allImpModelElements += modelElement;
			}
		}
		
		Scopes.scopeFor(allImpModelElements);

	}
		def <T extends EObject> IScope scopeForDecEntityModelElements(EObject context, Class<T> clazz) {
		val allDecModelElements = <T>newArrayList
		
		val decEntityDefs = <DeclarativeEntityDef>newArrayList
		val contextDecEntityDef = findDecWEntityDef(context)
		
		
		if (contextDecEntityDef !== null) {
			decEntityDefs += contextDecEntityDef
		} else {
			decEntityDefs += getAllDecEntityDefs(findAncestorOfType(context, Model))
		}
		
		
		
		for (entityDef : decEntityDefs) {
			for (T modelElement : getAllInheritedContentsOfType(entityDef, clazz)) {
				allDecModelElements += modelElement;
			}
		}
		
		
		
		Scopes.scopeFor(allDecModelElements);
		

	}
	

	def <T extends EObject> Iterable<T> getAllInheritedContentsOfType(DeclarativeEntityDef declarativeEntityDef, Class<T> clazz) {
		val  all = <T>newArrayList
		all += EcoreUtil2.getAllContentsOfType(declarativeEntityDef, clazz)
		declarativeEntityDef.superEntities.forEach[all += getAllInheritedContentsOfType(it, clazz)]
		all.filter[clazz.isInstance(it)]
	}

	def DeclarativeEntityDef findDecWEntityDef(EObject context) {
		val feature = context.eClass.EAllStructuralFeatures.findFirst[EType == BddDslPackage.eINSTANCE.declarativeEntityRef];
		if (feature !== null) {
			(context.eGet(feature) as DeclarativeEntityRef)?.entity
		} else {
			null
		}
	}
	
	def <T extends EObject> Iterable<T> getAllInheritedContentsOfType(ImperativeEntityDef imperativeEntityDef, Class<T> clazz) {
		val  all = <T>newArrayList
		all += EcoreUtil2.getAllContentsOfType(imperativeEntityDef, clazz)
		imperativeEntityDef.superEntities.forEach[all += getAllInheritedContentsOfType(it, clazz)]
		all.filter[clazz.isInstance(it)]
	}
	
	def ImperativeEntityDef findImpWEntityDef(EObject context){
		val feature = context.eClass.EAllStructuralFeatures.findFirst[EType == BddDslPackage.eINSTANCE.imperativeEntityRef];
		if (feature !== null) {
			(context.eGet(feature) as ImperativeEntityRef)?.entity
		} else {
			null
		}
	}
	
	def <T> T findAncestorOfType(EObject context, Class<T> clazz) {
		var parent = context;
		while (parent !== null) {
			if (clazz.isInstance(parent)) {
				return parent as T;
			}
			parent = parent.eContainer();
		}
	}
	
}
