function generateBlocksFromAst(ast, workspace) {
    if (workspace)
    {
        workspace.clear();
        generateBlock(ast, workspace);
    }        
}

function generateBlock(obj, workspace) {
    if (obj._children && Array.isArray(obj._children)) {
        obj._children.forEach(function(child) {
            generateBlock(child, workspace);
        });
    }
    else if (obj._children) {
        if (obj._children.value)
        {
            console.log(obj._children.value._value);
            var parsedObj = parseValueString(obj._children.value._value);

            if (parsedObj)
                addBlockToWorkspace(parsedObj, workspace);            
        }

        if (obj._children.nodes)
        {
            generateBlock(obj._children.nodes, workspace);
        }
    }
}

function addBlockToWorkspace(parsedObj, workspace) {
    if (parsedObj.type)
    {
        var blockToAdd = workspace.newBlock(parsedObj.type);
        workspace.getBlockById(blockToAdd.id).initSvg();
        workspace.render();
    }    
}

function parseValueString(str) {
    // Regular expression to match the type, reference, and ID
    var regex = /(\w+)\s*(?:->\s*(\w+))?\s*\(name:\s+(\w+)\)/;

    // Use match to extract the type, reference, and ID from the string
    var matches = str.match(regex);

    // Check if matches were found
    if (matches && matches.length >= 3) {
        // Extract type, reference, and ID from the matches array
        var type = matches[1];
        var reference = matches[2] || null;
        var id = matches[3];

        return { type: type, reference: reference, id: id };
    } else {
        return null;
    }
}