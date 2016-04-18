'use strict';

const test = require('ava');
const pug = require('../lib');
const gulp = require('gulp');
const data = require('gulp-data');
const del = require('del');
const extname = require('path').extname;

test.cb('compiling', t => {
  t.plan(2);
  del(['variable.html']);

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
  .pipe(gulp.dest('.'))
  .on('data', function(file) {
    t.deepEqual(file.contents.toString(),
'<p>bar</p><div>qux</div>');
    t.is(extname(file.path), '.html');
    t.end();
  });
});
