require.paths.unshift("../deps/jspec/lib");
process.mixin(GLOBAL, require("sys"))

require("jspec")

var posix = require("posix");

quit = process.exit
readFile = function(path) {
  var promise = posix.cat(path, "utf8")
  var result = ''
  promise.addErrback(function(){ throw "failed to read file `" + path + "'" })
  promise.addCallback(function(contents){
    result = contents
  })
  promise.wait()
  return result
}

JSpec.exec('core/jspec.spec')
  .run({ reporter : JSpec.reporters.Terminal, failuresOnly : true })
  .report()
