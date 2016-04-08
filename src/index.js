import through from 'through2';
import pug from 'pug';
import { join, basename } from 'path';
import { PluginError, replaceExtension } from 'gulp-util';
import { _extend as extend } = 'util';

export default function gulpPug(baseOpts = {}) {
  return through.obj(function stream(file, enc, callback) {
    let error = null;

    if (file.isBuffer()) {
      const opts = extend({ filename: file.path }, baseOpts);
      const contents = pug.render(file.contents.toString(), opts);
      file.contents = new Buffer(contents);
    } else {
      error = new PluginError('gulp-pug', 'Unsupported file content');
    }

    file.path = replaceExtension(file.path, '.html');

    callback(error, file);
  });
};
