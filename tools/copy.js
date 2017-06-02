/**
 * Created by sky on 2017/6/2.
 */
var shell = require('shelljs');
shell.echo('Copy build dir to server/public');
shell.rm('-rf', '../server/public/*');
shell.cp('-R', '../build/*', '../server/public');