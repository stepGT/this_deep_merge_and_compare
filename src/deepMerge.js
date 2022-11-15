const { isArray, isObject, isSameType } = require('./helpers');

module.exports = deepMerge;

function deepMerge(obj1, obj2) {
  if ((!isObject(obj1) && !isArray(obj1)) || !isSameType(obj1, obj2)) {
    if (isArray(obj2)) {
      return deepCopyArray(obj2);
    }
    if (isObject(obj2)) {
      return deepCopyObject(obj2);
    }
    return obj2;
  }

  if (isArray(obj1)) {
    return deepMergeArrays(obj1, obj2);
  }
  return deepMergeObjects(obj1, obj2);
}

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

function deepMergeArrays(arr1, arr2) {
  return deepCopyArray([...arr1, ...arr2]);
}

function deepMergeObjects(obj1, obj2) {
  const result = deepCopyObject(obj1);
  //
  for (let key of Object.keys(obj2)) {
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key])) {
        result[key] = deepCopyObject(obj2[key]);
        continue;
      }
      if (isArray(obj2[key])) {
        result[key] = deepCopyArray(obj2[key]);
        continue;
      }
      result[key] = obj2[key];
      continue;
    }
    result[key] = deepMerge(result[key], obj2[key]);
  }
  return result;
}
