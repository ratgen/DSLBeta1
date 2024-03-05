let blockDefinitions;

function generateBlocksFromAst(ast, workspace, blockArray) {
    if (!workspace || !blockArray)
        return;

    if (blockArray)
        blockDefinitions = blockArray;
    
    workspace.clear();
    generateBlocks(ast, workspace, null);
    workspace.render();
}

function generateBlocks(root, workspace, parentBlock)
{
    if (!root || !root._children)
        return;

    var childrenIsArray = Array.isArray(root._children);

    for (var i = 0; i < (childrenIsArray ? root._children.length : 1); i++) {
        var current = childrenIsArray ? root._children[root._children.length - 1 - i]._children : root._children;
        if (!current)
            continue;

        var currentParentBlock = null;

        if (current.value) {
            console.log(current.value._value);

            var parsedObj = parseValueString(current.value._value);    
            if (parsedObj && parsedObj.type) {
                var addedBlock = addBlockToWorkspace(parsedObj, workspace, parentBlock); 
                currentParentBlock = addedBlock ? addedBlock : parentBlock;
            }
            else
            {
                currentParentBlock = parentBlock;
            }
        }

        if (current.nodes) {
            generateBlocks(current.nodes, workspace, currentParentBlock);
        }
    }
}

function addBlockToWorkspace(parsedObj, workspace, parentBlock) {
    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === parsedObj.type;
    });

    var blockToAdd = null;

    if (blockDefinition) { // good. we know this block
        blockToAdd = workspace.newBlock(parsedObj.type);
    }
    else { // blocks that should be handled separately
        var substringToSearch = null;

        switch (parsedObj.type)
        {
            case 'PropertyDef':
            case 'ImperativePropertyDef':              
                substringToSearch = "properties";
                break;
            case 'ActionDef':
            case 'ImperativeActionDef':
                substringToSearch = "actions";
                break;
            case 'StateName':
            case 'ImperativeStateName':
                substringToSearch = "states";
                break;
            default:
                console.log("Can't add the block with type: " + parsedObj.type);
                return null;
        }

        if (!substringToSearch)
            return null;

        var parentBlockDefinition = blockDefinitions.find(function(b) {
            return b.type === parentBlock.type;
        });

        var inputArgument = parentBlockDefinition.args0.find(function(a) {
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
        else 
        {
            console.log("Can't add block as an input argument.");
        }
    }

    if (!blockToAdd)
        return null;

    if (parsedObj.id)
        addIdBlock(parsedObj.id, blockToAdd, workspace);

    if (parentBlock)
        addParentBlock(parentBlock, blockToAdd, workspace);

    workspace.getBlockById(blockToAdd.id).initSvg();
    return blockToAdd;
}

function addParentBlock(parentBlock, blockToAdd, workspace)
{
    var parentBlockDefinition = blockDefinitions.find(function(b) {
        return b.type === parentBlock.type;
    });

    var inputArgument = parentBlockDefinition.args0.find(function(a) {
        return a.check.includes(blockToAdd.type) && a.type === 'input_statement';
    });

    var targetBlock = workspace.getBlockById(parentBlock.id);

    if (inputArgument && targetBlock.inputList) // connect as an input
    {
        var input = targetBlock.inputList.find(function(i) {
            return i.name === inputArgument.name;
        });

        targetBlock.inputList.forEach(function(existingInput) {
            var connection = existingInput.connection;
    
            // if a previous block exists, form a connection
            if (connection && connection.targetBlock()) {
                var previousConnection = connection.targetBlock().previousConnection;
                if (previousConnection) {
                    blockToAdd.setNextStatement(true);
                    blockToAdd.nextConnection.connect(previousConnection);
                }
            }
        });

        input.connection.connect(blockToAdd.previousConnection);
    }
}

function addIdBlock(idValue, blockToAdd, workspace) 
{
    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === blockToAdd.type;
    });

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
    var regex = /(\w+)\s*(?:->\s*(\w+))?\s*\(name:\s+(\w+)(?:,\s*preposition:\s+(\w+))?(?:,\s*argument:\s+(\w+))?\)/;

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