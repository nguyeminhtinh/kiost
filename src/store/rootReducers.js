import { combineReducers } from 'redux';
import { homeReducer } from 'home/redux';
import { accountReducer } from 'account/redux';
import { storesReducer } from 'storeManagement/redux';
import { devicesReducer } from 'device/redux';
import { revenuesReducer } from 'revenue/redux';
import { inventoryReducer } from 'InventoryManagement/redux';
import { membersReducer } from 'memberManagement/redux';
import { merchandiseReducer } from 'merchandiseManagement/redux';
import { commonReducer } from 'commons/redux';

const appReducer = combineReducers({
  homeReducer,
  accountReducer,
  storesReducer,
  devicesReducer,
  revenuesReducer,
  inventoryReducer,
  membersReducer,
  merchandiseReducer,
  commonReducer
});

export default appReducer;
