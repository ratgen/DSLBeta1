package dk.sdu.bdd.xtext.web.services.blockly.blocks;

import java.util.ArrayList;
import java.util.HashMap;

public class BlockFeatures {
	private HashMap<String, HashMap<String, ArrayList<String>>> blockFeatures;
	
	public BlockFeatures() {
		blockFeatures = new HashMap<>();
	}
	
	private void addNewBlock(String blockId) {
		
	}
	
	public void addPrevStatement(String blockId, String connectorId) {
		HashMap<String, ArrayList<String>> block = blockFeatures.get(blockId);
		if (block == null) {
			
		}
		
		blockFeatures.put(connectorId, null)
	}
}
