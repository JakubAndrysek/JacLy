import Blockly, {BlockSvg} from "blockly";
// import 'blockly/javascript';
import { javascriptGenerator } from "blockly/javascript";
import {CodeGenerator} from "blockly/core/generator";

// Blockly.Blocks['console_log'] = {
//     init: function() {
//         this.appendValueInput("MESSAGE")
//             .setCheck(null)
//             .appendField("Console.log");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(160);
//         this.setTooltip("dd");
//         this.setHelpUrl("");
//     }
// };
//
// javascriptGenerator.forBlock['console_log'] = function(block: BlockSvg, generator: CodeGenerator) {
//     var code = 'console.log(' + generator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_ATOMIC) + ');\n';
//     return code;
// };

Blockly.Blocks['console'] = {
    init: function() {
        this.appendValueInput("TEXT")
            .setCheck(null)
            .appendField("Console.")
            .appendField(new Blockly.FieldDropdown([["log","log"], ["error","error"], ["info","info"], ["debug","debug"]]), "TYPE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Console....");
        this.setHelpUrl("https://developer.mozilla.org/en-US/docs/Web/API/console");
    }
};

javascriptGenerator.forBlock['console'] = function(block: BlockSvg, generator: CodeGenerator) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_text = generator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC);
    var code = `console.${dropdown_type}(${value_text});\n`;
    return code;
};



Blockly.Blocks['set_interval'] = {
    init: function() {
        this.appendValueInput("INTERVAL")
            .setCheck(null)
            .appendField("setInterval");
        this.appendStatementInput("CODE")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['set_interval'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'setInterval(function(){\n' + generator.statementToCode(block, 'CODE') + '}, ' + generator.valueToCode(block, 'INTERVAL', javascriptGenerator.ORDER_ATOMIC) + ');\n';
    return code;
}