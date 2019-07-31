/* Copyright (c) 2017-2019 Richard Rodger and other contributors, MIT License */
"use strict";

const Code = require("@hapi/code");
const expect = Code.expect;

module.exports = function make_validate(Plugin, plugin_module) {
  return async function validate() {
    var errmsg, errkey;

    try {
      var folder = plugin_module.paths[1]
        .split(/[\\\/]/)
        .slice(0, -1)
        .join("/");

      errkey = "pv001000";
      errmsg = "The test folder should be a child of the project folder.";
      var pkg = require(folder + "/package.json");

      errkey = "pv001010";
      errmsg =
        "Use http://prettier.io for consistent code formatting. There should be a `prettier` script in package.json.";
      expect(pkg.scripts).contain("prettier");

      errkey = "pv002000";
      errmsg =
        "The node.js module implementing a Seneca plugin should be a function.";
      expect(Plugin).function();
    } catch (err) {
      err.message =
        errmsg +
        "\n\t=> " +
        err.message +
        "\n\t=> See http://senecajs.org/validator#" +
        errkey;

      throw err;
    }
  };
};
