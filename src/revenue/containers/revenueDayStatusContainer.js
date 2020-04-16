import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RevenueDay from '../components/revenueDay';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    userInfo: state.accountReducer.userInfo,
    type: state.revenuesReducer.type,
    isProcessing: state.revenuesReducer.isProcessing,
    dataRevenueDate: state.revenuesReducer.dataRevenueDate,
    listYear: state.revenuesReducer.listYear,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getRevenuesByDate: Creators.getRevenuesByDate,
      getListYear: Creators.getListYear,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueDay);
