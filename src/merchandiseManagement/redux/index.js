// import libs
import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import appConfig from 'config/appConfig';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getMerchandise: ['params'],
  getMerchandiseSuccess: null,
  getMerchandiseFailed: null,
  getMerchandiseManual: ['params'],
  getMerchandiseManualSuccess: null,
  getMerchandiseManualFailed: null,
  getMerchandiseDetail: ['params'],
  getMerchandiseDetailSuccess: null,
  getMerchandiseDetailFailed: null,
  getCategories: null,
  getCategoriesSuccess: null,
  getCategoriesFailed: null,
  getDeviceCode: null,
  getDeviceCodeSuccess: null,
  getDeviceCodeFailed: null,
  getProductCodeByCategory: ['categoryId'],
  getProductCodeByCategorySuccess: null,
  getProductCodeByCategoryFailed: null,
  getProductSelecting: ['id'],
  registerProduct: ['body'],
  registerProductSuccess: null,
  registerProductFailed: null,
  deleteProduct: ['id'],
  deleteProductSuccess: null,
  deleteProductFailed: null,
  updateProduct: ['id', 'body'],
  updateProductSuccess: null,
  updateProductFailed: null,
  addProductSeft: ['params'],
  addProductSeftSuccess: null,
  addProductSeftFailed: null,
  getImageCategory: ['id'],
  getImageCategorySuccess: null,
  getImageCategoryFailed: null,
  getImageCategoryAuthor: ['id'],
  getImageCategoryAuthorSuccess: null,
  getImageCategoryAuthorFailed: null,

  getAPISelfProductDetail: ['id'],
  getAPISelfProductDetailSuccess: null,
  getAPISelfProductDetailFailed: null,
  updateSelfProductDetail: ['id', 'body'],
  updateSelfProductDetailSuccess: null,
  updateSelfProductDetailFailed: null,
  /** Image Profuct */
  registerImageProduct: ['params'],
  registerImageProductSuccess: null,
  registerImageProductFailed: null,
  /** Image Profuct */
  updateImageProduct: ['params'],
  updateImageProductSuccess: null,
  updateImageProductFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  merchandiseDetail: {},
  isProcessing: false,
  productListOptions: [],
  productList: [],
  statusProducts: {},
  categories: [],
  deviceCodes: [],
  productName: [],
  productSelecting: null,
  dataMerchandiseManual: []
});

const getMerchandiseDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getMerchandiseDetailSuccess = (state, action) => {
  const { data } = action;
  const productStatus = data && data.productStatus;
  let status = 1;
  switch (productStatus) {
    case 'WAIT':
      status = 1;
      break;
    case 'DP-COMPLETE':
      status = 2;
      break;
    case 'COMPLETE':
      status = 3;
      break;
    case 'CANCEL':
      status = 4;
      break;
    default:
      break;
  }
  const dataObj = {
    storeName: data && data.storeName,
    status,
    categoryNo: data && data.categoryNo,
    tax: data && data.tax,
    origin: data && data.origin,
    expirationDate: data && data.expirationDate,
    manufactureDate: data && data.manufactureDate,
    categoryName: {
      value: data && data.categoryName,
      label: data && data.categoryName
    },
    nameProduct: { label: data && data.name, value: data && data.name },
    ranking: data && data.productLevel,
    priceCost:
      data && data.priceCost ? `${data.priceCost.toLocaleString('en')}원` : '',
    // data section on below
    manufacturer: (data && data.manufacturer) || '',
    mass: data && data.mass ? `${data.mass.toLocaleString('en')}g` : '',
    commodityPrice: `${
      data && data.price ? data.price.toLocaleString('en') : 0
    }원`,
    codeDevice: (data && data.deviceCode) || '',
    location: `${
      data && data.slotY !== null ? `${data && data.slotY + 1}층` : ''
    } ${data && data.slotX !== null ? `${data.slotX + 1}열` : ''}`,
    insertedAmount: data && data.insertedAmount,
    saleAmount: data && data.saleAmount,
    productCode: (data && data.code) || '',
    countryOfOrigin: (data && data.productOrigin) || '',
    livestock: data && data.type,
    urlImageProduct: data && data.imagePath ? data.imagePath : '',
    urlImageLanding1: data && data.landing1Path ? data.landing1Path : '',
    urlImageLanding2: data && data.landing2Path ? data.landing2Path : '',
    urlImageLanding3: data && data.landing3Path ? data.landing3Path : '',
    urlImageLanding4: data && data.landing4Path ? data.landing4Path : '',
    urlImageLanding5: data && data.landing5Path ? data.landing5Path : ''
  };
  return state.merge({
    type: action.type,
    merchandiseDetail: dataObj,
    statusDetail: !!data,
    isProcessing: false
  });
};

const getMerchandiseDetailFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error,
    isProcessing: false
  });
};

const getMerchandiseManual = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getMerchandiseManualSuccess = (state, action) => {
  const { data } = action;
  const dataMerchandiseManual =
    data &&
    data.products &&
    data.products.map((product, index) => {
      return {
        rowId: `${data.totalRows -
          data.currentPage * action.numberRows -
          index}`,
        id: product && product.id,
        productCode: product && product.productCode,
        category: product && product.category,
        productName: product && product.productName
      };
    });

  return state.merge({
    type: action.type,
    dataMerchandiseManual,
    isProcessing: false,
    totalRows: data.totalRows
  });
};

const getMerchandiseManualFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

const getMerchandise = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getMerchandiseSuccess = (state, action) => {
  const newDate = moment(new Date()).format('YYYY-MM-DD');
  const productList = action.data.products.map((product, index) => {
    const dayExpiration = moment(product.expirationDate).format('YYYY-MM-DD');
    const DNew = moment(newDate);
    const DEnd = moment(dayExpiration);
    const compare = DEnd.diff(DNew, 'days');
    let dateD = '';

    if (compare > 2) {
      dateD = '';
    }
    if (compare === 2) {
      dateD = '(D-3)';
    }
    if (compare === 1) {
      dateD = '(D-2)';
    }
    if (compare === 0) {
      dateD = '(D-1)';
    }
    if (compare < 0) {
      dateD = `(D +${Math.abs(compare)})`;
    }
    const productStatus = product && product.productStatus;
    let status = '';
    switch (productStatus) {
      case 'WAIT':
        status = 1;
        break;
      case 'DP-COMPLETE':
        status = 2;
        break;
      case 'COMPLETE':
        status = 3;
        break;
      case 'CANCEL':
        status = 4;
        break;
      default:
        break;
    }

    return {
      rowId: `${action.data.totalRows -
        action.data.currentPage * action.numberRows -
        index}`,
      id: product && product.id,
      productCode: product && product.codeProduct,
      productCategory: product && product.categoryName,
      productName: product && product.nameProduct,
      expirationDate:
        product &&
        `${moment(product.expirationDate).format('YYYY-MM-DD')} ${dateD}`,
      deviceCode: product && product.deviceCode,
      productLocation:
        product &&
        `${product.locationY !== null ? `${product.locationY + 1}층` : ''} ${
          product.locationX !== null ? `${product.locationX + 1}열` : ''
        }`,
      quantity:
        product && product.quantity && product.quantity.toLocaleString('en'),
      status,
      productStockId:
        product && product.productStockId && product.productStockId
    };
  });
  const { waiting, complete, cancel, dpComplete, totalRows } = action.data;

  return state.merge({
    type: action.type,
    isProcessing: false,
    statusProducts: {
      waiting: waiting ? waiting.toLocaleString('en') : 0,
      complete: complete ? complete.toLocaleString('en') : 0,
      cancel: cancel ? cancel.toLocaleString('en') : 0,
      dpComplete: dpComplete ? dpComplete.toLocaleString('en') : 0
    },
    totalRows,
    productList
  });
};

const getMerchandiseFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

const getCategory = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getCategorySuccess = (state, action) => {
  const { categories } = action.data;

  const dataCategories = categories.map((category, index) => {
    return {
      id: index + 1,
      value: category.categoryNo,
      label: category.categoryName
    };
  });

  return state.merge({
    type: action.type,
    categories: dataCategories
  });
};
const getCategoryFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};

