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

// ========== INTERVAL ==========

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

// ========== BASIC ==========

Blockly.Blocks['sleep'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck(null)
            .appendField("await.sleep(ms)   ms =")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(128);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['sleep'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'await.sleep(' + generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +  ')\n'
    
    return code;
}



// ========== SMARTLEDS ==========

Blockly.Blocks['smartled_init'] = {
    init: function() {
        this.appendValueInput("a")
            .appendField("Init Smartled");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['smartled_init'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = '\nimport { SmartLed, LED_WS2812, LED_WS2812B, LED_WS2812B_2020, LED_SK6812, LED_WS2813 } from "smartled";\nfunction HEXtoRgb(hex) {\n    var result = hex.replace("#", "").match(/.{1,2}/g);\n    return {r:parseInt(result[0], 16), g:parseInt(result[1], 16), b:parseInt(result[2], 16)}\n}\nfunction HSVtoRgb(h, s, v) {\n    var r, g, b, i, f, p, q, t;if (arguments.length === 1) {s = h.s, v = h.v, h = h.h;}i = Math.floor(h * 6);f = h * 6 - i;p = v * (1 - s);q = v * (1 - f * s);t = v * (1 - (1 - f) * s);switch (i % 6) {case 0: r = v, g = t, b = p; break;case 1: r = q, g = v, b = p; break;case 2: r = p, g = v, b = t; break;case 3: r = p, g = q, b = v; break;case 4: r = t, g = p, b = v; break;case 5: r = v, g = p, b = q; break;}\n    return {r: Math.round(r * 255),g: Math.round(g * 255),b: Math.round(b * 255)};\n}\n';
    return code;
}


Blockly.Blocks['create_strip'] = {
    init: function() {
        this.appendValueInput("ID")
            .setCheck(null)
            .appendField("create strip")
            .appendField("  id =");
        this.appendValueInput("PIN")
            .setCheck(null)
            .appendField("                     pin =");
        this.appendValueInput("COUNT")
            .setCheck(null)
            .appendField("                 count =");
        this.appendValueInput("TYPE")
            .setCheck(null)
            .appendField("                   type =")
            .appendField(new Blockly.FieldDropdown([["LED_WS2812","LED_WS2812"], ["LED_WS2812B","LED_WS2812B"], ["LED_WS2812B_2020","LED_WS2812B_2020"], ["LED_SK6812","LED_SK6812"], ["LED_WS2813","LED_WS2813"]]), "TYPE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['create_strip'] = function(block: BlockSvg, generator: CodeGenerator) {
    var dropdown_type = block.getFieldValue('TYPE');
    var code = "\nlet strip_"+ generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +' = new SmartLed('+ generator.valueToCode(block, 'PIN', javascriptGenerator.ORDER_ATOMIC) +', '+ generator.valueToCode(block, 'COUNT', javascriptGenerator.ORDER_ATOMIC) +', '+ dropdown_type +')\n';
    return code;
}


Blockly.Blocks['set_hex'] = {
    init: function() {
        this.appendValueInput("ID")
            .setCheck(null)
            .appendField("set hex")
            .appendField("  id =")
        this.appendValueInput("INDEX")
            .setCheck(null)
            .appendField("          index =");
        this.appendValueInput("COLOR")
            .setCheck(null)
            .appendField("             Hex =");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['set_hex'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'strip_' + generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +  '.set('+ generator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_ATOMIC) + ', HEXtoRgb(' + generator.valueToCode(block, 'COLOR', javascriptGenerator.ORDER_ATOMIC) + '));\n';
    return code;
}

Blockly.Blocks['set_hsv'] = {
    init: function() {
        this.appendValueInput("ID")
            .setCheck(null)
            .appendField("set hsv")
            .appendField("  id =")
        this.appendValueInput("INDEX")
            .setCheck(null)
            .appendField("          index =");
        this.appendValueInput("H")
            .setCheck(null)
            .appendField("                 H =");
        this.appendValueInput("S")
            .setCheck(null)
            .appendField("                  S =");
        this.appendValueInput("V")
            .setCheck(null)
            .appendField("                  V =");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['set_hsv'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'strip_' + generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +  '.set('+ generator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_ATOMIC) + ', HSVtoRgb(' + generator.valueToCode(block, 'H', javascriptGenerator.ORDER_ATOMIC) +'/360, ' + generator.valueToCode(block, 'S', javascriptGenerator.ORDER_ATOMIC) + '/256, ' + generator.valueToCode(block, 'V', javascriptGenerator.ORDER_ATOMIC) + '/256));\n';
    return code;
}


Blockly.Blocks['set_rgb'] = {
    init: function() {
        this.appendValueInput("ID")
            .setCheck(null)
            .appendField("set rgb")
            .appendField("  id =")
        this.appendValueInput("INDEX")
            .setCheck(null)
            .appendField("          index =");
        this.appendValueInput("R")
            .setCheck(null)
            .appendField("                 R =");
        this.appendValueInput("G")
            .setCheck(null)
            .appendField("                 G =");
        this.appendValueInput("B")
            .setCheck(null)
            .appendField("                 B =");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['set_rgb'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'strip_' + generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +  '.set('+ generator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_ATOMIC) + ', {r:' + generator.valueToCode(block, 'R', javascriptGenerator.ORDER_ATOMIC) +', g:' + generator.valueToCode(block, 'G', javascriptGenerator.ORDER_ATOMIC) + ', b:' + generator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) + '});\n';
    return code;
}


Blockly.Blocks['strip_show'] = {
    init: function() {
        this.appendValueInput("ID")
            .setCheck(null)
            .appendField("show")
            .appendField("  id =")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(259);
        this.setTooltip("dd");
        this.setHelpUrl("");
    }
}

javascriptGenerator.forBlock['strip_show'] = function(block: BlockSvg, generator: CodeGenerator) {
    var code = 'strip_' + generator.valueToCode(block, 'ID', javascriptGenerator.ORDER_ATOMIC) +  '.show();'
    return code;
}