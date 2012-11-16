/*jslint sloppy: true, browser: true, devel: true */
/*global $, tofu */

tofu.noConflict();

(function ($) {

	'use strict';

	$.onDomReady(function () {

		var animationTest = document.getElementById("animationTest"),
			unitTest1 = document.getElementById("unitTest1"),
			unitTest2 = document.getElementById("unitTest2"),
			unitTest3 = document.getElementById("unitTest3"),
			unitTest4 = document.getElementById("unitTest4"),
			unitTest5 = document.getElementById("unitTest5"),
			unitTest6 = document.getElementById("unitTest6"),
			unitTest7 = document.getElementById("unitTest7"),
			unitTest8 = document.getElementById("unitTest8"),
			unitTest9 = document.getElementById("unitTest9"),
			unitTest10 = document.getElementById("unitTest10"),
			unitTest11 = document.getElementById("unitTest11"),
			unitTest12 = document.getElementById("unitTest12"),
			computedStyles = document.getElementById("computedStyles"),
			parseHTML = document.getElementById("parseHTML"),
			pool = [
				0,
				'0',
				undefined,
				null,
				false,
				[],
				{},
				function () {},
				new Date(),
				document.createElement("span")
			];

		// ######################################################################################

		var box1 = $.domAppend("div", animationTest);
		$.addClass(box1, "box");
		$.click(box1, function () {
			$.animate(this, "left", 500, 1000, function () {
				// note: css declarations will automatically receive the "px" unit unless they do not require it (font-weight, font-size, line-height, opacity, z-index, zoom)
				$.animate(this, {
					width: 50,
					height: 50,
					fontSize: 25,
					opacity: 0.5
				}, 500);
			});
		});

		// ######################################################################################

		function colorMe(e) {
			if ($.textContent(e) === "true") {
				$.setStyle(e, "color", "green");
			} else {
				$.setStyle(e, "color", "red");
			}
		}

		$.loopArray(pool, function (value) {
			$.domAppend("li", unitTest1, "type: " + $.type(value));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest2, String($.isNumber(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest3, String($.isString(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest4, String($.isUndefined(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest5, String($.isNull(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest6, String($.isBoolean(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest7, String($.isArray(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest8, String($.isObject(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest9, String($.isFunction(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest10, String($.isDate(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest11, String($.isElement(value))));
		});
		$.loopArray(pool, function (value) {
			colorMe($.domAppend("li", unitTest12, String($.isNumeric(value))));
		});

		// ######################################################################################

		var colorBefore,
			colorAfter,
			box2 = $.domAppend("div", computedStyles, {
				'class': "box"
			});
		colorBefore = $.getStyle(box2, "backgroundColor");
		$.setStyle(box2, "backgroundColor", "blue");
		colorAfter = $.getStyle(box2, "backgroundColor");
		$.domAppend("p", computedStyles, "Color Before: " + colorBefore);
		$.domAppend("p", computedStyles, "Color After: " + colorAfter);

		// ######################################################################################

		$.domAppend($.parseHTML({
			nodeName: "button",
			id: "jsonButton88",
			className: "button-wrapper",
			childNodes: [{
				nodeName: "span",
				className: "button-inner",
				text: "THIS BUTTON WAS MADE WITH JSON!"
			}],
			attr: {
				type: "button"
			}
		}), parseHTML);

		$.click(document.getElementById("jsonButton88"), function () {
			alert("You really know how to push my buttons");
		});

	});

}(tofu));