const getDeviceCode = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getDeviceCodeSuccess = (state, action) => {
  const { deviceCodes } = action.data;
  const dataDeviceCode = deviceCodes.map((deviceCode, index) => {
    return {
      id: index + 1,
      value: deviceCode.id,
      label: deviceCode.code
    };
  });

  const defaultDeviceCodeOption = {
    id: 0,
    value: null,
    label: '전체'
  };
  return state.merge({
    type: action.type,
    deviceCodes: [defaultDeviceCodeOption, ...dataDeviceCode]
  });
};
const getDeviceCodeFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};

const getProductCodeByCategory = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getProductCodeByCategorySuccess = (state, action) => {
  const { products } = action.data;
  const dataProductName = products.map(product => {
    return {
      id: product.id,
      value: product.id,
      label: product.name
    };
  });
  return state.merge({
    type: action.type,
    productName: dataProductName,
    productListOptions: products
  });
};

const getProductCodeByCategoryFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getProductSelecting = (state, action) => {
  const dataProductSelecting =
    state.productListOptions &&
    state.productListOptions.find(item => item.id === action.id);
  const formatDataProduct = {
    categoryNo: dataProductSelecting && dataProductSelecting.categoryId,
    id: action.id,
    nameProduct: dataProductSelecting && dataProductSelecting.name,
    tax: dataProductSelecting && dataProductSelecting.tax,
    origin: dataProductSelecting && dataProductSelecting.origin,
    livestock: dataProductSelecting && dataProductSelecting.type,
    manufacturer:
      (dataProductSelecting && dataProductSelecting.manufacturer) || '',
    mass:
      dataProductSelecting && dataProductSelecting.mass
        ? `${dataProductSelecting.mass.toLocaleString('en')}g`
        : '',
    priceCost:
      dataProductSelecting && dataProductSelecting.priceCost
        ? `${dataProductSelecting.priceCost.toLocaleString('en')}원`
        : '',
    ranking:
      (dataProductSelecting &&
        dataProductSelecting.productLevel &&
        dataProductSelecting.productLevel) ||
      '',
    productCode:
      (dataProductSelecting &&
        dataProductSelecting.code &&
        dataProductSelecting.code) ||
      '',
    urlImageProduct:
      dataProductSelecting && dataProductSelecting.imagePath
        ? dataProductSelecting.imagePath
        : '',
    urlImageProduct1:
      dataProductSelecting && dataProductSelecting.landing1Path
        ? dataProductSelecting.landing1Path
        : '',
    urlImageProduct2:
      dataProductSelecting && dataProductSelecting.landing2Path
        ? dataProductSelecting.landing2Path
        : '',
    urlImageProduct3:
      dataProductSelecting && dataProductSelecting.landing3Path
        ? dataProductSelecting.landing3Path
        : '',
    urlImageProduct4:
      dataProductSelecting && dataProductSelecting.landing4Path
        ? dataProductSelecting.landing4Path
        : '',
    urlImageProduct5:
      dataProductSelecting && dataProductSelecting.landing5Path
        ? dataProductSelecting.landing5Path
        : '',
    countryOfOrigin:
      (dataProductSelecting &&
        dataProductSelecting.productOrigin &&
        dataProductSelecting.productOrigin) ||
      ''
  };
  return state.merge({
    type: action.type,
    productSelecting: formatDataProduct
  });
};

/*
Add product
*/
const registerProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const registerProductSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    statusRepose: (action && action.data) || false
  });
};
const registerProductFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};
/*
Update product
*/
const updateProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const updateProductSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    error: action
  });
};
const updateProductFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

// Delete product

const deleteProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const deleteProductSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    statusRepose: (action && action.data) || false
  });
};
const deleteProductFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const addProductSeft = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const addProductSeftSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    errorMess: action.error && action.error.text
  });
};
const addProductSeftFailed = (state, action) => {
  return state.merge({
    type: action.type,
    errorMess: action.error && action.error.text
  });
};

