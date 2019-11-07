var container = document.getElementById("TofuAnimation");
var box = tofu.domAppend("div", container);
var output = tofu.domAppend("pre", container);

function parseCSSText(cssText) {
  var result = {};
  var attributes = cssText.split(';');
  tofu.loopArray(attributes, function (attribute) {
    if (!attribute) return;
    var entry = attribute.split(':');
    var property = entry[0].trim();
    var value = entry[1].trim();
    result[property] = value;
  });
  return result;
}

function printCurrentStyle() {
  var styles = tofu.attribute(box, 'style');
  var parsed = parseCSSText(styles);
  var text = JSON.stringify(parsed, null, 2);
  output.innerHTML = text;
}

tofu.setStyles(box, {
  position: "relative",
  width: "200px",
  height: "200px",
  backgroundColor: "#b52f2f",
  cursor: "pointer",
  opacity: 1,
  left: 0,
});

tofu.setStyles(output, {
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: 0,
  padding: "10px",
  backgroundColor: "#4d853f",
  color: "#9fcc94",
});

tofu.click(box, function () {
  tofu.animate(this, { width: 50, height: 50, opacity: .5 }, 500, function () {
    tofu.animate(this, { left: 750 }, 1500, function () {
      tofu.animate(this, { left: 0 }, 1500, function () {
        tofu.animate(this, { width: 200, height: 200, opacity: 1 }, 500);
      });
    });
  });
});

printCurrentStyle();

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(printCurrentStyle);
});

observer.observe(box, {
  attributes: true,
  attributeFilter: ['style']
});