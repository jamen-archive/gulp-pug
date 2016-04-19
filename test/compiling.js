'use strict';

var test = require('ava');
var pug = require('..');
var gulp = require('gulp');
var through = require('through2');
var extname = require('path').extname;

test.cb('compiling', t => {
  gulp.src('compiling.pug')
  .pipe(pug())
  .pipe(through.obj(function(file, enc, cb) {
    t.deepEqual(file.contents.toString(),
'<!DOCTYPE html><html class="foo" lang="en"></html>');
    t.is(extname(file.path), '.html');
    t.end();
    cb();
  }));
});
