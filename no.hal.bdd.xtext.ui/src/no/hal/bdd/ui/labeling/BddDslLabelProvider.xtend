/*
 * generated by Xtext 2.18.0.M3
 */
package no.hal.bdd.ui.labeling

//import org.eclipse.emf.edit.ui.provider.AdapterFactoryLabelProvider
import org.eclipse.xtext.ui.label.DefaultEObjectLabelProvider
import no.hal.bdd.bddDsl.EntityRef
import no.hal.bdd.bddDsl.Scenario
import no.hal.bdd.bddDsl.ScenarioState
import no.hal.bdd.bddDsl.PropertyDef

/**
 * Provides labels for EObjects.
 * 
 * See https://www.eclipse.org/Xtext/documentation/304_ide_concepts.html#label-provider
 */
class BddDslLabelProvider extends DefaultEObjectLabelProvider {

	/* @Inject
	new(AdapterFactoryLabelProvider delegate) {
		super(delegate);
	}*/

	// Labels and icons can be computed like this:
	override doGetText(Object a){
		System.out.println(a.getClass().toString());
		System.out.println(super.doGetText(a));
		return super.doGetText(a)
	}
		
	def text(Scenario a) {
		return a.name
	}
	
	def text(ScenarioState s){
		return "Phrase"
	}
	
	def text(EntityRef s){
		if (s.entity.name !== null)
			return s.entity.name + " : " + s.name
		else
			return s.name
	}
	
	def text(PropertyDef p) {
		System.out.println("PropertyDef " + p);
		return p.name
	}
 
}
