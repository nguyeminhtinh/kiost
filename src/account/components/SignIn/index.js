// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { API } from 'utils/Apis';
import ROUTERS from 'constants/routers';
import FormLogin from './FormLogin';
import { Types } from '../../redux';

type Props = {
  signIn: Function,
  type: string,
  token: string,
  isProcessing: boolean,
  errors: string,
  history: {
    push: Function,
    location: {
      pathname: string
    }
  }
};
const Signin = ({
  signIn,
  type,
  token,
  isProcessing,
  history,
  errors
}: Props) => {
  /**
   * handle effect after login success
   */
  useEffect(() => {
    switch (type) {
      case Types.SIGN_IN_SUCCESS:
        API.setHeader('Authorization', token);
        history.push(ROUTERS.ROOT);
        break;
      default:
        break;
    }
  }, [token, type, history.location.pathname]);

  return (
    <Container fluid className="signin-page">
      <Row>
        <Col xs={12}>
          <FormLogin
            signIn={signIn}
            isProcessing={isProcessing}
            errors={errors}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default memo<Props>(Signin);
