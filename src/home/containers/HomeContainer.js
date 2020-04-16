import { connect } from 'react-redux';
import { Creators as CommonCreator } from 'commons/redux';
import { bindActionCreators } from 'redux';
import Home from '../components';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.homeReducer.isProcessing,
    topRevenuesTime: state.homeReducer.topRevenuesTime,
    topRevenuesDay: state.homeReducer.topRevenuesDay,
    topProducts: state.homeReducer.topProducts,
    dataExpiration: state.homeReducer.dataExpiration,
    totalRows: state.homeReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getRevenues: Creators.getRevenues,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
