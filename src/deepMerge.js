const { isArray, isObject, isSameType } = require('./helpers');

module.exports = function deepMerge(obj1, obj2) {
  if ((!isObject(obj1) && !isArray(obj1)) || !isSameType(obj1, obj2)) {
    if (isArray(obj2)) {
      return deepCopyArray(obj2);
    }
    if (isObject(obj2)) {
      return deepCopyObject(obj2);
    }
    return obj2;
  }
};

function deepCopyArray(arr) {
  const result = [...arr];
  //
  for (let i = 0; i < result.length; i++) {
    if (isArray(result[i])) {
      result[i] = deepCopyArray(result[i]);
      continue;
    }
    if (isObject(result[i])) {
      result[i] = deepCopyObject(result[i]);
      continue;
    }
  }
  return result;
}

function deepCopyObject(obj) {
  const result = { ...obj };
  //
  for (let i of Object.keys(obj)) {
    if (isArray(result[i])) {
      result[i] = deepCopyArray(result[i]);
      continue;
    }
    if (isObject(result[i])) {
      result[i] = deepCopyObject(result[i]);
      continue;
    }
  }
  return result;
}
