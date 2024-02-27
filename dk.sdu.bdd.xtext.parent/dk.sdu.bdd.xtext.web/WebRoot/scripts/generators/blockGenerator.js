let blockDefinitions;
let previousBlock;

function generateBlocksFromAst(ast, workspace, blockArray) {
    if (blockArray)
        blockDefinitions = blockArray;
    
    if (workspace)
    {
        previousBlock = null;
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
    if (!parsedObj.type || !blockDefinitions)
        return;

    var blockToAdd = null;
    var previousBlockDefinition = null;    

    if (previousBlock)
    {
        var previousBlockDefinition = blockDefinitions.find(function(b) {
            return b.type === previousBlock.type;
        });
    }    

    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === parsedObj.type;
    });

    if (!blockDefinition) // this means we have to work with subblocks
    {
        var substringToSearch = null;

        switch (parsedObj.type)
        {
            case 'PropertyDef':               
                substringToSearch = "properties";
                break;
            case 'ActionDef':
                substringToSearch = "actions";
                break;
            case 'StateDef':
                substringToSearch = "states";
                break;
            default:
                console.log("Can't add the block with type: " + parsedObj.type);
        }

        if (!substringToSearch)
            return;

        var inputArgument = previousBlockDefinition.args0.find(function(a) {
            return a.check.some(function(checkItem) {
                return checkItem.includes(substringToSearch);
            }) && a.type === 'input_statement';
        });

        if (inputArgument) // means we can connect to the previous block as an input
        {
            var blockType = inputArgument.check.find(function(c) {
                return c.includes(substringToSearch);
            });

            blockToAdd = workspace.newBlock(blockType);
            blockDefinition = blockDefinitions.find(function(b) {
                return b.type === blockType;
            });
        }
        else // connect to the previous-previous block as an input instead
        {
            previousBlock = previousBlock.getPreviousBlock();
            addBlockToWorkspace(parsedObj, workspace);
        }
    }
    else
    {
        blockToAdd = workspace.newBlock(parsedObj.type);
    }

    if (!blockToAdd)
        return;

    if (parsedObj.id)
        addIdBlock(parsedObj.id, blockDefinition, blockToAdd, workspace);
    
    if (previousBlockDefinition)
        addPreviousBlock(previousBlock, previousBlockDefinition, blockToAdd, workspace);

    workspace.getBlockById(blockToAdd.id).initSvg();
    previousBlock = blockToAdd; 

    workspace.render();
}

function addPreviousBlock(previousBlock, previousBlockDefinition, blockToAdd, workspace)
{
    var inputArgument = previousBlockDefinition.args0.find(function(a) {
        return a.check.includes(blockToAdd.type) && a.type === 'input_statement';
    });

    var targetBlock = workspace.getBlockById(previousBlock.id);

    if (inputArgument && targetBlock.inputList) // connect as an input
    {
        var input = targetBlock.inputList.find(function(i) {
            return i.name === inputArgument.name;
        });

        input.connection.connect(blockToAdd.previousConnection);
    }
    else // connect directly as previous statement
    {
        blockToAdd.setNextStatement(true);
        targetBlock.nextConnection.connect(blockToAdd.previousConnection);
    }
}

function addIdBlock(idValue, blockDefinition, blockToAdd, workspace) 
{
    var idBlock = workspace.newBlock('ID');
    idBlock.setFieldValue(idValue, 'TEXT_INPUT');
    
    var inputArgument = blockDefinition.args0.find(function(a) {
        return a.check.includes('ID') && a.type === 'input_value';
    });

    var inputConnection = blockToAdd.getInput(inputArgument.name).connection;
    idBlock.outputConnection.connect(inputConnection);

    workspace.getBlockById(idBlock.id).initSvg();
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
    } 
    else {
        return null;
    }
}