var elm = document.getElementById("TofuAnimation");
var box = tofu.domAppend("div", elm);

tofu.setStyles(box, {
  display: "block",
  position: "relative",
  width: "200px",
  height: "200px",
  background: "red",
  cursor: "pointer",
});

tofu.click(box, function () {
  tofu.animate(this, "left", 500, 1000, function () {
    tofu.animate(this, {
      width: 50,
      height: 50,
      fontSize: 25,
      opacity: .5
    }, 500);
  });
});