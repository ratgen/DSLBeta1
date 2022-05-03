package dk.sdu.bdd.xtext.web.services;

import org.eclipse.xtext.web.server.IServiceResult;

public class AstServiceResult implements IServiceResult {
	private final String astResult;
	
	public AstServiceResult(String astResult){
		this.astResult = astResult;
	}

	public String getAstResult() {
		return this.astResult;
	}
}