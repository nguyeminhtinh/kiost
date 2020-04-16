// @flow
// libs
import React, { useState, useRef, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Loading from 'components/Loading';
import Radio from 'components/Radio';
import { validator } from 'utils/Validators';
import Input from 'components/Input';
import TableData from 'components/Table';
import PrimaryButton from 'components/Button';
import TitleHeader from 'components/TitleHeader';
import InputChange from 'components/Input/InputChange';
import { ModalPrimary } from 'components/Modal';
import { headMaintenanceHistory } from '../../../constants/headerTable';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import MainLayout from '../../../layout/MainLayout';
import { Types } from '../../redux';

type Props = {
  isProcessing: boolean,
  updateDevice: Function,
  getDeviceDetail: Function,
  totalRows: number,
  deviceDetail: Object,
  type: string,
  maintenances: Array<{}>,
  history: {
    push: Function
  },
  match: {
    params: {
      id: any
    }
  },
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const DeviceDetail = ({
  isProcessing,
  updateDevice,
  getDeviceDetail,
  deviceDetail,
  type,
  history,
  maintenances,
  match,
  totalRows,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [model, setModel] = useState(deviceDetail && deviceDetail.modelDevice);
  const [popupConfirm, setPopupConfirm] = useState({
    isShow: false,
    content: ''
  });
  const [popupCancel, setPopupCancel] = useState({
    isShow: false,
    content: ''
  });

  const [valueDefault, setValueDefault] = useState({
    password:
      deviceDetail && deviceDetail.password ? deviceDetail.password : '',
    confirmPassword:
      deviceDetail && deviceDetail.password ? deviceDetail.password : ''
  });

  useEffect(() => {
    setModel(deviceDetail && deviceDetail.modelDevice);
  }, [deviceDetail]);

  useEffect(() => {
    const { id } = match.params;
    getDeviceDetail({ pageIndex: 1, numberRows: 10, id: parseInt(id, 10) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    const { id } = match.params;
    getDeviceDetail({
      pageIndex: eventKey.selected + 1,
      numberRows: 10,
      id: parseInt(id, 10)
    });
  };

  useEffect(() => {
    switch (type) {
      case Types.UPDATE_DEVICE_SUCCESS:
        history.push('/device');
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  /**
   * Check validate
   */
  const inputRefDown1 = useRef('');
  const inputRefUp1 = useRef('');
  const inputRefDown2 = useRef('');
  const inputRefUp2 = useRef('');
  const inputRefDown3 = useRef('');
  const inputRefUp3 = useRef('');
  const inputRefDown4 = useRef('');
  const inputRefUp4 = useRef('');
  const [isShowMess1, setIsShowMess1] = useState(false);
  const [isShowMess2, setIsShowMess2] = useState(false);
  const [isShowMess3, setIsShowMess3] = useState(false);
  const [isShowMess4, setIsShowMess4] = useState(false);

  useEffect(() => {
    const passwordFirst =
      deviceDetail && deviceDetail.password
        ? deviceDetail.password.slice(0, 1)
        : '';
    const passwordSecond =
      deviceDetail && deviceDetail.password
        ? deviceDetail.password.slice(1)
        : '';
    const passwordEnd =
      passwordFirst &&
      passwordSecond &&
      `${passwordFirst}${passwordSecond.replace(/[a-zA-Z0-9_]/g, '●')}`;
    setValueDefault({
      password:
        deviceDetail && deviceDetail.password ? deviceDetail.password : '',
      passwordHide: passwordEnd || '',
      confirmPassword:
        deviceDetail && deviceDetail.password ? deviceDetail.password : '',
      confirmPasswordHide: passwordEnd || ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceDetail, match.params.id]);

  const messError = {
    down1: '',
    up1: '',
    down2: '',
    up2: '',
    down3: '',
    up3: '',
    down4: '',
    up4: '',
    password: '',
    confirmPassword: '',
    confirmPasswordValidate: ''
  };
  const [textError, setTextError] = useState(messError);
  const clickCancel = () => {
    setPopupCancel({
      isShow: true,
      content: ERROR_MESSAGE.CANCEL_EDIT_DRIVE
    });
  };

  const clickModified = () => {
    setPopupConfirm({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_EDIT_DRIVE
    });
  };

  let frozenType = '';
  if (deviceDetail && deviceDetail.statusDevice === 'frozen') {
    frozenType = '냉동';
  } else {
    frozenType = '냉장';
  }

  const temperatureMin = inputRefDown1.current
    ? inputRefDown1.current.value.replace(/ºC/gi, '')
    : 0;

  const temperatureMax = inputRefUp1.current
    ? inputRefUp1.current.value.replace(/ºC/gi, '')
    : 0;
  const temperatureMinRight = inputRefDown2.current
    ? inputRefDown2.current.value.replace(/ºC/gi, '')
    : 0;
  const temperatureMaxRight = inputRefUp2.current
    ? inputRefUp2.current.value.replace(/ºC/gi, '')
    : 0;
  const setTemperatureMin = inputRefDown3.current
    ? inputRefDown3.current.value.replace(/ºC/gi, '')
    : 0;
  const setTemperatureMax = inputRefUp3.current
    ? inputRefUp3.current.value.replace(/ºC/gi, '')
    : 0;
  const setTemperatureMinRight = inputRefDown4.current
    ? inputRefDown4.current.value.replace(/ºC/gi, '')
    : 0;
  const setTemperatureMaxRight = inputRefUp4.current
    ? inputRefUp4.current.value.replace(/ºC/gi, '')
    : 0;
  /**
   *
   * Add unit ºC
   */
  const formatUnit = unit => {
    const unitTem = unit;
    if (!Number.isNaN(Number.parseFloat(unitTem.value))) {
      unitTem.value = `${parseFloat(unitTem.value)}ºC`;
    } else {
      unitTem.value = '';
    }
  };
  /**
   *
   * Compare row 1 ºC
   */
  const functionCompare22 = temUp2 => {
    if (temUp2) {
      inputRefDown2.current.value = `${parseInt(temUp2, 10) - 3}ºC`;
      if (parseInt(temUp2, 10) <= 18 && parseInt(temUp2, 10) >= -15) {
        setIsShowMess2(false);
      } else {
        setIsShowMess2(true);
      }
    }
  };

  const functionCompare11 = temUp1 => {
    if (temUp1) {
      inputRefDown1.current.value = `${parseInt(temUp1, 10) - 3}ºC`;
      if (parseInt(temUp1, 10) <= 18 && parseInt(temUp1, 10) >= -15) {
        setIsShowMess1(false);
      } else {
        setIsShowMess1(true);
      }
    }
  };
  const functionCompare33 = temUp3 => {
    if (temUp3) {
      inputRefDown3.current.value = `${parseInt(temUp3, 10) - 3}ºC`;
      if (parseInt(temUp3, 10) <= 18 && parseInt(temUp3, 10) >= -15) {
        setIsShowMess3(false);
      } else {
        setIsShowMess3(true);
      }
    }
  };
  const functionCompare44 = temUp4 => {
    if (temUp4) {
      inputRefDown4.current.value = `${parseInt(temUp4, 10) - 3}ºC`;
      if (parseInt(temUp4, 10) <= 18 && parseInt(temUp4, 10) >= -15) {
        setIsShowMess4(false);
      } else {
        setIsShowMess4(true);
      }
    }
  };
  const handleError = (element, name) => {
    if (!element.value) {
      setTextError({
        ...textError,
        [name]: '온도값이 필수값입니다'
      });
    } else {
      setTextError({
        ...textError,
        [name]: ''
      });
    }
  };
  const handleOnBlur = (element, name) => {
    formatUnit(element);
    const temUp1 =
      inputRefUp1.current && inputRefUp1.current.value.replace(/ºC/gi, '');
    const temUp2 =
      inputRefUp2.current && inputRefUp2.current.value.replace(/ºC/gi, '');
    const temUp3 =
      inputRefUp3.current && inputRefUp3.current.value.replace(/ºC/gi, '');
    const temUp4 =
      inputRefUp4.current && inputRefUp4.current.value.replace(/ºC/gi, '');
    functionCompare22(temUp2);
    functionCompare11(temUp1);
    functionCompare33(temUp3);
    functionCompare44(temUp4);
    handleError(element, name);
  };

  /**
   *
   * Remove ºC
   */
  const removeUnit = unit => {
    const unitTem = unit;
    if (unitTem.value.includes('ºC')) {
      unitTem.value = unitTem.value.replace(/ºC/gi, '');
    }
  };
  /**
   * Handle Update device
   */
  const rules = {
    devicePassword: ['required', 'validatePass'],
    confirmPassword: ['required']
  };

  const handleChangeInput = (value, name) => {
    switch (name) {
      case 'password':
        setValueDefault({
          ...valueDefault,
          password: value
        });
        setTextError({
          ...textError,
          devicePassword: ''
        });
        break;
      case 'confirmPassword':
        setValueDefault({
          ...valueDefault,
          confirmPassword: value
        });
        break;
      default:
        break;
    }
  };

  const handleChangeBlur = () => {
    const { password, confirmPassword } = valueDefault;
    if (confirmPassword && password !== confirmPassword) {
      setTextError({
        ...textError,
        confirmPasswordValidate: '※ 입력한 비밀번호가 맞지 않습니다.'
      });
    } else {
      setTextError({
        ...textError,
        confirmPasswordValidate: ''
      });
    }
  };
  const handleChangeOff = name => {
    switch (name) {
      case 'password':
        setTextError({
          ...textError,
          devicePassword: ''
        });
        break;
      case 'confirmPassword':
        setTextError({
          ...textError,
          confirmPassword: '',
          confirmPasswordValidate: ''
        });
        break;
      default:
        break;
    }
  };
  const handleSubmitForm = () => {
    /**
     * Data update
     */
    let validation = {};
    const validateForm = {
      devicePassword: valueDefault.password,
      confirmPassword: valueDefault.confirmPassword
    };
    const dataForm = {
      temperatureMin,
      temperatureMax,
      setTemperatureMin,
      setTemperatureMax,
      temperatureMinRight,
      temperatureMaxRight,
      setTemperatureMinRight,
      setTemperatureMaxRight,
      devicePassword: valueDefault.password
    };

    const { id } = match.params;
    validation = validator(validateForm, rules);
    if (Object.keys(validation).length > 0) {
      setTextError(validation);
      setPopupConfirm({
        ...popupConfirm,
        isShow: false
      });
      return;
    }
    updateDevice(parseInt(id, 10), dataForm);
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };

  const closePopupCancel = () => {
    setPopupCancel({
      ...popupCancel,
      isShow: false
    });
    history.push('/device');
  };

  return (
    <>
      <MainLayout>
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
          <Container fluid className="pb-3 home-main">
            <Row>
              <Col xs={12}>
                <div className="register-device input-block">
                  <div className="wrapper__info bg-white">
                    <TitleHeader title="기기정보" />
                    {deviceDetail ? (
                      <div>
                        <Row className="row__custom">
                          <div className="col-md-3 py-3 d-flex align-items-center d-flex align-items-center">
                            <div className="title">기기모델명</div>
                          </div>
                          <div className="col-md-9 py-2 d-flex align-items-center d-flex align-items-center">
                            <div className="d-flex">
                              <Radio
                                onChange={() => {}}
                                id="single"
                                isChecked={model === 'single'}
                                labelRadio="싱글"
                                name="single"
                                disable
                              />
                              <Radio
                                onChange={() => {}}
                                id="slim"
                                isChecked={model === 'slim'}
                                labelRadio="슬림"
                                name="slim"
                                disable
                              />
                              <Radio
                                onChange={() => {}}
                                id="double"
                                isChecked={model === 'double'}
                                labelRadio="더블"
                                name="double"
                                disable
                              />
                            </div>
                          </div>
                        </Row>

                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">기기 식별 코드</div>
                          </div>
                          <div className="col-md-9 py-2 ">
                            <div className="row">
                              <div className="col-12 col-md-6 ">
                                <Input
                                  onChange={() => {}}
                                  value={
                                    deviceDetail && deviceDetail.deviceCode
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">냉동/냉장</div>
                          </div>
                          <div className="col-md-9 py-2">
                            <div className="row">
                              <div className="col-12 col-md-6 ">
                                <Input
                                  onChange={() => {}}
                                  value={frozenType}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">매장명</div>
                          </div>
                          <div className="col-md-9 py-2">
                            <div className="row">
                              <div className="col-12 col-md-6 ">
                                <Input
                                  onChange={() => {}}
                                  value={deviceDetail && deviceDetail.nameStore}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">매장 전화번호</div>
                          </div>
                          <div className="col-md-9 py-2">
                            <div className="row line-phone">
                              <div className="col-4 col-lg-2 d-line">
                                <Input
                                  onChange={() => {}}
                                  value={
                                    deviceDetail &&
                                    deviceDetail.phone &&
                                    deviceDetail.phone.slice(0, 3)
                                  }
                                  disabled
                                />
                              </div>
                              <div className="col-4 col-lg-2 line-space d-line">
                                <Input
                                  onChange={() => {}}
                                  value={
                                    deviceDetail &&
                                    deviceDetail.phone &&
                                    deviceDetail.phone.slice(3, 7)
                                  }
                                  disabled
                                />
                              </div>
                              <div className="col-4 col-lg-2">
                                <Input
                                  onChange={() => {}}
                                  value={
                                    deviceDetail &&
                                    deviceDetail.phone &&
                                    deviceDetail.phone.slice(7, 11)
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">매장주소</div>
                          </div>
                          <div className="col-md-9 py-2">
                            <div className="row">
                              <div className="col-12 col-sm-7 col-xl-9">
                                <Input
                                  onChange={() => {}}
                                  value={deviceDetail && deviceDetail.address}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-sm-5 col-xl-3 mt-3 mt-sm-0 ád">
                                <Input
                                  onChange={() => {}}
                                  value={deviceDetail && deviceDetail.layer}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">
                              표시온도
                              <span>*</span>
                            </div>
                          </div>
                          <div className="col-md-9 py-2">
                            <Row>
                              <div className="col-12 col-lg-8 input-center">
                                <div className="row">
                                  <div className="col-12 col-sm-6 d-flex ">
                                    <div className="title mr-2 double-label mt-2">
                                      {model === 'double' && <b>좌 &nbsp;</b>}
                                      최저온도
                                    </div>
                                    <Input
                                      onChange={() => {}}
                                      innerRef={inputRefDown1}
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'down1')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureDown1
                                      }
                                      customClassName={
                                        textError.down1 ? 'red' : ''
                                      }
                                      errorMsg={textError.down1}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-12 col-sm-6 d-flex mt-3 mt-md-0">
                                    <div className="title mr-2 double-label mt-2">
                                      최고온도
                                    </div>
                                    <Input
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureUp1
                                      }
                                      onChange={() => {}}
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'up1')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={inputRefUp1}
                                      customClassName={
                                        textError.up1 ? 'red' : ''
                                      }
                                      errorMsg={textError.up1}
                                    />
                                  </div>
                                  {model === 'double' && (
                                    <>
                                      <div className="col-12 col-sm-6 d-flex mt-2">
                                        <div className="title mr-2 double-label mt-2">
                                          <b>우 &nbsp;</b>
                                          최저온도
                                        </div>
                                        <Input
                                          onChange={() => {}}
                                          value={
                                            deviceDetail &&
                                            deviceDetail.temperatureDown2
                                          }
                                          onBlur={e =>
                                            handleOnBlur(
                                              e.currentTarget,
                                              'down2'
                                            )
                                          }
                                          onFocus={e =>
                                            removeUnit(e.currentTarget)
                                          }
                                          innerRef={inputRefDown2}
                                          customClassName={
                                            textError.down2 ? 'red' : ''
                                          }
                                          disabled
                                          errorMsg={textError.down2}
                                        />
                                      </div>
                                      <div className="col-12 col-sm-6 d-flex  mt-2">
                                        <div className="title mr-2 double-label mt-2">
                                          최고온도
                                        </div>
                                        <Input
                                          onChange={() => {}}
                                          value={
                                            deviceDetail &&
                                            deviceDetail.temperatureUp2
                                          }
                                          onBlur={e =>
                                            handleOnBlur(e.currentTarget, 'up2')
                                          }
                                          onFocus={e =>
                                            removeUnit(e.currentTarget)
                                          }
                                          innerRef={inputRefUp2}
                                          customClassName={
                                            textError.up2 ? 'red' : ''
                                          }
                                          errorMsg={textError.up2}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-sm-4 d-flex align-items-center">
                                <div>
                                  <div className="text-error pt-mobile">
                                    ※ 최저온도와 최고온도의 온도차는 3º입니다.
                                  </div>
                                  {(isShowMess1 || isShowMess2) && (
                                    <div className="text-error pt-mobile">
                                      ※ 18ºc내에서 입력해주세요.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">
                              설정온도
                              <span>*</span>
                            </div>
                          </div>
                          <div className="col-md-9 py-2">
                            <Row>
                              <div className="col-12 col-12 col-lg-8 input-center">
                                <div className="row">
                                  <div className="col-12 col-sm-6 d-flex mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      최저온도
                                    </div>
                                    <Input
                                      onChange={() => {}}
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureDown3
                                      }
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'down3')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={inputRefDown3}
                                      customClassName={
                                        textError.down3 ? 'red' : ''
                                      }
                                      errorMsg={textError.down3}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-12 col-sm-6 d-flex  mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      최고온도
                                    </div>
                                    <Input
                                      onChange={() => {}}
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureUp3
                                      }
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'up3')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={inputRefUp3}
                                      customClassName={
                                        textError.up3 ? 'red' : ''
                                      }
                                      errorMsg={textError.up3}
                                    />
                                  </div>

                                  {model === 'double' && (
                                    <>
                                      <div className="col-12 col-sm-6 d-flex mt-2">
                                        <div className="title mr-2 double-label mt-2">
                                          <b>우 &nbsp;</b>
                                          최저온도
                                        </div>
                                        <Input
                                          onChange={() => {}}
                                          innerRef={inputRefDown4}
                                          value={
                                            deviceDetail &&
                                            deviceDetail.temperatureDown4
                                          }
                                          onBlur={e =>
                                            handleOnBlur(
                                              e.currentTarget,
                                              'down4'
                                            )
                                          }
                                          onFocus={e =>
                                            removeUnit(e.currentTarget)
                                          }
                                          customClassName={
                                            textError.down4 ? 'red' : ''
                                          }
                                          errorMsg={textError.down4}
                                          disabled
                                        />
                                      </div>
                                      <div className="col-12 col-sm-6 d-flex mt-2">
                                        <div className="title mr-2 double-label mt-2">
                                          최고온도
                                        </div>
                                        <Input
                                          onChange={() => {}}
                                          onBlur={e =>
                                            handleOnBlur(e.currentTarget, 'up4')
                                          }
                                          innerRef={inputRefUp4}
                                          value={
                                            deviceDetail &&
                                            deviceDetail.temperatureUp4
                                          }
                                          onFocus={e =>
                                            removeUnit(e.currentTarget)
                                          }
                                          customClassName={
                                            textError.up4 ? 'red' : ''
                                          }
                                          errorMsg={textError.up4}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-sm-4 d-flex align-items-center">
                                <div>
                                  <div className="text-error pt-mobile">
                                    ※ 최저온도와 최고온도의 온도차는 3º입니다.
                                  </div>

                                  {(isShowMess3 || isShowMess4) && (
                                    <div className="text-error pt-mobile">
                                      ※ 18ºc내에서 입력해주세요.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">상태</div>
                          </div>
                          <div className="col-md-6 py-2">
                            <Input
                              disabled
                              value={deviceDetail && deviceDetail.status}
                            />
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">
                              키오스크 비밀번호
                              <span>*</span>
                            </div>
                          </div>
                          <div className="col-md-6 py-2">
                            <InputChange
                              onChange={e => handleChangeInput(e, 'password')}
                              type="password"
                              value={valueDefault && valueDefault.password}
                              onBlur={() => handleChangeBlur()}
                              errorMsg={textError.devicePassword}
                              customClassName="typePassword"
                            />
                          </div>
                        </Row>
                        <Row className="row__custom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">
                              키오스크 비밀번호 확인
                              <span>*</span>
                            </div>
                          </div>
                          <div className="col-md-6 py-2">
                            <InputChange
                              onChange={e =>
                                handleChangeInput(e, 'confirmPassword')
                              }
                              type="password"
                              value={
                                valueDefault && valueDefault.confirmPassword
                              }
                              customClassName="typePassword"
                              onBlur={() => handleChangeBlur()}
                              errorMsg={textError.confirmPassword}
                              onFocus={() => handleChangeOff('confirmPassword')}
                            />
                          </div>
                          {textError.confirmPasswordValidate && (
                            <div className="col-md-3 py-2 d-flex align-items-center">
                              <p className="text-error mb-0">
                                {textError.confirmPasswordValidate}
                              </p>
                            </div>
                          )}
                        </Row>
                        <Row className="row__custom border-bottom">
                          <div className="col-md-3 py-2 d-flex align-items-center">
                            <div className="title">기타 특이사항</div>
                          </div>
                          <div className="col-md-9 py-2">
                            <textarea
                              className="form-control"
                              value={deviceDetail && deviceDetail.other}
                              rows="4"
                              disabled
                            />
                          </div>
                        </Row>
                        <Row className="py-3">
                          <Col className="d-flex justify-content-end button-custom">
                            <PrimaryButton
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                clickCancel();
                              }}
                            >
                              취소
                            </PrimaryButton>
                            <PrimaryButton
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                clickModified();
                              }}
                              disabled={
                                isShowMess1 ||
                                isShowMess2 ||
                                isShowMess3 ||
                                isShowMess4 ||
                                textError.confirmPasswordValidate
                              }
                            >
                              수정
                            </PrimaryButton>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <div className="text-center my-5">
                        데이터가 존재하지 않습니다.
                      </div>
                    )}
                  </div>

                  <h5 className="title-custom">유지보수이력</h5>
                  {/* <MaintenanceHistory /> */}
                  <div className="register-device__maintenance-history w-100">
                    <Row>
                      <Col xs={12}>
                        <TableData
                          tableHeads={headMaintenanceHistory}
                          tableBody={maintenances}
                          isShowId
                        />
                      </Col>
                    </Row>
                  </div>
                  <ModalPrimary
                    title="알림"
                    content={popupConfirm.content}
                    isOpen={popupConfirm.isShow}
                    isShowCloseIco
                    textBtnRight="확인"
                    isShowTowBtn
                    handleCloseIco={() => {
                      setPopupConfirm({ isShow: false });
                    }}
                    handleSubmit={() => {
                      setPopupConfirm({ isShow: false });
                    }}
                    handleClose={() => {
                      handleSubmitForm();
                    }}
                    classNameBtnRight="blue"
                    textBtnLeft="취소"
                  />
                  <ModalPrimary
                    title="알림"
                    content={popupCancel.content}
                    isOpen={popupCancel.isShow}
                    isShowCloseIco
                    textBtnRight="확인"
                    isShowTowBtn
                    handleCloseIco={() => {
                      setPopupCancel({ isShow: false });
                    }}
                    handleSubmit={() => {
                      setPopupCancel({ isShow: false });
                    }}
                    handleClose={() => {
                      closePopupCancel();
                    }}
                    classNameBtnRight="blue"
                    textBtnLeft="취소"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        )}
        {totalRows > 10 && (
          <div sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={0}
              containerClassName="pagination"
              disabledClassName="disabled"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              marginPagesDisplayed={1}
              nextLinkClassName="page-link"
            />
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default memo<Props>(DeviceDetail);