export const getImageCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getImageCategorySuccess = (state, action) => {
  const { data } = action;
  const imageList = data
    ? data.map(item => ({
        id: item.id,
        value: item.image && `${appConfig.IMG_URL}${item.image}`,
        img: item.image && (item.image || ''),
        category: item.category,
        imageName: item.imageName
      }))
    : [];
  return state.merge({
    isProcessing: false,
    type: action.type,
    imageList
  });
};

export const getImageCategoryFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const getImageCategoryAuthor = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getImageCategoryAuthorSuccess = (state, action) => {
  const { data } = action;
  const imageListAuthor = data
    ? data.map(item => ({
        id: item.id,
        value: item.image && `${appConfig.IMG_URL}${item.image}`,
        img: item.image && (item.image || ''),
        category: item.category,
        imageName: item.imageName
      }))
    : [];
  return state.merge({
    isProcessing: false,
    type: action.type,
    imageListAuthor
  });
};

export const getImageCategoryAuthorFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

/*
Get Self product
*/
const getAPISelfProductDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessingDetail: true
  });
};
const getAPISelfProductDetailSuccess = (state, action) => {
  const { products } = action.data;

  const selfProductDetail = {
    categoryId: 9999,
    code: products && products.code ? products.code : '',
    imagePath: products && products.imagePath ? products.imagePath : '',
    productName: products && products.name ? products.name : '',
    tax: products && products.tax,
    origin: products && products.origin,
    manufacturer:
      products && products.manufacturer ? products.manufacturer : '',
    priceCost:
      products && products.priceCost
        ? `${products.priceCost.toLocaleString('en')}원`
        : '',
    mass:
      products && products.mass ? `${products.mass.toLocaleString('en')}g` : '',
    productOrigin:
      products && products.productOrigin ? products.productOrigin : '',
    productLevel: {
      label: products && products.productLevel,
      value: products && products.productLevel
    },
    livestock: products && products.type,
    imageName: products && products.imageName,
    imageId: products && products.imageId
  };
  return state.merge({
    type: action.type,
    selfProductDetail,
    errorServer: action,
    isProcessingDetail: false
  });
};
const getAPISelfProductDetailFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessingDetail: false
  });
};

/*
Update Self product
*/
const updateSelfProductDetail = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const updateSelfProductDetailSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    errorMess: action && action.error
  });
};
const updateSelfProductDetailFailed = (state, action) => {
  return state.merge({
    type: action.type,
    errorMess: action && action.error
  });
};

/** Image Product */
const registerImageProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const registerImageProductSuccess = (state, action) => {
  const { data } = action;
  return state.merge({
    dataImage: data,
    type: action.type
  });
};

const registerImageProductFailed = (state, action) => {
  return state.merge({
    errorMess: (action && action.error) || 'Server Error'
  });
};

/** Image Product */
const updateImageProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const updateImageProductSuccess = (state, action) => {
  const { data } = action;
  return state.merge({
    dataImageUPdate: data,
    type: action.type
  });
};

