// libs
import moment from 'moment';
import { listCategoryProduct } from 'constants/listKey';

export const getDateByYearMonth = (year, month) => {
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const days = [];
  for (let i = 1; i <= moment(`${y} ${m}`, 'YYYY MM').daysInMonth(); i += 1) {
    days.push({
      id: i,
      value: i < 10 ? `0${i}일` : `${i}일`,
      label: i < 10 ? `0${i}일` : `${i}일`
    });
  }
  return days;
};

export const getOptionYears = range => {
  const year = parseInt(moment().format('YYYY'), 10);
  const listYear = [];
  for (let i = year - range; i <= year; i += 1) {
    listYear.push({
      id: i,
      value: i,
      label: `${i}년`
    });
  }
  return listYear;
};

export const getAllCity = arr => {
  const results = [];
  // eslint-disable-next-line no-unused-expressions
  arr &&
    arr.forEach(element => {
      element.cities.forEach(item => {
        results.push(item);
      });
    });

  return results;
};

export const getAllDistricts = arr => {
  const results = [];
  // eslint-disable-next-line no-unused-expressions
  arr &&
    arr.forEach(provices => {
      provices.cities.forEach(cities => {
        cities.towns.forEach(district => {
          results.push(district);
        });
      });
    });

  return results;
};

export const getListDistirctByCity = arr => {
  const results = [];
  arr.forEach(element => {
    element.listDistrict.forEach(item => {
      results.push(item);
    });
  });
  return results;
};

export const getListProvince = arr => arr.map(item => item);

export const getCategoryOtionByName = name =>
  listCategoryProduct.find(item => item.label === name);
export const formatTypeDevice = key => {
  let type;
  switch (key) {
    case 'single':
      type = '싱글';
      break;
    case 'double':
      type = '더블';
      break;
    case 'slim':
      type = '슬림';
      break;
    default:
      break;
  }
  return type;
};

export const formatPreservationType = key => {
  let type;
  switch (key) {
    case 'frozen':
      type = '냉동';
      break;
    case 'cold':
      type = '냉장';
      break;
    default:
      break;
  }

  return type;
};

export const formatValueStatus = key => {
  let value;
  switch (key) {
    case 'use':
      value = 1;
      break;
    case 'stop':
      value = 2;
      break;
    case 'standby':
      value = 3;
      break;
    default:
      break;
  }

  return value;
};

export const formatValuesStatus = key => {
  let value;
  switch (key) {
    case 'use':
      value = '사용중';
      break;
    case 'stop':
      value = '사용해지';
      break;
    case 'standby':
      value = '사용대기';
      break;
    default:
      break;
  }

  return value;
};

export const handleFormatDecemalData = value => {
  return value.toString().includes('.') ? value : `${value}.000`;
};
export const getCategoryNameById = (categoriesOptions, categoryId) => {
  return (
    categoriesOptions &&
    categoriesOptions.find(item => item.value === categoryId)
  );
};

export const formatNegativeDay = negativeDay => {
  let dayFormat;
  const previousCurrentMonth = moment().format('M') - 1;
  const currentYear = moment().year();
  const monthOfYear = `${currentYear} - ${previousCurrentMonth}}`;

  const numberDayOfMonth = moment(monthOfYear, 'YYYY-MM').daysInMonth();

  switch (negativeDay) {
    case 0:
      dayFormat = numberDayOfMonth;
      break;
    case -1:
      dayFormat = numberDayOfMonth - 1;
      break;
    case -2:
      dayFormat = numberDayOfMonth - 2;
      break;
    case -3:
      dayFormat = numberDayOfMonth - 3;
      break;
    case -4:
      dayFormat = numberDayOfMonth - 4;
      break;
    case -5:
      dayFormat = numberDayOfMonth - 5;
      break;
    default:
      break;
  }

  return dayFormat;
};

export const formatPaymentType = paymentType => {
  let type;
  switch (paymentType) {
    case 'creditcard':
      type = '카드결제';
      break;
    case 'kakaopay':
      type = 'QR결제(카카오페이)';
      break;
    case 'point':
      type = '쿠폰결제';
      break;
    default:
      break;
  }

  return type;
};
