// ==UserScript==
// @name         Vlaros's userscript for Scratch
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes news section on scratch home page. Extends 'What's Happening?' section
// @author       @vlaros
// @match        https://scratch.mit.edu/
// ==/UserScript==




function addStylesheetRules (rules) {
  var styleEl = document.createElement('style'),
      styleSheet;

  // Append style element to head
  document.head.appendChild(styleEl);

  // Grab style sheet
  styleSheet = styleEl.sheet;

  for (var i = 0, rl = rules.length; i < rl; i++) {
    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }

    // Insert CSS Rule
    styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
  }
}

addStylesheetRules([
      ['.splash .splash-header .box', 
        ['width', '100%', true]
    ],
    ['.box.news',
     ['display', 'none', true]
    ]
]);