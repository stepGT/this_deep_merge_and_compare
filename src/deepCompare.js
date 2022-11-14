const { isArray, isObject } = require('./helpers');
//
module.exports = function deepCompare(obj1, obj2) {
  if (obj1 === obj2) return true;
  //
  if ((!isObject(obj1) && !isArray(obj1)) || (!isObject(obj2) && !isArray(obj2))) {
    return false;
  }
};
