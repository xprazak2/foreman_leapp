import { snakeCase } from 'lodash';

export const deepPropsToSnakeCase = obj =>
  deepPropsToCase(snakeCase, 'propsToSnakeCase only takes objects')(obj);

const deepPropsToCase = (casingFn, errorMsg) => obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepPropsToCase(casingFn, errorMsg));
  }
  const transformed = propsToCase(casingFn, errorMsg, obj);
  return Object.keys(transformed).reduce((memo, key) => {
    memo[key] = deepPropsToCase(casingFn, errorMsg)(transformed[key]);
    return memo;
  }, {});
};

const propsToCase = (casingFn, errorMsg, ob) => {
  if (typeof ob !== 'object') throw Error(errorMsg);

  return Object.keys(ob).reduce((memo, key) => {
    memo[casingFn(key)] = ob[key];
    return memo;
  }, {});
};
