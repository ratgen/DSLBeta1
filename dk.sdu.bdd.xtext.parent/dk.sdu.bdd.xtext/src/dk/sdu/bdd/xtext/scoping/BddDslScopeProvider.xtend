package dk.sdu.bdd.xtext.scoping

import dk.sdu.bdd.xtext.bddDsl.ActionDef
import dk.sdu.bdd.xtext.bddDsl.BddDslPackage
import dk.sdu.bdd.xtext.bddDsl.EntityDef
import dk.sdu.bdd.xtext.bddDsl.EntityRef
import dk.sdu.bdd.xtext.bddDsl.Model
import dk.sdu.bdd.xtext.bddDsl.PropertyDef
import dk.sdu.bdd.xtext.bddDsl.StateName
import org.eclipse.emf.ecore.EObject
import org.eclipse.emf.ecore.EReference
import org.eclipse.xtext.EcoreUtil2
import org.eclipse.xtext.scoping.IScope
import org.eclipse.xtext.scoping.Scopes

class BddDslScopeProvider extends AbstractBddDslScopeProvider {
	
	override IScope getScope(EObject context, EReference reference) {
		if (reference.EType == BddDslPackage.eINSTANCE.stateName) {
			scopeForEntityModelElements(context, StateName);
		} else if (reference.EType == BddDslPackage.eINSTANCE.actionDef) {
			scopeForEntityModelElements(context, ActionDef);
		} else if (reference.EType == BddDslPackage.eINSTANCE.propertyDef) {
			scopeForEntityModelElements(context, PropertyDef);
		} else if (reference.EType == BddDslPackage.eINSTANCE.entityDef) {
			Scopes.scopeFor(getAllEntityDefs(findAncestorOfType(context, Model)));
		} else {
			super.getScope(context, reference)		
		}
	}

	def Iterable<? extends EntityDef> getAllEntityDefs(Model model) {
		val allEntityDefs = <EntityDef>newArrayList
		allEntityDefs += model.entityDefs
		for (modelRef : model.modelRefs) {
			allEntityDefs += getAllEntityDefs(modelRef.modelRef)			
		}
		allEntityDefs
	}

	def <T extends EObject> IScope scopeForEntityModelElements(EObject context, Class<T> clazz) {
		val allModelElements = <T>newArrayList
		val entityDefs = <EntityDef>newArrayList
		val contextEntityDef = findWEntityDef(context)
		if (contextEntityDef !== null) {
			entityDefs += contextEntityDef
		} else {
			entityDefs += getAllEntityDefs(findAncestorOfType(context, Model))
		}
		for (entityDef : entityDefs) {
			for (T modelElement : getAllInheritedContentsOfType(entityDef, clazz)) {
				allModelElements += modelElement;
			}
		}
		Scopes.scopeFor(allModelElements);
	}

	def <T extends EObject> Iterable<T> getAllInheritedContentsOfType(EntityDef entityDef, Class<T> clazz) {
		val  all = <T>newArrayList
		all += EcoreUtil2.getAllContentsOfType(entityDef, clazz)
		entityDef.superEntities.forEach[all += getAllInheritedContentsOfType(it, clazz)]
		all.filter[clazz.isInstance(it)]
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

	def EntityDef findWEntityDef(EObject context) {
		val feature = context.eClass.EAllStructuralFeatures.findFirst[EType == BddDslPackage.eINSTANCE.entityRef];
		if (feature !== null) {
			(context.eGet(feature) as EntityRef)?.entity
		} else {
			null
		}
	}
	
}