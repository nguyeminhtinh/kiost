// @flow
import React, { useRef, useState, memo, useEffect } from 'react';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { validator } from 'utils/Validators';
import Checkbox from 'components/Checkbox';
import { Container, Row } from 'react-bootstrap';
import ModalPrimary from 'components/Modal';
import ERROR_MESSAGE from 'constants/errorMsg';
import { Loading } from 'components/Loading';

type Props = {
  signIn: Function,
  isProcessing: boolean,
  errors: string
};
const FormLogin = ({ signIn, isProcessing, errors }: Props) => {
  const [textError, setTextError] = useState(false);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSaveId, setIsSaveId] = useState(false);
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  const rules = {
    userId: ['userId', 'required'],
    password: ['password', 'required'],
    rememberMe: []
  };

  useEffect(() => {
    if (errors) {
      setTextError(true);
    }
  }, [errors]);

  const handleSubmit = () => {
    let validation: {
      userId?: string,
      password?: string
    } = {};
    const objSubmit = {
      userId: userIdRef.current ? userIdRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : ''
    };
    validation = validator(objSubmit, rules);

    if (Object.keys(validation).length > 0) {
      setError(validation);
      setIsError(true);
      return;
    }

    setError({});
    setIsError(false);
    signIn({
      ...objSubmit,
      rememberMe: isSaveId,
      loginType: 'STORE_OWNER'
    });
  };

  /**
   * Handle custom show content error
   */
  // eslint-disable-next-line consistent-return
  const handleFormatError = () => {
    let contentMesg = '';
    const keys = Object.keys(error);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      switch (keys[i]) {
        case 'userId':
          if (error.username === ERROR_MESSAGE.USER_NAME) {
            contentMesg = ERROR_MESSAGE.USER_INCORRECT;
          } else {
            contentMesg = ERROR_MESSAGE.ID_REQUIRED;
          }
          break;
        case 'password':
          if (error.password === ERROR_MESSAGE.PASSWORD) {
            contentMesg = ERROR_MESSAGE.USER_INCORRECT;
          } else {
            contentMesg = ERROR_MESSAGE.PASSWORD_REQUIRED;
          }
          break;
        default:
          break;
      }
      return contentMesg;
    }
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className="form-wrapper flex-row align-items-center d-flex">
      <Container className="d-flex align-items-center justify-content-center p-0">
        <ModalPrimary
          isOpen={isError}
          content={handleFormatError()}
          handleClose={() => {
            setIsError(false);
          }}
          title="알림"
          textBtnLeft="확인"
        />
        <ModalPrimary
          isOpen={textError}
          content="아이디 또는 비밀번호가 잘못되었습니다."
          handleClose={() => {
            setTextError(false);
          }}
          title="알림"
          textBtnLeft="확인"
        />
        {isProcessing ? (
          <div className="wrapper-loading">
            <Loading
              animation="grow"
              role="status"
              className=""
              text=""
              variant="dark"
              size="lg"
            />
          </div>
        ) : (
          <Row className="justify-content-center col-md-12 p-0">
            <form className="form-login">
              <h4>미트박스</h4>
              <Input
                placeholder="아이디를 입력해주세요"
                type="text"
                label="아이디"
                icon={faUser}
                innerRef={userIdRef}
                onKeyPress={handleKeyDown}
              />
              <Input
                placeholder="비밀번호를 입력해주세요"
                type="password"
                label="비밀번호"
                icon={faLock}
                innerRef={passwordRef}
                onKeyPress={handleKeyDown}
              />
              <Checkbox
                label="아이디 저장"
                checked={isSaveId}
                onChange={() => {
                  setIsSaveId(!isSaveId);
                }}
                name="saveId"
                onKeyPress={handleKeyDown}
              />
              <div className="text-center d-block">
                <PrimaryButton
                  type="button"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  로그인
                </PrimaryButton>
              </div>
            </form>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default memo<Props>(FormLogin);
