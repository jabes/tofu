var container = document.getElementById("TofuComputedStyle");
var box = tofu.domAppend("div", container);

tofu.setStyles(box, {
  width: "200px",
  height: "200px",
  backgroundColor: "#b52f2f",
  marginBottom: "10px",
});

var colorBefore = tofu.getStyle(box, "backgroundColor");
tofu.setStyle(box, "backgroundColor", "#4d853f");
var colorAfter = tofu.getStyle(box, "backgroundColor");

var elmBefore = tofu.domAppend("div", container, "Color Before: " + colorBefore);
var elmAfter = tofu.domAppend("div", container, "Color After: " + colorAfter);

tofu.setStyles(elmBefore, { color: "#666", lineHeight: 1.5 });
tofu.setStyles(elmAfter, { color: "#666", lineHeight: 1.5 });