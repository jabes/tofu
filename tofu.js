/*jslint nomen: true, plusplus: true, regexp: true, browser: true */
(function (window) {

	'use strict';

	var document = window.document,
		_$ = window.$, // save copy of $ in case of overwrite
		cacheEvents = {},
		cacheElements = {}, // keeps track of all elements (indexed by their guid) in dom that have been added by our script
		jsonpHandler = {}, // holds jsonp callback functions index by the scriptid
		jsonpTimeout = {}, // holds jsonp timeout methods index by the scriptid

		readyStates = {
			complete: 'complete',
			loaded: 'loaded'
		},

		attributes = {
			id: 'id',
			src: 'src',
			type: 'type',
			guid: 'guid'
		},

		events = {
			click: 'click',
			load: 'load',
			readystatechange: 'readystatechange',
			domcontentloaded: 'domcontentloaded'
		},

		html = {
			script: 'script',
			head: 'head',
			body: 'body',
			div: 'div',
			span: 'span'
		},

		css = {
			display: 'display',
			width: 'width',
			height: 'height',
			visibility: 'visibility',
			opacity: 'opacity',
			filter: 'filter',
			zIndex: 'zIndex',
			cssFloat: 'float',
			fontWeight: 'fontWeight',
			zoom: 'zoom',
			lineHeight: 'lineHeight'
		},

		splElmIds = {
			'window': 'GUID-WINDOW',
			'document': 'GUID-DOCUMENT'
		},

		regex = {
			// strip spaces
			ss: /\s/g,
			// used to parse web urls
			purl: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			// used to parse web url get parameters
			query: /(?:^|&)([^&=]*)=?([^&]*)/g,
			// strip all but numbers and period and minus symbol
			nump: /[^0-9\.\-]+/g,
			// used to camelize
			camel: /-+(.) ?/g,
			// used to grab file extensions
			fext: /[^.]+$/,
			// used in support test of opacity
			opacity: /^0.55$/
		},

		protoString = Object.prototype.toString,
		defaultView = document.defaultView,

		whiteSpace = ' ',
		asterisk = '*',
		cssUnit = 'px',
		ieEventPrefix = 'on',

		MIME_JSTXT = 'text/javascript',

		// valid typeof results
		NULL_TYPE = 'null',
		UNDEFINED_TYPE = 'undefined',
		BOOLEAN_TYPE = 'boolean',
		NUMBER_TYPE = 'number',
		STRING_TYPE = 'string',
		OBJECT_TYPE = 'object',

		// our type method (tofu.type) will return the previous types (valid typeof) as well as the following types (not valid typeof)
		ARRAY_TYPE = 'array',
		FUNCTION_TYPE = 'function',
		ELEMENT_TYPE = 'element',
		DATE_TYPE = 'date',

		BOOLEAN_CLASS = '[object Boolean]',
		NUMBER_CLASS = '[object Number]',
		STRING_CLASS = '[object String]',
		ARRAY_CLASS = '[object Array]',
		FUNCTION_CLASS = '[object Function]',
		DATE_CLASS = '[object Date]',

		support = {
			opacity: function () {
				var div = document.createElement(html.div),
					span;
				div.innerHTML = '<span style="opacity:.55;"></span>';
				span = div.getElementsByTagName(html.span)[0];
				return regex.opacity.test(span.style[css.opacity]);
			},
			cssFloat: function () {
				var div = document.createElement(html.div),
					span;
				div.innerHTML = '<span style="float:left;"></span>';
				span = div.getElementsByTagName(html.span)[0];
				// cssFloat = w3c 
				// styleFloat = msie
				return !!span.style.cssFloat;
			}
		};


	var tofu = {

		noConflict: function () {
			if (window.$ === tofu) {
				window.$ = _$;
			}
			return tofu;
		},

		onDomReady: function (fn) {

			var listenType = (document.addEventListener) ? events.domcontentloaded : events.readystatechange,
				unload = function () {
					tofu.removeEvent(document, listenType);
					tofu.removeEvent(window, events.load);
				};

			if (document.readyState !== readyStates.complete) {

				tofu.addEvent(document, listenType, function () {
					if (document.readyState === readyStates.complete) {
						unload.call();
						fn.call();
					}
				});

				// fallback on page load
				tofu.addEvent(window, events.load, function () {
					unload.call();
					fn.call();
				});

			} else {

				fn.call();

			}

		},

		loadScript: function (url, callback) {

			var script,
				properties = {},
				unload = function () {
					tofu.removeEvent(script, events.readystatechange);
					tofu.removeEvent(script, events.load);
				};

			properties[attributes.src] = url;
			properties[attributes.type] = MIME_JSTXT;

			script = tofu.domAppend(html.script, document.getElementsByTagName(html.head)[0], properties);

			// MSIE
			tofu.addEvent(script, events.readystatechange, function () {
				if (script.readyState === readyStates.complete || script.readyState === readyStates.loaded) {
					unload.call();
					callback(script);
				}
			});

			// OTHERS
			tofu.addEvent(script, events.load, function () {
				unload.call();
				callback(script);
			});

		},

		type: function (o) {
			switch (o) {
			case null:
				return NULL_TYPE;
			case (void 0):
				return UNDEFINED_TYPE;
			}
			var proto = protoString.call(o);
			switch (proto) {
			case BOOLEAN_CLASS:
				return BOOLEAN_TYPE;
			case NUMBER_CLASS:
				return NUMBER_TYPE;
			case STRING_CLASS:
				return STRING_TYPE;
			case ARRAY_CLASS:
				return ARRAY_TYPE;
			case FUNCTION_CLASS:
				return FUNCTION_TYPE;
			case DATE_CLASS:
				return DATE_TYPE;
			}
			if (o.nodeType === 1) {
				return ELEMENT_TYPE;
			}
			// if all fails then assume object
			return OBJECT_TYPE;
		},


		isElement: function (e) {
			//return !!(e && e.nodeType === 1);
			return tofu.type(e) === ELEMENT_TYPE;
		},

		isNull: function (e) {
			return tofu.type(e) === NULL_TYPE;
		},

		isUndefined: function (e) {
			return tofu.type(e) === UNDEFINED_TYPE;
		},

		isBoolean: function (e) {
			return tofu.type(e) === BOOLEAN_TYPE;
		},

		isNumber: function (e) {
			return tofu.type(e) === NUMBER_TYPE;
		},

		isString: function (e) {
			return tofu.type(e) === STRING_TYPE;
		},

		isObject: function (e) {
			return tofu.type(e) === OBJECT_TYPE;
		},

		isFunction: function (e) {
			return tofu.type(e) === FUNCTION_TYPE;
		},

		isArray: function (e) {
			return tofu.type(e) === ARRAY_TYPE;
		},

		isDate: function (e) {
			return tofu.type(e) === DATE_TYPE;
		},

		isNumeric: function (n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		hasClass: function (element, s) {
			return new RegExp('\\b' + s + '\\b').test(element.className);
		},

		addClass: function (element, s) {
			if (!tofu.hasClass(element, s)) {
				element.className += element.className ? whiteSpace + s : s;
			}
		},

		removeClass: function (element, s) {
			var rep = element.className.match(whiteSpace + s) ? whiteSpace + s : s;
			element.className = element.className.replace(rep, '');
		},

		getParentByClassName: function (element, s) {
			while (element && !tofu.hasClass(element, s)) {
				element = element.parentNode;
			}
			return element || undefined;
		},

		getElementsByClassName: function (s, node) {
			var output = [];
			node = node || document.getElementsByTagName(html.body).item(0);
			tofu.loopArray(node.getElementsByTagName(asterisk), function (value) {
				if (tofu.hasClass(value, s)) {
					output.push(value);
				}
			});
			return output;
		},

		hasProperty: function (object, property) {

			var hasOwn = Object.prototype.hasOwnProperty,
				proto = '__proto__';

			if (hasOwn) {
				return hasOwn.call(object, property);
			} else {
				proto = object[proto] || object.constructor.prototype;
				return !tofu.isUndefined(object[property]) && (tofu.isUndefined(proto[property]) || proto[property] !== object[property]);
			}
		},

		loop: function (len, callback) {
			var i = 0;
			while (i < len) {
				if (callback(i) === null) { // if the callback returns null then break
					break;
				}
				i++;
			}
		},

		rloop: function (len, func) {
			while (len--) { // note: loop in reverse is the fastest way to iterate an array
				func(len);
			}
		},

		loopArray: function (array, callback) {
			tofu.loop(array.length, function (index) {
				// callback function should never have more than two parameters
				return (callback.length === 2) ? callback(index, array[index]) : callback(array[index]);
			});
		},

		loopObject: function (object, callback) {
			var property;
			for (property in object) {
				// we should really be doing a hasOwnProperty check in here but this function gets a lot of calls and I want it as fast as possible
				if (callback.length === 1) { // return just value
					if (callback(object[property]) === null) {
						break; // if the callback returns null then break
					}
				} else if (callback.length === 2) { // return both key AND value
					if (callback(property, object[property]) === null) {
						break; // if the callback returns null then break
					}
				}
			}
		},

		loopObjectKeys: function (object, callback) {
			var property;
			for (property in object) {
				if (callback(property) === null) {
					break; // if the callback returns null then break
				}
			}
		},

		isObjectEmpty: function (object) {
			var property;
			for (property in object) {
				if (tofu.hasProperty(object, property)) {
					return false;
				}
			}
			return true;
		},

		mergeObject: function (object1, object2) {
			var property;
			for (property in object2) {
				object1[property] = object2[property];
			}
			return object1;
		},

		cloneObject: function (object) {
			var clone = {};
			if (!tofu.isObject(object)) {
				return object;
			}
			tofu.loopObject(object, function (key, val) {
				clone[key] = tofu.cloneObject(val); // recursive
			});
			return clone;
		},

		// note: this function will not accept multi-dimensional objects
		getParamsFromObject: function (object) {
			var s = [];
			tofu.loopObject(object, function (key, val) {
				s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(val);
			});
			return s.join('&');
		},

		getEventTarget: function (event) {
			var target;
			event = event || window.event;
			target = event.target || event.srcElement;
			if (target.nodeType === 3) { // defeat Safari bug
				target = target.parentNode;
			}
			return target;
		},

		randomID: function (size) {
			var str = '',
				i = 0,
				chars = '0123456789ABCDEFGHIJKLMNOPQURSTUVWXYZ';
			while (i < size) {
				str += chars.substr(Math.floor(Math.random() * chars.length), 1);
				i++;
			}
			return str;
		},

		getMousePosition: function (event) {

			event = event || window.event;

			var de = document.documentElement,
				b = document.body,
				cursor = {
					x: 0,
					y: 0
				};

			if (event.pageX || event.pageY) {
				cursor.x = event.pageX;
				cursor.y = event.pageY;
			} else {
				cursor.x = event.clientX + (de.scrollLeft || b.scrollLeft) - de.clientLeft;
				cursor.y = event.clientY + (de.scrollTop || b.scrollTop) - de.clientTop;
			}

			return cursor;
		},

		getWidth: function (element) {
			var width = element.offsetWidth || element.clientWidth;
			// if no value was given then the element is probably just hidden
			if (!width) {
				tofu.setStyle(element, css.visibility, 'hidden');
				tofu.show(element);
				width = element.offsetWidth || element.clientWidth;
				tofu.hide(element);
				tofu.setStyle(element, css.visibility, 'visible');
			}
			return width || 0;
		},

		setWidth: function (element, value) {
			tofu.setStyle(element, css.width, value);
		},

		getHeight: function (element) {
			var height = element.offsetHeight || element.clientHeight;
			// if no value was given then the element is probably just hidden
			if (!height) {
				tofu.setStyle(element, css.visibility, 'hidden');
				tofu.show(element);
				height = element.offsetHeight || element.clientHeight;
				tofu.hide(element);
				tofu.setStyle(element, css.visibility, 'visible');
			}
			return height || 0;
		},

		setHeight: function (element, value) {
			tofu.setStyle(element, css.height, value);
		},

		getCumulativeOffset: function (element) {

			var offset = {
					x: 0,
					y: 0
				};

			if (element.offsetParent) {
				do {
					offset.x += element.offsetLeft;
					offset.y += element.offsetTop;
					element = element.offsetParent;
				} while (element);
			}

			return offset;

		},

		attribute: function (element, name, value) {

			var nType = element.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if (!element || nType === 3 || nType === 8 || nType === 2) {
				return undefined;
			} else if (tofu.isObject(name)) {
				// manage multiple attributes
				tofu.loopObject(name, function (key, val) {
					tofu.attribute(element, key, val);
				});
			} else if (!tofu.isUndefined(value)) {
				if (value === null || value === false) { // REMOVE
					if (name === 'class') {
						tofu.removeClass(element, value);
					} else {
						element.removeAttribute(name);
					}
					return undefined;
				} else { // ADD
					if (name === 'class') {
						tofu.addClass(element, value);
					} else {
						element.setAttribute(name, value);
					}
					return value;
				}
			} else { // GET

				return element.getAttribute(name);
			}

		},

		getGUID: function (element) {

			// yes we have some elements without guids BUT only an element with a guid can have events with the exception window and document
			var guid;

			// we cant set/get attributes on document/window so keep track of them in a different way
			if (element === window) {
				guid = splElmIds.window;
			} else if (element === document) {
				guid = splElmIds.document;
			} else {
				guid = tofu.attribute(element, attributes.guid); // get
				if (!guid) {
					// when creating an element OR adding events to innerHTML that never got a guid
					guid = tofu.attribute(element, attributes.guid, tofu.randomID(16)); // set
				}
			}

			return guid;

		},

		setStyles: function (element, object) {
			tofu.loopObject(object, function (key, val) {
				/*
				key = style property (string)
				val = style value (string/number)
				*/
				tofu.setStyle(element, key, val);
			});
		},

		setStyle: function (element, prop, value) {
			var style = element.style;
			// to speed things up as much as possible, im going to rely on every incoming prop being camel case
			// float is a reserved word, apply fix
			prop = (prop === css.cssFloat) ? (support.cssFloat() ? 'cssFloat' : 'styleFloat') : prop;
			// Don't set styles on text and comment nodes
			if (!style || !element || element.nodeType === 3 || element.nodeType === 8) {
				return;
			}
			if (prop === css.opacity) {
				tofu.setAlpha(element, value);
				return;
			}
			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if (tofu.isNumber(value) && !tofu.inArray([css.zIndex, css.fontWeight, css.opacity, css.zoom, css.lineHeight], prop)) {
				value += cssUnit;
			}
			// IE8 and below will error out for some reason "Error: Invalid argument."
			// use a try/catch to silence the error and it works fine..
			try {
				style[prop] = value;
			} catch (e) {}

		},

		getStyle: function (element, prop) {

			var value,
				filter;

			if (!support.opacity() && prop === css.opacity) {
				filter = tofu.getStyle(element, css.filter);
				value = (filter) ? parseFloat(filter.replace(regex.nump, '')) / 100 : null;
			} else {
				value = tofu.getComputedStyles(element)[prop];
			}

			return value === 'auto' ? null : value;
		},

		getComputedStyles: function (element) {

			var styles = {},
				computedStyles = defaultView ? defaultView.getComputedStyle(element, null) : element.currentStyle,
				stylesLength = computedStyles.length,
				addStyle = function (cssProperty) {


					var cssValue,
						cssType,
						parsedValue;

					// MSIE 8 and under do not support this method
					if (!tofu.isUndefined(computedStyles.getPropertyValue)) {
						cssValue = computedStyles.getPropertyValue(cssProperty);
					}

					// FOR MSIE 8 and under
					// note: opera will pass in camelized properties.. so any property with a hyphen will fall back on this
					if (!cssValue) {
						cssValue = computedStyles[cssProperty];
					}


					if (cssValue) {

						cssType = tofu.type(cssValue);

						// NORMALIZE THE CSS VALUE TYPECAST
						// if the value is a string but numeric or contains a css unit, parse as number
						// note: without the string type comparison, MSIE will crash because you can't index a number
						if ((tofu.isNumeric(cssValue) && cssType !== NUMBER_TYPE) || (cssType === STRING_TYPE && cssValue.indexOf(cssUnit) > 0)) {
							parsedValue = parseFloat(cssValue);
							// still not a number? this is because a value may contain a css unit but may not be simply a number
							// example: "outline: #000000 0px none"
							// keep as string
							if (!isNaN(parsedValue)) {
								cssValue = parsedValue;
							}
						}

						styles[tofu.camelize(cssProperty)] = cssValue;

					}

				};

			if (stylesLength) { // most browsers
				tofu.loop(stylesLength, function (i) {
					addStyle(computedStyles[i]);
				});
			} else { // opera
				tofu.loopObjectKeys(computedStyles, function (key) {
					if (tofu.hasProperty(computedStyles, key)) {
						addStyle(key);
					}
				});
			}

			return styles;

		},

		camelize: function (str) {
			return str.replace(regex.camel, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
		},

		stopBubble: function (event) {
			event = event || window.event;
			if (event.preventDefault) { // W3C
				event.preventDefault();
			} else { // MSIE
				event.returnValue = false;
			}
			if (event.stopPropagation) { // W3C
				event.stopPropagation();
			} else { // MSIE
				event.cancelBubble = true;
			}
		},

		removeChildren: function (element) {
			if (element) {
				// remove children because we check for events to kill
				while (element.hasChildNodes()) {
					tofu.removeElement(element.firstChild);
				}
			}
		},

		cleanElement: function (element) {

			var guid = tofu.getGUID(element);

			// remove any events given to this element
			tofu.removeAllEvents(element);

			// remove any children this element may have
			// we do this to manage event and element caches
			tofu.removeChildren(element);

			// remove our element from cache
			delete cacheElements[guid];

		},

		removeElement: function (element) {
			if (element) {
				tofu.cleanElement(element);
				// an element can exist without being in the dom tree // so check to make sure it has a parent
				if (element.parentNode) {
					// remove any children this element may have // we do this to manage event and element caches
					element.parentNode.removeChild(element);
				}
			}
		},

		replaceElement: function (elm1, elm2) {

			// NOTE: "elm1" gets replaced with "elm2"

			tofu.cleanElement(elm1);

			if (tofu.isString(elm2)) {
				elm2 = document.createTextNode(elm2);
			}

			// an element can exist without being in the dom tree // so check to make sure it has a parent
			if (elm1.parentNode) {
				elm1.parentNode.replaceChild(elm2, elm1);
			}

		},

		insertBefore: function (elm1, elm2) {
			// NOTE: "elm2" gets inserted before "elm1"
			elm1.parentNode.insertBefore(elm2, elm1);
			return elm2;
		},

		insertAfter: function (elm1, elm2) {
			// NOTE: "elm2" gets inserted after "elm1"
			if (tofu.isString(elm2)) {
				elm2 = document.createTextNode(elm2);
			}
			elm1.parentNode.insertBefore(elm2, tofu.getNextSibling(elm1));
			return elm2;
		},

		getNextSibling: function (element) {
			do {
				element = element.nextSibling;
			} while (element && element.nodeType !== 1);
			return element || undefined;
		},

		newElement: function (strType, objAttributes, textNode) {

			var newElm = document.createElement(strType),
				guid = tofu.getGUID(newElm); // create a guid for our new element

			// add our new element to our array of elements indexed by their guids
			cacheElements[guid] = newElm;

			// shift arguments if data argument was omited
			if (objAttributes && tofu.isString(objAttributes)) {
				textNode = textNode || objAttributes;
				objAttributes = {};
			}

			if (objAttributes && tofu.isObject(objAttributes)) {
				tofu.attribute(newElm, objAttributes);
			}

			if (textNode && tofu.isString(textNode)) {
				tofu.appendText(newElm, textNode);
			}

			return newElm;

		},

		domAppend: function (element, elmAppendTo, objAttributes, textNode) {

			var nt1, nt2;

			// shift arguments if data argument was omited
			if (objAttributes && tofu.isString(objAttributes)) {
				textNode = textNode || objAttributes;
				objAttributes = {};
			}

			if (tofu.isString(element)) {
				element = tofu.newElement(element, objAttributes, textNode);
			}

			nt1 = element.nodeType;
			nt2 = elmAppendTo.nodeType;

			// allow 1:ELEMENT_NODE or 11:DOCUMENT_FRAGMENT_NODE or 3:TEXT_NODE
			if ((nt1 === 1 || nt1 === 11 || nt1 === 3) && (nt2 === 1 || nt2 === 11 || nt2 === 3)) {
				elmAppendTo.appendChild(element);
			}

			return element;

		},

		domWrap: function (elmWrapper, elmInner, objAttributes, textNode) {

			// shift arguments if data argument was omited
			if (objAttributes && tofu.isString(objAttributes)) {
				textNode = textNode || objAttributes;
				objAttributes = {};
			}

			if (tofu.isString(elmWrapper)) {
				elmWrapper = tofu.newElement(elmWrapper, objAttributes, textNode);
			}

			if (tofu.isElement(elmWrapper) && tofu.isElement(elmInner)) {
				// insert our new wrapper before the element we want to wrap
				elmInner.parentNode.insertBefore(elmWrapper, elmInner);
				// insert a copy of our elements children into our new wrapper
				tofu.domAppend(elmInner, elmWrapper);
			}

			return elmWrapper;

		},

		isElementIn: function (element, compare) {
			while (element) {
				if (element === compare || element.nodeName.toLowerCase() === compare) {
					return true;
				}
				element = element.parentNode;
			}
			return false;
		},

		isElementEmpty: function (element) {
			//return !(element.children.length > 0);
			return element.children.length === 0;
		},

		parseHTML: function (jsonHtml, lang) {

			var documentFragment = document.createDocumentFragment(),
				buildElement;

			buildElement = function (objNodeData) {

				var oAttributes = {},
					elmNode;

				if (tofu.hasProperty(objNodeData, lang.id)) {
					oAttributes.id = objNodeData[lang.id];
				}

				if (tofu.hasProperty(objNodeData, lang.className)) {
					oAttributes['class'] = objNodeData[lang.className];
				}

				if (tofu.hasProperty(objNodeData, lang.attr)) {
					tofu.loopObject(objNodeData[lang.attr], function (key, val) {
						/*
						key = attribute name (string)
						val = attribute value (string)
						*/
						oAttributes[key] = val;
					});
				}

				// only create an element if a node name was defined, and if no parent is made then children are not possible
				if (tofu.hasProperty(objNodeData, lang.nodeName)) {
					elmNode = tofu.newElement(objNodeData[lang.nodeName], oAttributes);
					// if child nodes are available, recursively append them to the element we just made
					if (objNodeData[lang.childNodes] && objNodeData[lang.childNodes].length > 0) {
						tofu.loopArray(objNodeData[lang.childNodes], function (value) {
							tofu.domAppend(buildElement(value), elmNode);
						});
					}
				}

				if (objNodeData[lang.text] && objNodeData[lang.text].length > 0) {
					// if we just want a text node, dont create an element wrapper
					if (elmNode) {
						tofu.appendText(elmNode, objNodeData[lang.text]);
					} else {
						elmNode = document.createTextNode(objNodeData[lang.text]);
					}
				}



				return elmNode;

			};

			lang = lang || {
				nodeName: 'nodeName',
				childNodes: 'childNodes',
				className: 'className',
				id: 'id',
				attr: 'attr',
				text: 'text'
			};

			if (tofu.isArray(jsonHtml)) {
				tofu.loopArray(jsonHtml, function (value) {
					tofu.domAppend(buildElement(value), documentFragment);
				});
			} else if (tofu.isObject(jsonHtml)) {
				tofu.domAppend(buildElement(jsonHtml), documentFragment);
			}


			return documentFragment;

		},

		replaceHTML: function (element, html) {

			tofu.removeChildren(element);

			if (tofu.isString(html)) {
				/*
				// note: this function will take static html and extract elements
				var div = document.createElement(html.div);
				div.innerHTML = html;
				tofu.loop(div.childNodes.length, function (n) {
					element.appendChild(div.childNodes[n]);
				});
				*/
				tofu.appendText(element, html);
			} else {
				element.appendChild(tofu.parseHTML(html));
			}

		},

		appendText: function (element, string) {
			if (string.length > 0) {
				return element.appendChild(document.createTextNode(string));
			}
		},

		textContentRecursive: function (element, string) {

			// note: this function simply runs down an elements node tree and looks for the last element (before the textnode if one exists)
			// sidenote: this function is a little awkward (too specific) to be in the core but I will allow it ;-)

			while (element) {

				// if the child node is not an element node, assume it is a text node and break the loop
				if (!element.firstChild || !tofu.isElement(element.firstChild)) {

					if (string) { // set
						return tofu.textContent(element, string);
					} else { // get
						return tofu.textContent(element);
					}
				}

				element = element.firstChild;
			}

		},

		textContent: function (element, string) {

			var i, j, child;

			for (i = 0, j = element.childNodes.length; i < j; i++) {
				child = element.childNodes[i];
				if (child.nodeType === 3) { // text node
					if (string) {
						child.nodeValue = string;
					}
					return child.nodeValue;
				}
			}

			// if nothing was return at this point, a text node was not found, so make one
			return (string) ? tofu.appendText(element, string).nodeValue : undefined;

		},

		show: function (element) {
			element.style[css.display] = 'block';
		},

		hide: function (element) {
			element.style[css.display] = 'none';
		},

		isVisible: function (element) {
			var computedStyles = tofu.getComputedStyles(element);
			if (computedStyles[css.visibility] === 'hidden' || computedStyles[css.display] === 'none') {
				return false;
			}
			return true;
		},

		// MODIFIED VERSION OF:
		// written by Dean Edwards, 2005
		// with input from Tino Zijdel, Matthias Miller, Diego Perini
		// http://dean.edwards.name/weblog/2005/10/add-event2/
		handleEvent: function (event) {

			// NOTE: this function is for IE8 and below

			// grab the event object (IE uses a global event object)
			event = event || window.event;
			tofu.stopBubble(event);

			var element = this,
				returnValue = true,
				handlers = element.events[event.type]; // get a reference to the hash table of event handlers

			// execute each event handler
			tofu.loopObjectKeys(handlers, function (key) {
				// key = handler guid;
				element.handleEvent = handlers[key];
				if (element.handleEvent(event) === false) {
					returnValue = false;
				}
			});

			return returnValue;
		},

		hasEvent: function (element, eventType) {
			var guid = tofu.getGUID(element);
			// check for guid before event type to avoid IE crashes
			return !!(cacheEvents[guid] && cacheEvents[guid][eventType]);
		},

		addEvent: function (element, eventType, handler) {

			// handle elements that may not have a guid
			var guid = tofu.getGUID(element),
				handlers;


			// we do not support event chains 
			// if on the odd chance an event request already exists then replace the old one
			if (tofu.hasEvent(element, eventType)) {
				tofu.removeEvent(element, eventType);
			}

			// we store events by element id and then by event type // if our element id is not found then create one so we can start adding event types
			if (!cacheEvents[guid]) {
				cacheEvents[guid] = {};
			}

			// insert a new event type into our cache
			cacheEvents[guid][eventType] = {
				'element': element,
				'handler': handler
			};

			if (element.addEventListener) { //W3C

				element.addEventListener(eventType, handler, false);

			} else { //IE

				// assign each event handler a unique ID
				if (!handler.guid) {
					handler.guid = tofu.randomID(12);
				}
				// create a hash table of event types for the element
				if (!element.events) {
					element.events = {};
				}
				// create a hash table of event handlers for each element/event pair
				handlers = element.events[eventType];

				if (!handlers) {
					handlers = element.events[eventType] = {};
					// store the existing event handler (if there is one)
					if (element[ieEventPrefix + eventType]) {
						handlers[0] = element[ieEventPrefix + eventType];
					}
				}

				// store the event handler in the hash table
				handlers[handler.guid] = handler;
				// assign a global event handler to do all the work
				element[ieEventPrefix + eventType] = tofu.handleEvent;
			}

		},

		removeEvent: function (element, eventType) {

			// handle elements that may not have a guid
			var guid = tofu.getGUID(element),
				handler;

			// check to see if the event exists
			if (tofu.hasEvent(element, eventType)) {

				// get the handler from our cache
				handler = cacheEvents[guid][eventType].handler;

				// delete the event reference from the element
				delete cacheEvents[guid][eventType];

				// if our object has no more events attached then remove from cache altogether
				if (tofu.isObjectEmpty(cacheEvents[guid])) {
					delete cacheEvents[guid];
				}

				if (element.removeEventListener) {
					element.removeEventListener(eventType, handler, false);
				} else {
					// delete the event handler from the hash table
					if (element.events && element.events[eventType]) {
						delete element.events[eventType][handler.guid];
					}
				}

			}
		},

		removeAllEvents: function (element) {
			// handle elements that may not have a guid
			var guid = tofu.getGUID(element);
			if (cacheEvents[guid]) {
				tofu.loopObjectKeys(cacheEvents[guid], function (key) {
					// key = event type string
					tofu.removeEvent(element, key);
				});
			}
		},

		replaceEvent: function (element, eventType, handler) {
			tofu.removeEvent(element, eventType);
			tofu.addEvent(element, eventType, handler);
		},

		fireEvent: function (element, eventType) {
			var evt;
			// check to see if the event exists
			if (tofu.hasEvent(element, eventType)) {
				if (document.createEvent) { // W3C
					evt = document.createEvent('HTMLEvents');
					evt.initEvent(eventType, true, true);
					element.dispatchEvent(evt);
				} else { // IE
					evt = document.createEventObject();
					evt.eventType = ieEventPrefix + eventType;
					element.fireEvent(evt.eventType, evt);
				}
			}
		},

		click: function (element, callback, singlerun) {

			singlerun = singlerun || false;

			tofu.addEvent(element, events.click, function (evt) {

				// STOP LINK DEFAULT ACTION
				tofu.stopBubble(evt);
				if (singlerun) {
					tofu.removeEvent(element, events.click);
				}
				if (callback) {
					callback.call(element, evt);
				}
				return false;

			});

		},

		jsonpGarbageCollect: function (scriptId) {
			tofu.removeElement(document.getElementById(scriptId));
			clearTimeout(jsonpTimeout[scriptId]);
			delete jsonpTimeout[scriptId];
			delete jsonpHandler[scriptId];
		},

		// This function was inspired by Jason Levitt's JSON script request class
		// http: //www.xml.com/pub/a/2005/12/21/json-dynamic-script-tag.html
		loadJSONP: function (srcURL, params, callback, nTimeout) {

			// note: params must be object

			var scriptId = 'JSONP_' + tofu.randomID(12),
				urlRemote,
				strParams = '',
				startTime = new Date().getTime();

			if (params) {
				// shift arguments if data argument was omited
				if (tofu.isFunction(params)) {
					callback = params;
					params = '';
				// if parameters are provided in the form of an object then convert them into a string
				} else if (tofu.isObject(params)) {
					strParams = tofu.getParamsFromObject(params);
					strParams = (strParams) ? '&' + strParams : '';
				}
			}

			urlRemote = srcURL + '?jsid=' + scriptId + strParams;

			nTimeout = nTimeout || 30000;

			if (nTimeout > 0) {
				jsonpTimeout[scriptId] = setTimeout(function () {
					if (callback) {
						callback(null, nTimeout);
					}
					tofu.jsonpGarbageCollect(scriptId);
				}, nTimeout);
			}

			jsonpHandler[scriptId] = function (data) {
				var duration = new Date().getTime() - startTime;
				if (callback) {
					callback(data, duration);
				}
				tofu.jsonpGarbageCollect(scriptId);
			};

			// Build the script tag
			tofu.domAppend(html.script, document.getElementsByTagName(html.head).item(0), {
				id: scriptId,
				src: urlRemote,
				type: MIME_JSTXT
			});

		},

		stopAnimation: function (element) {
			if (element.animationMemory) {
				clearInterval(element.animationMemory);
				//delete element.animationMemory;
			}
		},

		// Animation script was inspired from:
		// http: //cross-browser.com/x/examples/animation_tech.php
		animate: function (element, sCssProp, nTarget, uTotalTime, callback) {

			// note: in an effort to remove as much fluff as possible sCssProp must be camelcase so that we dont have to calculate it each iteration

			var props = [],
				freq,
				startTime = new Date().getTime(),
				logProps = function (cssProp, cssValue) {
					var o = {};
					o.cssProp = cssProp; // the css property that needs animating
					o.startValue = tofu.getStyle(element, o.cssProp) || 0; // our animation starting points
					o.endValue = cssValue; // our animation target values
					o.displacement = o.endValue - o.startValue; // our animation displacement values
					// only numbers are animatable
					if (!isNaN(o.startValue) && !isNaN(o.endValue) && !isNaN(o.displacement)) {
						props.push(o);
					}
				};

			if (tofu.isObject(sCssProp)) {
				// an object was passed in so shift some arguments
				callback = uTotalTime;
				uTotalTime = nTarget;
				nTarget = null;
				tofu.loopObject(sCssProp, function (key, val) {
					logProps(key, val);
				});
			} else {
				logProps(sCssProp, nTarget);
			}

			// whoops.. looks like something went wront.. get us out of here
			if (props.length === 0) { return; }

			freq = Math.PI / (2 * uTotalTime); // frequency

			if (element.animationMemory) {
				tofu.stopAnimation(element); // stop any previous animations
			}

			element.animationMemory = setInterval(function () {

				var elapsedTime = new Date().getTime() - startTime,
					f = Math.abs(Math.sin(elapsedTime * freq));

				if (elapsedTime < uTotalTime) {
					tofu.loopArray(props, function (value) {
						tofu.setStyle(element, value.cssProp, (f * value.displacement + value.startValue));
					});
				} else {
					tofu.stopAnimation(element);
					tofu.loopArray(props, function (value) {
						tofu.setStyle(element, value.cssProp, value.endValue);
					});
					// we are done
					if (callback) { callback.call(element); }
				}

			}, 10);

		},

		setAlpha: function (element, n) {
			if (support.opacity()) {
				element.style[css.opacity] = n;
			} else {
				element.style[css.filter] = 'alpha(opacity = ' + String(n * 100) + ') ';
			}
		},

		fadeTo: function (element, alpha, speed, callback) {
			tofu.animate(element, css.opacity, alpha, speed, callback);
		},

		fadeIn: function (element, speed, callback) {
			tofu.fadeTo(element, 1, speed, callback);
		},

		fadeOut: function (element, speed, callback) {
			tofu.fadeTo(element, 0, speed, callback);
		},

		stripSpaces: function (s) {
			return s.replace(regex.ss, '');
		},

		inArray: function (array, object) {
			var result = false;
			tofu.loopArray(array, function (value) {
				if (value === object) {
					result = true;
					return null; // break loop
				}
			});
			return result;
		},

		arrayUnique: function (array) {
			var r = [];
			tofu.loopArray(array, function (value) {
				if (!tofu.inArray(r, value)) {
					r[r.length] = value;
				}
			});
			return r;
		},

		removeArrayItem: function (array, itemToRemove) {
			tofu.loopArray(array, function (index, value) {
				if (value === itemToRemove) {
					array.splice(index, 1);
				}
			});
			return array;
		},


		// CREDIT: http://phpjs.org/functions/parse_url
		parseUrl: function (str) {
			var key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
				q = 'queryKey',
				m = regex.purl.exec(str),
				uri = {},
				i = 14;
			while (i--) {
				uri[key[i]] = m[i] || '';
			}
			uri[q] = {};
			uri[key[12]].replace(regex.query, function ($0, $1, $2) {
				if ($1) { uri[q][$1] = $2; }
			});
			return uri;
		},

		getFileExtension: function (url) {
			var file = (url) ? tofu.parseUrl(url).file : null,
				ext = (file) ? regex.fext.exec(file).pop() : null; // use pop to get last array item in case there are multiple extentions in the url (we only care about the last)
			return (ext) ? ext.toLowerCase() : null;
		},

		/*
		@param {integer} nIntervalTime How many milliseconds between intervals.
		@param {integer} nMaxIntervalCount How many intervals can run before termination.
		@param {function} fnCondition A check method to resolve the loop (return true to break loop).
		@param {function} fnSuccess If the condition was met then call this function.
		@param {function} fnFailure Optional function that will get called if the condition was NOT met and the max interval amount was reached.
		*/
		runInterval: function (nIntervalTime, nMaxIntervalCount, fnCondition, fnSuccess, fnFailure) {

			var interval,
				count = 0;


			if (fnCondition.call() === true) {
				fnSuccess.call();
			} else {
				interval = window.setInterval(function () {
					if (fnCondition.call() === true) {
						clearInterval(interval);
						fnSuccess.call();
					} else {
						count++;
						if (count >= nMaxIntervalCount) {
							window.clearInterval(interval);
							if (fnFailure) {
								fnFailure.call();
							}
						}
					}
				}, nIntervalTime);
			}


		},

		stringFormat: function (str, arr) {
			var formatted = str;
			tofu.loopArray(arr, function (index, value) {
				var regexp = new RegExp('\\{' + index + '\\}', 'gi');
				formatted = formatted.replace(regexp, value);
			});
			return formatted;
		}

	};

	// Expose Tofu to the global object
	window.tofu = window.$ = tofu;

}(window));