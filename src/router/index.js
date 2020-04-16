import React from 'react';

// Components
import ModalPrimary from 'components/Modal';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Creators } from 'commons/redux';
import { Creators as AccountCreators } from 'account/redux';
import { bindActionCreators } from 'redux';
import PrivateRoute from 'utils/PrivateRoute';
import HomepageContainer from 'home/containers/HomeContainer';
import MerchantInfo from 'storeManagement/containers/StoreDetailContainer';
import ROUTERS from 'constants/routers';
import SigninContainer from 'account/containers/SignInContainer';
import DeviceDetail from 'device/containers/DetailContainer';
import { API } from 'utils/Apis';
import Device from '../device/containers/DeviceContainer';
import RevenueTime from '../revenue/containers/revenueTimeContainer';

// Constants
import Member from '../memberManagement/containers/MemberManagementContainer';
import RevenueDay from '../revenue/containers/revenueDayStatusContainer';
import HistoryPayment from '../revenue/containers/paymentContainer';

import MemberInfo from '../memberManagement/containers/memberDetailContainer';
import RevenueProduct from '../revenue/containers/revenueProductContainer';
import Inventory from '../InventoryManagement/containers/InventoryContainer';
import InventoryDetail from '../InventoryManagement/containers/inventoryDetailContainer';
import Merchandise from '../merchandiseManagement/containers/MerchandiseManagementContainer';
import RegisterProduct from '../merchandiseManagement/containers/FormMerchandiseAddContainer';
import RegisterSelfInputProduct from '../merchandiseManagement/containers/RegisterProductSeftContainer';
import SeftProduct from '../merchandiseManagement/containers/SeftProductContainer';
import EditProduct from '../merchandiseManagement/containers/MerchandiseStatusContainer';
import EditSelfProduct from '../merchandiseManagement/containers/SelfInputProductDetailContainer';

type Props = {
  token: string,
  isOpenNotify: boolean,
  closeNotifyAccountDenied: Function,
  logOut: Function
};
const Router = ({
  token,
  isOpenNotify,
  closeNotifyAccountDenied,
  logOut
}: Props) => {
  const isAuthenticated = token !== '';
  if (token) {
    API.setHeader('Authorization', token);
  }
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path={ROUTERS.LOGIN} component={SigninContainer} />
          {/* private routers */}
          <PrivateRoute
            exact
            path={ROUTERS.ROOT}
            component={HomepageContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DEVICE}
            component={Device}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STORES}
            component={MerchantInfo}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DEVICE_DETAIL}
            component={DeviceDetail}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.REVENUE_TIME}
            component={RevenueTime}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MEMBER}
            component={Member}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REVENUEDAY_DAY}
            component={RevenueDay}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MEMBER_DETAIL}
            component={MemberInfo}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REVENUE_PRODUCT}
            component={RevenueProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PAYMENT}
            component={HistoryPayment}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.INVENTORY}
            component={Inventory}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.INVENTORY_DETAIL}
            component={InventoryDetail}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MERCHANDISE}
            component={Merchandise}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REGISTER_PRODUCT}
            component={RegisterProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REGISTER_SELF_PRODUCT}
            component={RegisterSelfInputProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.SELF_PRODUCT}
            component={EditSelfProduct}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.SEFT_PRODUCT}
            component={SeftProduct}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.MERCHANDISE_DETAIL}
            component={EditProduct}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </main>
      <ModalPrimary
        isOpen={isOpenNotify}
        content="해당 계정은 다른 기기에서 로그인 되었습니다. 다시 로그인 해주세요."
        handleClose={() => {
          closeNotifyAccountDenied();
          logOut();
        }}
        title="알림"
        textBtnLeft="확인"
        customClass="redirectLogin"
      />
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    token: state.accountReducer.token,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      closeNotifyAccountDenied: Creators.closeNotifyAccountDenied,
      logOut: AccountCreators.logOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
