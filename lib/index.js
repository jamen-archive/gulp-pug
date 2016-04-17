'use strict';

var through = require('through2');
var pug = require('pug');
var extend = require('util-extend');
var gutil = require('gulp-util');
var replaceExtension = gutil.replaceExtension;
var PluginError = gutil.PluginError;

module.exports = function gulpPug(opts) {
  var baseOpts = extend({}, typeof opts === 'undefined' ? {} : opts);

  return through.obj(function(file, enc, callback) {
    var error = null;

    // Prepare new file.
    var html = file.clone();
    html.path = replaceExtension(html.path, '.html');

    // Create options for pug.
    var opts = extend({
      filename: file.path
    }, baseOpts);

    opts.data = opts.data || {};

    var data;
    if (file.data) {
      data = extend(opts.data, file.data);
    }

    // Replace contents
    if (html.isBuffer()) {
      var contents = pug.compile(file.contents.toString(), opts)(data);
      html.contents = new Buffer(contents);
    } else {
      error = new PluginError('gulp-pug', 'Unsupported file content');
    }

    // Continue
    callback(error, html);
  });
};
