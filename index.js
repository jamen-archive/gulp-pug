'use strict';

var through = require('through2');
var pug = require('pug');
var extend = require('util-extend');
var gutil = require('gulp-util');
var replaceExtension = gutil.replaceExtension;
var PluginError = gutil.PluginError;

module.exports = function gulpPug(opts) {
  var baseOpts = extend({}, opts);

  return through.obj(function(file, enc, callback) {
    var error = null;

    // Prepare new file.
    var html = file.clone();
    html.path = replaceExtension(html.path, '.html');

    // Create options for pug.
    var opts = extend({
      filename: file.path
    }, baseOpts);

    // Locals
    opts.data = opts.data || {};
    var data = opts.data;
    if (file.data) {
      data = extend(data, file.data);
    }

    // Custom pug module
    if (opts.pug) {
      pug = opts.pug;
    }

    // Replace contents
    if (html.isBuffer()) {
      try {
        var contents = pug.compile(file.contents.toString(), opts)(data);
        html.contents = new Buffer(contents);
      } catch (err) {
        error = new PluginError('gulp-pug', err);
      }
    } else {
      error = new PluginError('gulp-pug', 'Unsupported file content');
    }

    // Continue
    callback(error, error ? null : html);
  });
};
