package dk.sdu.bdd.xtext.web.services.blockly.toolbox;

import java.util.ArrayList;

public class CategoryToolBox {
	String kind;
	ArrayList<Category> contents;
	
	public CategoryToolBox() {
		this.kind = "categoryToolbox";
		this.contents = new ArrayList<>();
	}
	
	public void addCategory(Category cat) {
		contents.add(cat);
	}

	public String getKind() {
		return kind;
	}

	public ArrayList<Category> getContents() {
		return contents;
	}

	public void setContents(ArrayList<Category> contents) {
		this.contents = contents;
	}
}
