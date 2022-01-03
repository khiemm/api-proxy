const errorFormatter = function (param, message, value) {
  var formParam, namespace, result, root;
  namespace = param.split(".");
  root = namespace.shift();
  formParam = root;
  while (namespace.length) {
    formParam += "[" + namespace.shift() + "]";
  }
  return (result = {
    param: formParam,
    message: message,
    value: value,
  });
};

module.exports = errorFormatter;
