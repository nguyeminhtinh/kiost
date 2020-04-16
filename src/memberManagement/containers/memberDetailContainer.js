import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// eslint-disable-next-line import/no-duplicates
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import MemberDetail from '../components/memberInfo';

const mapStateToProps = state => {
  return {
    isProcessing: state.membersReducer.isProcessing,
    dataMemberInfo: state.membersReducer.dataMemberInfo,
    totalRows: state.membersReducer.totalRows,
    customerPoit: state.membersReducer.customerPoit,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getMemberDetail: Creators.getMemberDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetail);
