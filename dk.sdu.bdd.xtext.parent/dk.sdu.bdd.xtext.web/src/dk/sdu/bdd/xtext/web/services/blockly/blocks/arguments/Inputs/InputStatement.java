package dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Inputs;

import java.util.ArrayList;

import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Argument;

public class InputStatement extends InputArgument {
	
	//allow only the blocks, which are included here
	
	public InputStatement(String name) {
		this.name = name;
		this.type = "input_statement";
		this.check = new ArrayList<String>();
	}
	
	public void addCheck(String s) {
		check.add(s);
	}
}
