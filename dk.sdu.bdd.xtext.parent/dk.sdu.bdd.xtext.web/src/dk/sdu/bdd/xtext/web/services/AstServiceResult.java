package dk.sdu.bdd.xtext.web.services;

import org.eclipse.xtext.web.server.IServiceResult;

import com.fasterxml.jackson.databind.node.ArrayNode;

public class AstServiceResult implements IServiceResult {
	private final ArrayNode ast;
	
	public AstServiceResult(ArrayNode ast){
		this.ast = ast;
	}

	public ArrayNode getAstResult() {
		return this.ast ;
	}
}