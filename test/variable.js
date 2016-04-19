'use strict';

var test = require('ava');
var pug = require('..');
var gulp = require('gulp');
var through = require('through2');
var data = require('gulp-data');

test.cb('variable', t => {
  gulp.src('variable.pug')
  .pipe(data(function() {
    return {
      foo: 'bar'
    };
  }))
  .pipe(pug({
    data: {
      bar: 'qux'
    }
  }))
  .pipe(through.obj(function(file, enc, cb) {
    t.deepEqual(file.contents.toString(),
'<p>bar</p><div>qux</div>');
    t.end();
    cb();
  }));
});
