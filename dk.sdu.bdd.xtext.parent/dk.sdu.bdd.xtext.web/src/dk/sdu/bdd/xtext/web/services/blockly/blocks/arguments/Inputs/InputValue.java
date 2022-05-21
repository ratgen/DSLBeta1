package dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Inputs;

import java.util.ArrayList;

public class InputValue extends InputArgument {	
	public InputValue(String name) {
		this.name = name;
		this.type = "input_value";
		this.check = new ArrayList<String>();
	}
}
