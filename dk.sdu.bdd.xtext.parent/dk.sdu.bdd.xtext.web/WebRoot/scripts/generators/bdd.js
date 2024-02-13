const Order = {
    ATOMIC: 0,
};

bddGenerator = new Blockly.Generator('bdd');

// Model
bddGenerator.forBlock['Model'] = function(block, generator) {
    const modelName = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);

    const statementMembers =
        generator.statementToCode(block, 'alternatives_statement'); // like an object

    const code = `model ${modelName}\n${statementMembers}`;
    return code;
};

bddGenerator.forBlock['ModelRef'] = function(block, generator) {
    const modelName = generator.valueToCode(block, 'ModelRef_ID',
        Order.ATOMIC);
    const code = `using ${modelName}`;
    return code;
};

// Declarative Entities and Definitions
bddGenerator.forBlock['DeclarativeEntityDef'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);

    const input2 = generator.statementToCode(block, 'DeclarativeEntityDef_input_2');
    const input3 = generator.statementToCode(block, 'DeclarativeEntityDef_input_3');

    const code = `declarative entity ${name}\n${input2}\n{${input3}}`;
    return code;
};

bddGenerator.forBlock['subBlock_DeclarativeEntityDef_is'] = function(block, generator) {
    const name = generator.valueToCode(block, 'subBlock_DeclarativeEntityDef_is_ID',
        Order.ATOMIC);

    const input = generator.statementToCode(block, 'subBlock_DeclarativeEntityDef_is_input_2');

    const code = `is ${name}\n${input}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_DeclarativeEntityDef_is_,'] = function(block, generator) {
    const name = generator.valueToCode(block, 'subBlock_subBlock_DeclarativeEntityDef_is_,_ID',
        Order.ATOMIC);
    const code = `, ${name}`;
    return code;
};

bddGenerator.forBlock['subBlock_DeclarativeEntityDef_actions:'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);

    const input = generator.statementToCode(block, 'subBlock_DeclarativeEntityDef_actions:_input_2');

    const code = `actions: ${name}\n${input}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_DeclarativeEntityDef_actions:_the'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);
    const code = `the ${name}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_DeclarativeEntityDef_actions:_[_]'] = function(block) {
    const fieldValue = block.getFieldValue('alternativs');
    const code = `[${fieldValue}]`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_DeclarativeEntityDef_actions:'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);
    const fieldValue = block.getFieldValue('alternativs');
    const code = `${fieldValue} ${name}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_DeclarativeEntityDef_actions:_,'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);

    const input = generator.statementToCode(block, 'subBlock_subBlock_DeclarativeEntityDef_actions:_,_input_2');

    const code = `, ${name}\n${input}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_subBlock_DeclarativeEntityDef_actions:_,_the'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);
    const code = `the ${name}`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_subBlock_DeclarativeEntityDef_actions:_,_[_]'] = function(block) {
    const fieldValue = block.getFieldValue('alternativs');
    const code = `[${fieldValue}]`;
    return code;
};

bddGenerator.forBlock['subBlock_subBlock_subBlock_DeclarativeEntityDef_actions:_,'] = function(block, generator) {
    const name = generator.valueToCode(block, 'name_ID',
        Order.ATOMIC);
    const fieldValue = block.getFieldValue('alternativs');
    const code = `${fieldValue} ${name}`;
    return code;
};

// bddGenerator.forBlock['subBlock_DeclarativeEntityDef_states'] = function(block, generator) {
    
// };

// bddGenerator.forBlock['subBlock_DeclarativeEntityDef_properties'] = function(block, generator) {
    
// };

// Terminals
bddGenerator.forBlock['STRING'] = function(block) {
    const textValue = block.getFieldValue('TEXT_INPUT');
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
};

bddGenerator.forBlock['ID'] = function(block) {
    const textValue = block.getFieldValue('TEXT_INPUT');
    const code = `${textValue}`;
    return [code, Order.ATOMIC];
};

bddGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + '\n' + bddGenerator.blockToCode(nextBlock);
    }    
    return code;
};

function getBddGenerator()
{
    return bddGenerator;
}