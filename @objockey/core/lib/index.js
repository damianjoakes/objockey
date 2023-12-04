"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjockeyObject = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.weak-map.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/**
 * @objockey/core
 * written by Damian Oakes
 * 
 * The PureJS core library for Objockey, a library centered around providing a 
 * fetaure-rich toolset for reading and manipulating JSON data, designed to
 * fit to any situation.
 */

class ObjockeyError extends Error {
  constructor(message) {
    super(message);
    this.name = "ObjockeyError";
  }
}
var _print_output_using = /*#__PURE__*/new WeakMap();
var _internal = /*#__PURE__*/new WeakMap();
class ObjockeyObject {
  constructor(source) {
    _classPrivateFieldInitSpec(this, _print_output_using, {
      writable: true,
      value: console.log
    });
    _classPrivateFieldInitSpec(this, _internal, {
      writable: true,
      value: void 0
    });
    // Keep data as-is if it is already an array or an object.
    if (Array.isArray(source) || source instanceof Object) {
      return;
    }

    // Leave data blank in case of initializing object without data.
    if (source === "") {
      return;
    }
    try {
      _classPrivateFieldSet(this, _internal, JSON.parse(source));
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw err;
      }
    }
  }

  // GENERIC JSON ARRAY/OBJECT METHODS

  /**
   * Locates an index using a callback function. Returns -1 if index is not
   * found.
   * 
   * @param {function} callback 
   *  `callback(key, i | value, buffer)`
   * 
   *  `key` - If the internal buffer is an array, this is the value of the 
   * current position in the array. If the internal buffer is an object, this
   * is the key of the current object property.
   * 
   *  `i | value` - If the internal buffer is an array, this is the current position 
   * of the loop. If the internal buffer is an object, this is the value of
   * the current object property. 
   * 
   *  `buffer` - Internal buffer of the `Objockey` object
   * 
   * @returns If the internal buffer is an array, returns the first index at 
   * which the callback function was fulfilled. If the internal
   * buffer is an object, returns the first key instead. 
   */
  findIndex(callback) {
    let i = 0;
    if (Array.isArray(_classPrivateFieldGet(this, _internal))) {
      for (let val of _classPrivateFieldGet(this, _internal)) {
        if (callback(val, i, _classPrivateFieldGet(this, _internal))) {
          return i;
        }
        i++;
      }
    } else if (typeof _classPrivateFieldGet(this, _internal) === "object" && _classPrivateFieldGet(this, _internal) !== null) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        if (callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal))) {
          return key;
        }
      }
    }
    return -1;
  }

  /**
   * 
   * @param {function} callback 
   *  `callback(key, i | value, buffer)`
   * 
   *  `key` - If the internal buffer is an array, this is the value of the 
   * current position in the array. If the internal buffer is an object, this
   * is the key of the current object property.
   * 
   *  `i | value` - If the internal buffer is an array, this is the current position 
   * of the loop. If the internal buffer is an object, this is the value of
   * the current object property. 
   * 
   *  `buffer` - Internal buffer of the `Objockey` object
   * 
   * @returns Array of indexes or keys of the found elements, or null if no 
   * elements are found.
   */
  findAllIndexes(callback) {
    let indexes = [];
    let i = 0;
    if (Array.isArray(_classPrivateFieldGet(this, _internal))) {
      for (let val of _classPrivateFieldGet(this, _internal)) {
        if (callback(val, i, _classPrivateFieldGet(this, _internal))) {
          indexes.push(i);
        }
        i++;
      }
    } else if (typeof _classPrivateFieldGet(this, _internal) === "object") {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        if (callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal))) {
          indexes.push(key);
        }
      }
    }
    return indexes.length > 0 ? indexes : null;
  }

  /**
   * Sorts through the internal buffer using an array of boolean-returning
   * callback functions. Each callback will fill an array full of values, 
   * which will be added to the return array in the order each callback 
   * function was called.
   * 
   * @param {array} callbacks Array of boolean returning sorting functions
   * 
   *  `callback(key, value | i, buffer)`
   * 
   *  `key` - If the internal buffer is an array, this is the value of the 
   * current position in the array. If the internal buffer is an object, this
   * is the key of the current object property.
   * 
   *  `value | i` - If the internal buffer is an array, this is the current position 
   * of the loop. If the internal buffer is an object, this is the value of
   * the current object property.
   * 
   *  `buffer` - Internal buffer of the `Objockey` object.
   * 
   * @returns Two dimensional array, with each array either consisting of 
   * object keys, array indexes, or null if the search term was not satisfied.
   */
  findIndexes2D(callbacks) {
    let indexes = [];
    if (!Array.isArray(callbacks)) {
      throw new ObjockeyError("\"callbacks\" must be an array of functions.");
    }
    for (let callback of callbacks) {
      if (typeof callback !== "function") {
        throw new ObjockeyError("\"callbacks\" must be an array of functions.");
      }
      let set = [];
      if (this.isArray()) {
        let i = 0;
        for (let val of _classPrivateFieldGet(this, _internal)) {
          if (callback(val, i, _classPrivateFieldGet(this, _internal))) {
            set.push(i);
          }
          i++;
        }
        indexes.push(set.length > 0 ? set : null);
      } else if (typeof _classPrivateFieldGet(this, _internal) === "object") {
        for (let key in _classPrivateFieldGet(this, _internal)) {
          if (callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal))) {
            set.push(key);
          }
        }
      }
    }
    return indexes;
  }

  // // ARITHMETIC // // 

  /**
   * Calculates the average of all relevant data in the internal buffer using
   * a value-returning callback function.
   * 
   * @param {function} callback 
   * @returns 
   */
  average(callback) {
    let calculation = 0;
    let count = 0;
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        let addition = callback(val, i, _classPrivateFieldGet(this, _internal));
        if (typeof addition === "number" || typeof addition === "bigint") {
          calculation += addition;
          count++;
        }
        i++;
      }
    } else if (this.isObject()) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        let addition = callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal));
        if (typeof addition === "number" || typeof addition === "bigint") {
          calculation += addition;
          count++;
        }
      }
    }
    return average / count;
  }

  /**
   * Finds the median data in the internal buffer using a value-returning
   * callback function.
   * 
   * @param {function} callback 
   * @returns {integer}
   */
  median(callback) {
    let matched = [];
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        let num = callback(val, i, _classPrivateFieldGet(this, _internal));
        if (typeof num === "number" || typeof num === "bigint") {
          matched.push(num);
        }
        i++;
      }
    }
    if (this.isObject()) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        let num = callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal));
        if (typeof num === "number" || typeof num === "bigint") {
          matched.push(num);
        }
      }
    }
    matched = matched.sort((a, b) => a - b);
    if (matched.length % 2 === 0) {
      return [matched[matched.length / 2], matched[matched.length / 2 + 1]];
    } else {
      return [matched[matched.length / 2]];
    }
  }

  // // FILTERING // //

  /**
   * Filters the internal buffer using a boolean-returning callback function.
   * 
   * @param {function} callback 
   * 
   * @returns New set of JSON data, does not modify the current internal buffer.
   * Chain with `.set()` to set the internal buffer to the return value of 
   * `.filter()`.
   */
  filter(callback) {
    let filtered = this.isArray() ? [] : {};
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        if (callback(val, i, _classPrivateFieldGet(this, _internal))) {
          filtered.push(val);
        }
        i++;
      }
    } else if (this.isObject()) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        if (callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal))) {
          filtered = _objectSpread(_objectSpread({}, filtered), {}, {
            [key]: _classPrivateFieldGet(this, _internal)[key]
          });
        }
      }
    }
    return filtered;
  }

  // // DATA MANIPULATION // // 

  /**
   * Iterates over the internal buffer, taking a value returning function as
   * an argument. The return value of the callback function can be any type of
   * data as an array, but as an object *must* be an object of `{ key: value }`.
   * The contents of the new object will be concatenated to the internal 
   * buffer. If the callback function does not return a value, then the new 
   * buffer returned will be condensed, with all undefined values being
   * removed. If the callback function explicitly returns undefined, then the
   * value will also be removed from the returned buffer.
   * 
   * @param {function(any, integer | any, array | object)} callback 
   * If the internal buffer is an array,
   * `callback(value, index, internalBuffer)`.
   * 
   * If the internal buffer is an object,
   * `callback(key, value, internalBuffer)`.
   * 
   * @returns {array | object} A new buffer without undefined values.
   */
  condenseMap(callback) {
    let newData = this.isArray() ? [] : {};
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        const data = callback(val, i, _classPrivateFieldGet(this, _internal));
        if (data !== undefined) {
          newData.push(data);
        }
        i++;
      }
    } else if (this.isObject()) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        const data = callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal));
        if (data !== undefined) {
          try {
            JSON.parse(data);
          } catch (err) {
            throw err;
          }
          if (!Array.isArray(data)) {
            newData = _objectSpread(_objectSpread({}, newData), data);
          } else {
            throw new ObjockeyError("Cannot map a value of type \n                        ".concat(typeof data, " to an internal buffer of type object."));
          }
        }
      }
    }
    return newData;
  }

  /**
   * Iterates through the internal buffer, takes a callback function to use 
   * for each loop iteration.
   * 
   * @param {function} callback
   * `callback(value, index, buffer)`
   * 
   * `value` The value of the current index in the buffer.
   * 
   * `index` Either the numeral index of, or the key of the current element
   * in the buffer.
   * 
   * `buffer` The buffer on which `forEach()` was called upon. 
   */
  forEach(callback) {
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        callback(val, i, _classPrivateFieldGet(this, _internal));
        i++;
      }
    } else if (this.isObject()) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal));
      }
    }
  }

  /**
   * Iterates over the internal buffer, taking a value returning function as
   * an argument. The return value of the callback function can be any type of
   * data as an array, but as an object *must* be an object of `{ key: value }`.
   * The contents of the new object will be concatenated to the internal 
   * buffer. If the callback function does not return a value, then if the
   * internal buffer is an array, it returns undefined; and if the internal
   * buffer is an object, then it returns an object with the contents 
   * `{ [key] : null }`. Use `.condenseMap()` for a mapping function that does not
   * utilize the standard Javascript `undefined` mapping behavior. 
   * 
   * @param {function} callback
   * If the internal buffer is an array,
   * `callback(value, index, internalBuffer)`.
   * 
   * If the internal buffer is an object,
   * `callback(key, value, internalBuffer)`.
   * 
   * @returns {array | object} A new buffer.
   */
  map(callback) {
    let newData = this.isArray() ? [] : {};
    if (this.isArray()) {
      let i = 0;
      for (let val of _classPrivateFieldGet(this, _internal)) {
        newData.push(callback(val, i, newData) || undefined);
        i++;
      }
    } else if (this.isObject) {
      for (let key in _classPrivateFieldGet(this, _internal)) {
        let data = callback(key, _classPrivateFieldGet(this, _internal)[key], _classPrivateFieldGet(this, _internal)) || {
          [key]: null
        };
        newData = _objectSpread(_objectSpread({}, newData), data);
      }
    }
    return newData;
  }

  /**
   * Pushes a set of data to the internal buffer. If the internal 
   * buffer is an object, this will extract all object key/value pairs 
   * and write them to the internal buffer. If the internal buffer
   * is an array, it directly pushes the value of `buffer` to the array. 
   * Use `.concat()` to push the contents of the value of `buffer` to the 
   * internal buffer. 
   * 
   * *Throws an error if the internal buffer is an object, but the value of the
   * `buffer` argument is not.*
   * 
   * @param {*} buffer New data to be pushed to the internal buffer
   * @returns {this}
   */
  push(buffer) {
    if (Array.isArray(buffer) && this.isArray()) {
      _classPrivateFieldSet(this, _internal, [..._classPrivateFieldGet(this, _internal), ...buffer]);
    } else if (buffer && typeof buffer === "object" && typeof _classPrivateFieldGet(this, _internal) === "object") {
      _classPrivateFieldSet(this, _internal, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _internal)), buffer));
    } else if (this.isArray()) {
      try {
        _classPrivateFieldGet(this, _internal).push(buffer);
      } catch (err) {
        throw err;
      }
    } else {
      if (buffer && typeof buffer !== typeof _classPrivateFieldGet(this, _internal)) {
        throw new ObjockeyError("Cannot push data of type ".concat(typeof buffer, "\n                to an internal buffer of type ").concat(typeof _classPrivateFieldGet(this, _internal)));
      }
    }
    return this;
  }

  /**
   * Replaces the value at a specific index of the internal buffer.
   * 
   * @param {*} key Either the index of the value to be replaced, or the key 
   * of the object whose value will be replaced.
   * @param {*} callback Either a new value to replace the indexed value with,
   * or a callback function which takes the current indexed value as an 
   * argument, and returns a value to replace the currently indexed value 
   * with.
   */
  replace(key, callback) {
    _classPrivateFieldGet(this, _internal)[key] = callback(_classPrivateFieldGet(this, _internal)[key]);
  }

  /**
   * Overwrites the internal buffer with whatever the value of the
   * `buffer` argument is.
   * 
   * @param {string | object | array} buffer New value to set the value of the
   * internal buffer to.
   * @returns 
   */
  set(buffer) {
    if (typeof buffer === "string") {
      try {
        const newInternal = JSON.parse(buffer);
        _classPrivateFieldSet(this, _internal, newInternal);
      } catch (err) {
        throw err;
      }
    } else if ((Array.isArray(buffer) || typeof buffer === "object") && buffer !== null) {
      _classPrivateFieldSet(this, _internal, buffer);
    } else {
      throw new ObjockeyError("\"buffer\" must be of type string, object, or array.");
    }
    return this;
  }

  /**
   * @returns {string} The internal buffer as a string.
   */
  string() {
    return JSON.stringify(_classPrivateFieldGet(this, _internal));
  }

  // GENERIC PRINTING FUNCTIONS

  /**
   * Prints the internal buffer. Optionally an index or key of the internal
   * buffer.
   * 
   * @param {integer | string} index Optional paramater specifying index of the
   * value to print.
   */
  print(index) {
    if (index) {
      _classPrivateFieldGet(this, _print_output_using).call(this, _classPrivateFieldGet(this, _internal)[index]);
    } else _classPrivateFieldGet(this, _print_output_using).call(this, _classPrivateFieldGet(this, _internal));
    return this;
  }

  /**
   * Changes the printing function the object uses. Default is console.log(),
   * but this can be changed. If no new function is specified, this gets set
   * back to its default value.
   * 
   * @param {function} newFunction New function to use for printing objects.
   */
  setPrint(newFunction) {
    _classPrivateFieldSet(this, _print_output_using, newFunction || console.log);
    return this;
  }

  // INTERNAL LOGIC METHODS

  /**
   * Returns a boolean value stating whether or not the internal buffer is 
   * an array. 
   * 
   * @returns {boolean}
   */
  isArray() {
    if (Array.isArray(_classPrivateFieldGet(this, _internal))) {
      return true;
    }
    return false;
  }

  /**
   * Returns a boolean value stating whether or not the internal buffer is
   * an object.
   * 
   * @returns {boolean}
   */
  isObject() {
    if (typeof _classPrivateFieldGet(this, _internal) === "object" && _classPrivateFieldGet(this, _internal) !== null) {
      return true;
    }
    return false;
  }

  // JAVASCRIPT GENERIC OVERRIDES

  /**
   * Overrides the normal `class` `valueOf()` method, when the Objockey class
   * is called as part of arithmetic, it will instead use whatever the 
   * internal buffer is set to.
   * 
   * @returns The internal buffer.
   */
  valueOf() {
    return _classPrivateFieldGet(this, _internal);
  }

  /**
   * Overrides the normal `class` `toString()` method. When the Objockey class
   * is called with string arithmetic, it will instead use the stringified 
   * data of the internal buffer.
   * 
   * @returns The stringified data of the internal buffer.
   */
  toString() {
    return JSON.stringify(_classPrivateFieldGet(this, _internal));
  }
}
exports.ObjockeyObject = ObjockeyObject;