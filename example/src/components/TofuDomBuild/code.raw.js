function getStyleString(styleObject) {
  var initialValue = "";
  return Object.entries(styleObject).reduce(function (styleString, [propName, propValue]) {
    return styleString + camelCaseToDash(propName) + ":" + propValue + ";";
  }, initialValue);
}

function camelCaseToDash(camelString) {
  return camelString.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
}

var container = document.getElementById("TofuDomBuild");

var json = {
  nodeName: "button",
  id: "7843479500",
  className: "button",
  childNodes: [{
    nodeName: "span",
    className: "label",
    text: "THIS BUTTON WAS MADE WITH JSON!"
  }],
  attr: {
    type: "button",
    style: getStyleString({
      display: "block",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      background: "#4d853f",
      color: "white",
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    }),
  }
};

var documentFragment = tofu.parseHTML(json);
var button = documentFragment.firstElementChild;

tofu.domAppend(button, container);

tofu.addEvent(button, "mouseenter", function (event) {
  tofu.setStyle(event.target, "backgroundColor", "#9fcc94");
});

tofu.addEvent(button, "mouseleave", function (event) {
  tofu.setStyle(event.target, "backgroundColor", "#4d853f");
});

tofu.click(button, function () {
  alert("You really know how to push my buttons ;-)");
});