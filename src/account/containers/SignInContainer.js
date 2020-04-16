import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signin from '../components/SignIn';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    accountInfo: state.accountReducer.accountInfo,
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing,
    errors: state.accountReducer.errors,
    token: state.accountReducer.token
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      signIn: Creators.signIn
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
