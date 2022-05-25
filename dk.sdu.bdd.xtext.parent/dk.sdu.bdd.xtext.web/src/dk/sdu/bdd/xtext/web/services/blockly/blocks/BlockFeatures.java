package dk.sdu.bdd.xtext.web.services.blockly.blocks;

import java.util.ArrayList;
import java.util.HashMap;

public class BlockFeatures {
	public HashMap<String, HashMap<StatementTypes, ArrayList<String>>> blockFeatures;
	
	public enum StatementTypes {
		previousStatement,
		nextStatement,
		output
	}
	
	public BlockFeatures() {
		blockFeatures = new HashMap<>();
	}
	
	public void addStatement(String blockId, String connectorId, StatementTypes type) {
		assert(blockId != null);
		assert(connectorId != null);
		HashMap<StatementTypes, ArrayList<String>> block = blockFeatures.get(blockId);
		if (block == null) {
			block = new HashMap<>();
		}
		ArrayList<String> statement =  block.get(type);
		if (statement == null) {
			statement = new ArrayList<>();
		}
		
		statement.add(connectorId);
		block.put(type, statement);
		blockFeatures.put(blockId, block);
	}
	
	public ArrayList<String> getFeature(String blockId, StatementTypes type){
		HashMap<StatementTypes, ArrayList<String>> block = blockFeatures.get(blockId);
		if (block == null) {
			return null;
		}
		ArrayList<String> features = block.get(type);
		if (features != null) {
			return features;
		}
		return null;
	}
}
