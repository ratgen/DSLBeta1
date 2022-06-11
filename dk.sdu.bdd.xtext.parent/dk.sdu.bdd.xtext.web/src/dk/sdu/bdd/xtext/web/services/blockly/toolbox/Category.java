package dk.sdu.bdd.xtext.web.services.blockly.toolbox;

import java.util.ArrayList;

public class Category {
	private String kind;
	private String name;
	private ArrayList<CategoryItem> contents;
	
	public Category (String categoryName) {
		this.kind = "category";
		this.name = categoryName;
		this.contents = new ArrayList<>();
	}
	 
	public void addCategoryItem(CategoryItem item) {
		contents.add(item);
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<CategoryItem> getContents() {
		return contents;
	}

	public void setContents(ArrayList<CategoryItem> contents) {
		this.contents = contents;
	}
	
	
}
