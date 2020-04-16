// @flow
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
import REGEX from 'constants/regex';
import ERROR_MESSAGE from 'constants/errorMsg';

// eslint-disable-next-line import/prefer-default-export
export const validator = (objectVal: Object, validate: Object) => {
  const error = {};
  const keys = Object.keys(objectVal);
  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    const rules = validate[key];
    const value = objectVal[key];
    let errorMsg = '';
    for (let j = 0; j < rules.length; j += 1) {
      switch (rules[j]) {
        case 'required':
          if (value === '' || value === null || value === undefined) {
            errorMsg = ERROR_MESSAGE.REQUIRED;
          }
          break;
        case 'numberValue':
          if (!REGEX.FLOAT_INPUT.test(value)) {
            errorMsg = ERROR_MESSAGE.NUMBER_VALUE;
          }
          break;
        case 'notNumber':
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(value)) {
            errorMsg = ERROR_MESSAGE.REQUIRED;
          }
          break;
        case 'phoneNumber':
          if (!REGEX.PHONE_NUMBER.test(value)) {
            errorMsg = ERROR_MESSAGE.PHONE_NUMBER;
          }
          break;
        case 'email':
          if (!REGEX.EMAIL.test(value)) {
            errorMsg = ERROR_MESSAGE.EMAIL;
          }
          break;
        case 'userId':
          if (!REGEX.USER_NAME.test(value)) {
            errorMsg = ERROR_MESSAGE.USER_NAME;
          }
          break;
        case 'password':
          if (!REGEX.PASSWORD.test(value)) {
            errorMsg = ERROR_MESSAGE.PASSWORD;
          }
          break;
        case 'priceNumberOtherThan0':
          if (value === 0) {
            errorMsg = ERROR_MESSAGE.PRICE_NUMBER;
          }
          break;
        case 'weightNumberOtherThan0':
          if (parseFloat(value) === 0) {
            errorMsg = ERROR_MESSAGE.WEIGHT_NUMBER;
          }
          break;

        case 'validatePass':
          if (!REGEX.VALIDATE_PASSWORD.test(value)) {
            errorMsg = ERROR_MESSAGE.TEXT_VALIDATE_PASSWORD;
          }
          break;
        case 'maxLimit':
          if (parseFloat(value) > 999999) {
            errorMsg = '숫자가 너무 큽니다.';
          }
          break;

        default:
          break;
      }
      if (errorMsg) {
        error[key] = errorMsg;
      }
    }
  }
  return error;
};

export const formatValue = (mask: string, value: any) => {
  // eslint-disable-next-line one-var
  const s = '' + value;
  let r = '';
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask[im] === 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
};
