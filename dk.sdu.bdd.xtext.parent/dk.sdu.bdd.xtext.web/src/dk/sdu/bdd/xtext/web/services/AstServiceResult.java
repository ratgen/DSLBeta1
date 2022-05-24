package dk.sdu.bdd.xtext.web.services;

import org.eclipse.xtext.web.server.IServiceResult;

public class AstServiceResult implements IServiceResult {
	private final String ast;
	
	public AstServiceResult(String ast){
		this.ast = ast;
	}

	public String getAstResult() {
		return this.ast ;
	}
}