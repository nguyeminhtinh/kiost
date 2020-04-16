import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MerchandiseManagementCreator } from 'merchandiseManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import revenueProduct from '../components/revenueProduct';

const mapStateToProps = state => {
  return {
    type: state.revenuesReducer.type,
    isProcessing: state.revenuesReducer.isProcessing,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    totalAmount: state.revenuesReducer.totalAmount,
    totalMoney: state.revenuesReducer.totalMoney,
    totalRows: state.revenuesReducer.totalRows,
    dataTable: state.revenuesReducer.dataTable,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getDeviceCode: MerchandiseManagementCreator.getDeviceCode,
      getRevenuesProduct: Creators.getRevenuesProduct,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(revenueProduct);
