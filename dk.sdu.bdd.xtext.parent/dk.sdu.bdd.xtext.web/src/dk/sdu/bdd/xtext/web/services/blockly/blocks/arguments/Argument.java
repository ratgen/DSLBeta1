package dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments;


public class Argument {
	//https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#args
	//field_input is a text field
	//field_dropdown is a dropdown
	//input_value creates a field for inputting a value
	//input_statement creates the claws for a stack of inputs
	protected String type;
	protected String name;

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	

}
