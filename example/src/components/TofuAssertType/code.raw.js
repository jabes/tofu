function colorMe(element) {
  var text = tofu.textContent(element);
  if (text.indexOf("true") > -1) {
    tofu.setStyle(element, "background-color", "#4d853f");
    tofu.setStyle(element, "color", "#9fcc94");
  } else {
    tofu.setStyle(element, "background-color", "#b52f2f");
    tofu.setStyle(element, "color", "#e18f8f");
  }
}

function getValueAsString(value) {
  var type = tofu.type(value);
  switch (type) {
    case "null": case "undefined": return type; break;
    case "string": return tofu.isNumeric(value) ? ('"' + value + '"') : value; break;
    case "array": return "[" + value.toString() + "]"; break;
    case "object": return JSON.stringify(value); break;
    default: return value.toString(); break;
  }
}

var elm = document.getElementById("TofuAssertType");

var tests = [
  "isNumber",
  "isNumeric",
  "isString",
  "isUndefined",
  "isNull",
  "isBoolean",
  "isArray",
  "isObject",
  "isFunction",
  "isDate",
  "isElement"
];

var pool = [
  0,
  '0',
  undefined,
  null,
  false,
  [1,2,3],
  {foo:"bar"},
  function () {},
  new Date(),
  document.createElement("span")
];

tofu.loopArray(tests, function (test) {
  var heading = tofu.domAppend("h3", elm, "Assert: " + test);
  var table = tofu.domAppend("table", elm);
  tofu.loopArray(pool, function (value) {
    var result = tofu[test].call(this, value).toString();
    var row = tofu.domAppend("tr", table);
    var td1 = tofu.domAppend("td", row, getValueAsString(value));
    var td2 = tofu.domAppend("td", row, result);
    colorMe(td2);
  });
});
