let blockDefinitions;

function generateBlocksFromAst(ast, workspace, blockArray) {
    if (!workspace || !blockArray || !ast)
        return;

    if (blockArray)
        blockDefinitions = blockArray;
    
    workspace.clear();
    generateBlock(ast._children[0], null, workspace); // there is only 1 model
}

function generateBlock(obj, parentObj, workspace)
{
    if (obj._children && !Array.isArray(obj._children)) {
        if (obj._children.value)
        {
            console.log(obj._children.value._value);
            var parsedObj = parseValueString(obj._children.value._value);
            var parsedParentObj = null;

            if (parentObj)
                parsedParentObj = parseValueString(parentObj._children.value._value);

            if (parsedObj)
                addBlockToWorkspace(parsedObj, parsedParentObj, workspace);     
        }

        if (obj._children.nodes)
        {
            for (let child of obj._children.nodes._children) {
                generateBlock(child, obj, workspace);
            }
        }
    }
}

function addBlockToWorkspace(parsedObj, parsedParentObj, workspace) {
    if (!parsedObj.type || !blockDefinitions)
        return;

    var blockToAdd = null;
    var parentBlockDefinition = null;    

    if (parsedParentObj)
    {
        var parentBlockDefinition = blockDefinitions.find(function(b) {
            return b.type === parsedParentObj.type;
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
            case 'StateName':
                substringToSearch = "states";
                break;
            default:
                console.log("Can't add the block with type: " + parsedObj.type);
        }

        if (!substringToSearch)
            return;

        var inputArgument = parentBlockDefinition.args0.find(function(a) {
            return a.check.some(function(checkItem) {
                return checkItem.includes(substringToSearch);
            }) && a.type === 'input_statement';
        });

        if (inputArgument) // means we can connect to the parent block as an input
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
            console.log("Can't connect to block as input: " + parsedObj.type);
    }
    else
    {
        blockToAdd = workspace.newBlock(parsedObj.type);
    }

    if (!blockToAdd)
        return;

    if (parsedObj.id)
        addIdBlock(parsedObj.id, blockDefinition, blockToAdd, workspace);
    
    if (parentBlockDefinition)
        connectParentBlock(parsedParentObj, parentBlockDefinition, blockToAdd, workspace);

    workspace.getBlockById(blockToAdd.id).initSvg();
    workspace.render();
}

function connectParentBlock(parentBlock, parentBlockDefinition, blockToAdd, workspace)
{
    var inputArgument = parentBlockDefinition.args0.find(function(a) {
        return a.check.includes(blockToAdd.type) && a.type === 'input_statement';
    });

    var targetBlock = workspace.getBlockById(parentBlock.id);

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