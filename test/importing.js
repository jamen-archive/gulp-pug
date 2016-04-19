'use strict';

var test = require('ava');
var pug = require('..');
var gulp = require('gulp');
var through = require('through2');

test.cb('importing', t => {
  gulp.src('importing.pug')
  .pipe(pug())
  .pipe(through.obj(function(file, enc, cb) {
    t.deepEqual(file.contents.toString(),
'<!DOCTYPE html><html><body><p>Hello!</p><p>Hello World</p></body></html>');
    t.end();
    cb();
  }));
});
