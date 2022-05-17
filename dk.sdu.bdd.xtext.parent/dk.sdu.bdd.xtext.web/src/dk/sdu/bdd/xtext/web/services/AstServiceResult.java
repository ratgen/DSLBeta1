package dk.sdu.bdd.xtext.web.services;

import org.eclipse.xtext.web.server.IServiceResult;

public class AstServiceResult implements IServiceResult {
	private final String blocks;
	private final String toolBox;
	
	public AstServiceResult(String blocks, String toolBox){
		this.blocks = blocks;
		this.toolBox = toolBox;
	}

	public String getAstResult() {
		return this.blocks + this.toolBox;
	}
}