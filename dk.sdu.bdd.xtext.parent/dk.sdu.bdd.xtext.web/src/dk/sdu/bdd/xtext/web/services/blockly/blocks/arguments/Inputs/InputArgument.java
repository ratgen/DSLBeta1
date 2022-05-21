package dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Inputs;

import java.util.ArrayList;

import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Argument;

public class InputArgument extends Argument {
	protected ArrayList<String> check;
	
	public void addCheck(String type) {
		check.add(type);
	}

}
