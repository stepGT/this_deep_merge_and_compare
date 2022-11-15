const { isArray, isObject, isSameType } = require('./helpers');

module.exports = deepMerge;

function deepMerge(obj1, obj2) {
  if ((!isObject(obj1) && !isArray(obj1)) || !isSameType(obj1, obj2)) {
    if (isArray(obj2) || isObject(obj2)) {
      return deepCopy(obj2);
    }
    return obj2;
  }

  if (isArray(obj1)) {
    return deepMergeArrays(obj1, obj2);
  }
  return deepMergeObjects(obj1, obj2);
}

function deepCopy(item) {
  if (!isArray(item) && !isObject(item)) {
    throw new TypeError(`function deepCopy was called with wrong argument ${item}`);
  }
  const result = isArray(item) ? [...item] : { ...item };
  //
  for (let i of Object.keys(result)) {
    if (isArray(result[i]) || isObject(result[i])) {
      result[i] = deepCopy(result[i]);
    }
  }
  return result;
}

function deepMergeArrays(arr1, arr2) {
  return deepCopy([...arr1, ...arr2]);
}

function deepMergeObjects(obj1, obj2) {
  const result = deepCopy(obj1);
  //
  for (let key of Object.keys(obj2)) {
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key]) || isArray(obj2[key])) {
        result[key] = deepCopy(obj2[key]);
      }
      result[key] = obj2[key];
    }
    result[key] = deepMerge(result[key], obj2[key]);
  }
  return result;
}
