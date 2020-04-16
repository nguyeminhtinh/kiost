// import libs
import { create } from 'apisauce';
// import App's config
import AppConfig from 'config/appConfig';

export const ROUTES = {
  // Auths
  LOGIN: `/api/login`,
  LOG_OUT: `/api/logout`,
  DELETE_PRODUCT_API: id => `/api/store-owner/product/${id}`,
  GET_PRODUCTS: `/api/store-owner/products`,
  GET_PRODUCTS_DETAIL: `/api/store-owner/product-detail`,
  UPDATE_PRODUCT: id => `/api/store-owner/product/${id}`,
  REGISTER_IMAGE_PRODUCT_API: '/api/admin/category-image/upload',
  UPDATE_IMAGE_PRODUCT_API: params =>
    `/api/admin/category-image/update?${params}`,
  //
  API_GET_SELF_PRODUCT_DETAIL: id => `/api/store-owner/product/${id}/self`,
  API_UPDATE_SELF_PRODUCT_DETAIL: id =>
    `/api/store-owner/product/update/self/${id}`,
  API_GET_MERCHANDISE_MANUAL: `/api/store-owner/product/list/self`,
  //
  REGISTER_PRODUCT_API: `/api/store-owner/product/register`,
  GET_CATEGORIES: `/api/store-owner/fcCategories`,
  GET_DEVICE_CODE: `/api/store-owner/getCodeDevice`,
  GET_PRODUCT_CODE_BY_CATEGORY: categoryNo =>
    `/api/store-owner/fc-product/${categoryNo}`,
  GET_REVENUES: `/api/store-owner/revenues`,
  GET_ADDRESS_OPTIONS: `/address-options`,
  GET_STORE_DETAIL: `/api/store-owner/store/detail`,
  GET_LIST_DEVICES: `/api/store-owner/devices`,
  UPDATE_DEVICE: id => `/api/store-owner/devices/${id}`,
  GET_LIST_MEMBER: `api/store-owner/customer`,
  GET_MEMBER_DETAIL: `/api/store-owner/customer/detail`,
  GET_INVENTORY: `/api/store-owner/inventories`,
  API_GET_INVENTORY_LIST_DETAIL: id => `/api/store-owner/inventory/${id}`,
  API_GET_INVENTORY_PRODUCT_DETAIL: id =>
    `/api/store-owner/inventory/product/${id}`,
  GET_DEVICE_DETAIL: id => `/api/store-owner/devices/${id}`,
  GET_PRODUCT_NEARLY_EXPRIED: 'get-product-expried',
  GET_PAYMENT_DETAIL: orderId =>
    `/api/store-owner/revenues-payment-history-detail/${orderId}`,
  REVENUE_TIME: `/api/store-owner/revenues-times`,
  REVENUE_DATE: `/api/store-owner/revenues-day-month-year`,
  REVENUE_PRODUCT: `/api/store-owner/revenues-product`,
  GET_PAYMENT: `/api/store-owner/revenues-payment-history`,
  ADD_PRODUCT_SEFT: `/api/store-owner/product/register/self`,
  GET_IMAGES_BY_CATEGORY_ID: id => `/api/admin/category-image/${id}`,
  GET_IMAGES_BY_CATEGORY_AUTHOR: id =>
    `/api/admin/category-image/${id}?self=true`
};

export const API = create({
  baseURL: AppConfig.API_URL
});

export const resetRequest = route => {
  API.addRequestTransform(request => {
    request.url = route;
  });
};
