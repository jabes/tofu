![](banner.webp)

# Tofu.js

Originally developed in 2010 for use in [Pinup](https://github.com/jabes/pinup), a graphical tool for tagging content within images on the web.
This is a tiny JavaScript library that focuses on element manipulation including events, animations, and html parsing.

[View Demo](https://jabes.github.io/tofu/)

### Documentation

| Method                 | Description                                                                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| addClass               | Add one class to a provided element object.                                                                                                  |
| addEvent               | Add one event listener to a provided element object that invokes a callback function.                                                        |
| animate                | Animate one or more CSS properties for a provided element object.                                                                            |
| appendText             | Insert a text node at the end of a provided element object.                                                                                  |
| arrayUnique            | Returns a new array of unique values from a provided array.                                                                                  |
| attribute              | Depending on the parameters provided, this method will add, remove, or get attribute values for a provided element object.                   |
| camelize               | Convert a provided string into camel case.                                                                                                   |
| cleanElement           | Removes all event listeners, child nodes, and cache entries for a provided element object.                                                   |
| click                  | Binds a click event onto a provided element object.                                                                                          |
| cloneObject            | Returns an exact duplicate of a provided object that has no reference to its former self.                                                    |
| domAppend              | Insert an element object at the end of a provided element object.                                                                            |
| domWrap                | Wrap an element object with a provided element object.                                                                                       |
| fadeIn                 | Animate the opacity of an element object over a set time until it becomes opaque.                                                            |
| fadeOut                | Animate the opacity of an element object over a set time until it becomes transparent.                                                       |
| fadeTo                 | Animate the opacity of an element object over a set time until it becomes the desired opacity.                                               |
| fireEvent              | Trigger an event listener for a provided element object.                                                                                     |
| getComputedStyles      | Returns a normalized array of computed CSS styles for the provided element object.                                                           |
| getCumulativeOffset    | Returns the offset from the outer most parent for a provided element object.                                                                 |
| getElementsByClassName | Returns one or more matching element nodes from within the provided element node (or document body if none is provided).                     |
| getEventTarget         | Retrieves the associated element object from a provided event object.                                                                        |
| getFileExtension       | Returns the file extension from a provided URL string.                                                                                       |
| getGUID                | Returns the GUID given to element objects by the library, or assigns one if none is found.                                                   |
| getHeight              | Returns the height of a provided element object.                                                                                             |
| getMousePosition       | Returns the current coordinates of the cursor.                                                                                               |
| getNextSibling         | Returns the element object following the provided element object, or undefined if none was found.                                            |
| getParamsFromObject    | Returns a URL encoded string of parameters derived from a provided object.                                                                   |
| getParentByClassName   | Recursively looks for parent elements matching a provided class name. Returns the element object, or undefined if none were found.           |
| getStyle               | Returns the requested computed style value of a provided element object.                                                                     |
| getWidth               | Returns the width of a provided element object.                                                                                              |
| hasClass               | Determines if a provided element object contains a specified class name.                                                                     |
| hasEvent               | Determines if a provided element object has a specified event listener.                                                                      |
| hasProperty            | Cross browser implementation of object.hasOwnProperty.                                                                                       |
| hide                   | Renders a provided element object hidden (display none).                                                                                     |
| inArray                | Determines if a provided object is in an array.                                                                                              |
| insertAfter            | Insert an element object directly after a provided element object.                                                                           |
| insertBefore           | Insert an element object directly before a provided element object.                                                                          |
| isArray                | Determines if a provided object is an array type.                                                                                            |
| isBoolean              | Determines if a provided object is boolean type.                                                                                             |
| isDate                 | Determines if a provided object is a date type.                                                                                              |
| isElement              | Determines if a provided object is an element type.                                                                                          |
| isElementEmpty         | Determines if a provided element object has no child nodes.                                                                                  |
| isElementIn            | Determines if a provided element object is inside another provided element object.                                                           |
| isFunction             | Determines if a provided object is a function type.                                                                                          |
| isNull                 | Determines if a provided object is null.                                                                                                     |
| isNumber               | Determines if a provided object is a number type.                                                                                            |
| isNumeric              | Determines if a provided object is numerical.                                                                                                |
| isObject               | Determines if a provided object is an object type.                                                                                           |
| isObjectEmpty          | Determines if a provided object is empty.                                                                                                    |
| isString               | Determines if a provided object is a string type.                                                                                            |
| isUndefined            | Determines if a provided object is undefined.                                                                                                |
| isVisible              | Determines if a provided element object has been hidden using CSS (display/visibility).                                                      |
| loadJSONP              | Retrieves content using the JSONP method.                                                                                                    |
| loadScript             | Loads external JavaScript files from within the same origin.                                                                                 |
| loop                   | Performs a while loop using the given parameters.                                                                                            |
| loopArray              | Iterates over a provided array object and returns the index/value pairs.                                                                     |
| loopObject             | Iterates over a provided object and returns the property/value pairs.                                                                        |
| loopObjectKeys         | Iterates over a provided object and returns the property names.                                                                              |
| mergeObject            | Combines two provided objects and returns the result.                                                                                        |
| newElement             | Creates and returns a new element object.                                                                                                    |
| noConflict             | Informs the library not to bind with the dollar sign function to avoid conflicts with other libraries.                                       |
| onDomReady             | Runs a callback function when the Document Object Model is ready for use.                                                                    |
| parseHTML              | Uses provided JSON data to build a document fragment.                                                                                        |
| parseUrl               | Analyzes a provided URL string and returns information about its structure.                                                                  |
| randomID               | Creates a randomly generated string.                                                                                                         |
| removeAllEvents        | Removes all event listeners from a provided element object.                                                                                  |
| removeArrayItem        | Removes all occurrences of an item within a provided array object.                                                                           |
| removeChildren         | Removes all child nodes from a provided element object.                                                                                      |
| removeClass            | Removes the specified class name from a provided element object.                                                                             |
| removeElement          | Removes a provided element object from the DOM.                                                                                              |
| removeEvent            | Removes a single event listener from a provided element object.                                                                              |
| replaceElement         | Replace a provided element object with a provided element object.                                                                            |
| replaceEvent           | Replace a specified event listener with another listener of the same event type.                                                             |
| replaceHTML            | Replace HTML within a provided element object using either an HTML string or a JSON representation (see parseHTML).                          |
| rloop                  | Performs a reverse while loop using the given parameters.                                                                                    |
| runInterval            | Performs a conditional check over intervals of time.                                                                                         |
| setAlpha               | Change the opacity of a provided element object.                                                                                             |
| setHeight              | Change the height value of a provided element object.                                                                                        |
| setStyle               | Change a single computed style of the provided element object.                                                                               |
| setStyles              | Change multiple computed styles of the provided element object.                                                                              |
| setWidth               | Change the width value of a provided element object.                                                                                         |
| show                   | Renders a provided element object visible (display block).                                                                                   |
| stopAnimation          | Force a running animation to stop.                                                                                                           |
| stopBubble             | Stops event propagation and prevents default actions of a provided event object.                                                             |
| stringFormat           | Inserts array values into a provided string as specified.                                                                                    |
| stripSpaces            | Removes all spaces within a provided string.                                                                                                 |
| textContent            | Retrieve or insert a text node from within a provided element object. Returns undefined if no string is provided and no text node was found. |
| type                   | Returns a normalized type value of the provided object.                                                                                      |
