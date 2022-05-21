package dk.sdu.bdd.xtext.web.services.blockly.toolbox;

public class CategoryItem {
	String kind;
	String type;
	
	public CategoryItem(String type){
		this.kind = "block";
		this.type = type;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
}