const updateImageProductFailed = (state, action) => {
  return state.merge({
    errorMess: (action && action.error) || 'Server Error'
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_MERCHANDISE_DETAIL]: getMerchandiseDetail,
  [Types.GET_MERCHANDISE_DETAIL_SUCCESS]: getMerchandiseDetailSuccess,
  [Types.GET_MERCHANDISE_DETAIL_FAILED]: getMerchandiseDetailFailed,
  [Types.GET_MERCHANDISE]: getMerchandise,
  [Types.GET_MERCHANDISE_SUCCESS]: getMerchandiseSuccess,
  [Types.GET_MERCHANDISE_FAILED]: getMerchandiseFailed,
  [Types.GET_CATEGORIES]: getCategory,
  [Types.GET_CATEGORIES_SUCCESS]: getCategorySuccess,
  [Types.GET_CATEGORIES_FAILED]: getCategoryFailed,
  [Types.GET_DEVICE_CODE]: getDeviceCode,
  [Types.GET_DEVICE_CODE_SUCCESS]: getDeviceCodeSuccess,
  [Types.GET_DEVICE_CODE_FAILED]: getDeviceCodeFailed,
  [Types.GET_PRODUCT_CODE_BY_CATEGORY]: getProductCodeByCategory,
  [Types.GET_PRODUCT_CODE_BY_CATEGORY_SUCCESS]: getProductCodeByCategorySuccess,
  [Types.GET_PRODUCT_CODE_BY_CATEGORY_FAILED]: getProductCodeByCategoryFailed,
  [Types.GET_PRODUCT_SELECTING]: getProductSelecting,
  [Types.REGISTER_PRODUCT]: registerProduct,
  [Types.REGISTER_PRODUCT_SUCCESS]: registerProductSuccess,
  [Types.REGISTER_PRODUCT_FAILED]: registerProductFailed,
  [Types.DELETE_PRODUCT]: deleteProduct,
  [Types.DELETE_PRODUCT_SUCCESS]: deleteProductSuccess,
  [Types.DELETE_PRODUCT_FAILED]: deleteProductFailed,
  [Types.UPDATE_PRODUCT]: updateProduct,
  [Types.UPDATE_PRODUCT_SUCCESS]: updateProductSuccess,
  [Types.UPDATE_PRODUCT_FAILED]: updateProductFailed,
  [Types.ADD_PRODUCT_SEFT]: addProductSeft,
  [Types.ADD_PRODUCT_SEFT_SUCCESS]: addProductSeftSuccess,
  [Types.ADD_PRODUCT_SEFT_FAILED]: addProductSeftFailed,

  [Types.GET_API_SELF_PRODUCT_DETAIL]: getAPISelfProductDetail,
  [Types.GET_API_SELF_PRODUCT_DETAIL_SUCCESS]: getAPISelfProductDetailSuccess,
  [Types.GET_API_SELF_PRODUCT_DETAIL_FAILED]: getAPISelfProductDetailFailed,
  [Types.UPDATE_SELF_PRODUCT_DETAIL]: updateSelfProductDetail,
  [Types.UPDATE_SELF_PRODUCT_DETAIL_SUCCESS]: updateSelfProductDetailSuccess,
  [Types.UPDATE_SELF_PRODUCT_DETAIL_FAILED]: updateSelfProductDetailFailed,

  [Types.GET_IMAGE_CATEGORY]: getImageCategory,
  [Types.GET_IMAGE_CATEGORY_SUCCESS]: getImageCategorySuccess,
  [Types.GET_IMAGE_CATEGORY_FAILED]: getImageCategoryFailed,
  [Types.GET_IMAGE_CATEGORY_AUTHOR]: getImageCategoryAuthor,
  [Types.GET_IMAGE_CATEGORY_AUTHOR_SUCCESS]: getImageCategoryAuthorSuccess,
  [Types.GET_IMAGE_CATEGORY_AUTHOR_FAILED]: getImageCategoryAuthorFailed,
  [Types.GET_MERCHANDISE_MANUAL]: getMerchandiseManual,
  [Types.GET_MERCHANDISE_MANUAL_SUCCESS]: getMerchandiseManualSuccess,
  [Types.GET_MERCHANDISE_MANUAL_FAILED]: getMerchandiseManualFailed,
  /** Image Product */
  [Types.REGISTER_IMAGE_PRODUCT]: registerImageProduct,
  [Types.REGISTER_IMAGE_PRODUCT_SUCCESS]: registerImageProductSuccess,
  [Types.REGISTER_IMAGE_PRODUCT_FAILED]: registerImageProductFailed,

  /** Image Product */
  [Types.UPDATE_IMAGE_PRODUCT]: updateImageProduct,
  [Types.UPDATE_IMAGE_PRODUCT_SUCCESS]: updateImageProductSuccess,
  [Types.UPDATE_IMAGE_PRODUCT_FAILED]: updateImageProductFailed
};

// Create reducers by pass state and handlers
export const merchandiseReducer = createReducer(INITIAL_STATE, HANDLERS);
