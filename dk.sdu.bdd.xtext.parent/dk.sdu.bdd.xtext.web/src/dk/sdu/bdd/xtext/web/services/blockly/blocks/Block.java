package dk.sdu.bdd.xtext.web.services.blockly.blocks;

import java.util.ArrayList;

import dk.sdu.bdd.xtext.web.services.blockly.blocks.arguments.Argument;
import dk.sdu.bdd.xtext.web.services.blockly.toolbox.Category;

public class Block  {
	private String type;
	//It is not re
	private String output;
	private String tooltip;
	private String message0 = "";
	private int argCount;
	private boolean lastIsArg = false;
	
	private Category blockCategory = null;
	
	private ArrayList<Argument> args0;
	private ArrayList<String> previousStatement;
	private ArrayList<String> nextStatement;
	
	public Block(String type) {
		this.type = type;
		this.tooltip = type;
		this.argCount = 1;
		
		this.args0 = new ArrayList<>();
	}
	
	public Category getBlockCategory() {
		if (blockCategory == null) {
			blockCategory = new Category(type);
		}
		return blockCategory;
	}

	public void setBlockCategory(Category blockCategory) {
		this.blockCategory = blockCategory;
	}

	public int getArgCount() {
		return argCount;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getOutput() {
		return output;
	}
	public void setOutput(String output) {
		this.output = output;
	}
	public String getTooltip() {
		return tooltip;
	}
	public void setTooltip(String tooltip) {
		this.tooltip = tooltip;
	}
	public String getMessage0() {
		return message0;
	}
	public void setMessage0(String message0) {
		this.message0 = message0;
	}
	public ArrayList<Argument> getArgs0() {
		return args0;
	}
	public void setArgs0(ArrayList<Argument> args0) {
		this.args0 = args0;
	}
	public ArrayList<String> getPreviousStatement() {
		return previousStatement;
	}
	public void setPreviousStatement(ArrayList<String> previousStatement) {
		this.previousStatement = previousStatement;
	}
	public ArrayList<String> getNextStatement() {
		return nextStatement;
	}
	public void setNextStatement(ArrayList<String> nextStatement) {
		this.nextStatement = nextStatement;
	}
	
	public void addAllPrevious(ArrayList<String> array) {
		if (array != null) {
			if (previousStatement == null) {
				previousStatement = new ArrayList<>();
			}
			this.previousStatement.addAll(array);
		}
	}
	
	public void addAllNext(ArrayList<String> array) {
		if (array != null) {
			if (nextStatement == null) {
				nextStatement = new ArrayList<>();
			}
			this.nextStatement.addAll(array);
		}
	}
	
	public void addMessage(String msg) {
		this.message0 = this.message0.concat(msg);
		lastIsArg = false;
	}
	
	public void addArgument(Argument arg) {
		this.message0 = this.message0 + "%" + this.argCount + " ";
		argCount++;
		this.args0.add(arg);
		lastIsArg = true;
	}
	
	public void addPreviousStatement(String state) {
		if (previousStatement == null) {
			previousStatement = new ArrayList<>();
		}
		previousStatement.add(state);
	}
	
	public void addNextStatement(String state) {
		if (nextStatement == null) {
			nextStatement = new ArrayList<>();
		}
		nextStatement.add(state);
	}

	public boolean lastIsArg() {
		return lastIsArg;
	}
	
	
}
