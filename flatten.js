function flatten (input, shallow, strict, output) {
  output = output || []
  var idx = output.length;
  for (var i = 0; i < input.length; i++) {
    var value = input[i];

    if (Array.isArray(value)) {
      if (shallow) {
        var j = 0, length = value.length;
        while (j < length) output[idx++] = value [j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}