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