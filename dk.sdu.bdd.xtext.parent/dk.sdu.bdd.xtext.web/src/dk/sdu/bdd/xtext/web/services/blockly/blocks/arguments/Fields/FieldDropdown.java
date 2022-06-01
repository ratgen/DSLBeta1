package dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Fields;

import java.util.ArrayList;

public class FieldDropdown extends FieldArgument {
	
	private ArrayList<ArrayList<String>> options;
	
	public FieldDropdown(String name) {
		this.name = name;
		this.type = "field_dropdown";
		this.options = new ArrayList<ArrayList<String>>();
	}
	
	public void addOption(String option) {
		ArrayList<String> array = new ArrayList<String>();
		array.add(option);
		array.add(option);
		options.add(array);
	}
	
	public void addRule(String option) {
		ArrayList<String> array = new ArrayList<String>();
		array.add(option);
		array.add("rule");
		options.add(array);

	}

	public ArrayList<ArrayList<String>> getOptions() {
		return options;
	}

	public void setOptions(ArrayList<ArrayList<String>> options) {
		this.options = options;
	}

	
	
}
