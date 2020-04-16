// @flow
// libs
import React, { memo, useState, useEffect } from 'react';

import { Row, Container, Image } from 'react-bootstrap';
import InputChange from 'components/Input/InputChange';
import { Redirect, withRouter } from 'react-router-dom';
import listRank from 'constants/listRank';
import { validator } from 'utils/Validators';
// import listWeight from 'constants/listWeight';
import Loading from 'components/Loading';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../../../layout/MainLayout';
import Radio from '../../../components/Radio';
import appConfig from '../../../config/appConfig';
import Button from '../../../components/Button';
import SelectDropdown from '../../../components/Select';
import TitleHeader from '../../../components/TitleHeader';
import SelectCustom from '../../../components/Select/SelectCustom';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import { isNumberKey, isOnPasteNumber } from '../../../constants/validate';
import { Types } from '../../redux';

registerLocale('ko', ko);

type Props = {
  history: {
    location: Object,
    push: Function
  },
  match: {
    params: {
      id: any
    }
  },
  // deleteProduct: Function,
  statusRepose: Object,
  type: string,
  merchandiseDetail: Object,
  getMerchandiseDetail: Function,
  updateProduct: Function,
  statusDetail: boolean,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
export const EditProduct = ({
  statusRepose,
  type,
  match,
  // deleteProduct,
  getMerchandiseDetail,
  merchandiseDetail,
  updateProduct,
  statusDetail,
  isProcessing,
  history,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const dataSubmit = {
    storeName: '',
    categoryNo: '',
    tax: 'tax',
    origin: 'domestic',
    quantity: '',
    validityDay: '',
    categoryName: '',
    nameProduct: '',
    productNameId: '',
    ranking: '',
    status: '',
    valueWeight: '',
    mass: '',
    priceCost: '',
    manufacturer: '',
    commodityPrice: '',
    codeDevice: '',
    productCode: '',
    location: '',
    insertedAmount: 0,
    saleAmount: 0,
    countryOfOrigin: '',
    urlImageProduct: '',
    urlImageLanding1: '',
    urlImageLanding2: '',
    urlImageLanding3: '',
    urlImageLanding4: '',
    urlImageLanding5: ''
  };
  const [textError, setTextError] = useState({
    validityDay: '',
    categoryName: '',
    nameProduct: '',
    mass: '',
    priceCost: '',
    commodityPrice: ''
  });
  const [dataObj, setDataObj] = useState(dataSubmit);
  const [expirationDateTime, setExpirationDateTime] = useState(null);
  // price gram option
  const [manufactureDateTime, setManufactureDateTime] = useState(null);

  const [popupUpdateFailed, setPopupUpdateFailed] = useState({
    isShow: false,
    content: ''
  });
  const [imagesReview, setImagesReview] = useState({
    isShow: false,
    content: ''
  });
  const [popupModify, setPopupModify] = useState({
    isShow: false
  });
  const [popupUpdateSuccess, setPopupUpdateSuccess] = useState({
    isShow: false,
    content: ''
  });

  const [redirect, setRedirect] = useState(false);
  const [popupCancel, setPopupCancel] = useState({
    isShow: false,
    content: ''
  });
  const handleViewList = () => {
    setRedirect(true);
  };
  useEffect(() => {
    setDataObj(merchandiseDetail);
    setExpirationDateTime(
      merchandiseDetail &&
        merchandiseDetail.expirationDate &&
        new Date(merchandiseDetail.expirationDate)
    );
    setManufactureDateTime(
      merchandiseDetail &&
        merchandiseDetail.manufactureDate &&
        new Date(merchandiseDetail.manufactureDate)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchandiseDetail, merchandiseDetail.commodityPrice]);
  useEffect(() => {
    const { id } = match.params;
    const productStockId =
      history.location.state && history.location.state.productStockId;
    getMerchandiseDetail({ id, productStockId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // check status response
  useEffect(() => {
    switch (type) {
      case Types.UPDATE_PRODUCT_SUCCESS:
        setPopupUpdateSuccess({
          content: ERROR_MESSAGE.UPDATE_SUCCESS,
          isShow: true
        });
        break;
      // case Types.DELETE_PRODUCT_SUCCESS:
      //   if (statusRepose) {
      //     setPopupUpdateSuccess({
      //       content: ERROR_MESSAGE.DELETE_PRODUCT_SUCCESS,
      //       isShow: true
      //     });
      //   } else {
      //     setPopupUpdateFailed({
      //       content: ERROR_MESSAGE.DELETE_FAILED,
      //       isShow: true
      //     });
      //   }
      //   break;
      case Types.UPDATE_PRODUCT_FAILED:
        setPopupUpdateFailed({
          content: ERROR_MESSAGE.UPDATE_FAILED,
          isShow: true
        });
        break;
      default:
        break;
    }
  }, [type, statusRepose]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSubmitUpdate = () => {
    // eslint-disable-next-line no-use-before-define
    setPopupModify({
      isShow: true,
      content: ERROR_MESSAGE.UPDATE_MODIFY
    });
  };

  const closePopupUpdateFailed = () => {
    setPopupUpdateFailed({
      ...popupUpdateFailed,
      isShow: false
    });
  };

  const closePopupUpdateSuccess = () => {
    setPopupUpdateSuccess({
      ...popupUpdateSuccess,
      isShow: false
    });
    setRedirect(true);
  };
  /**
   *
   * Add unit ºC
   */
  const formatUnit = (elm, unit, name) => {
    const item = elm;
    let number = '';
    switch (name) {
      default:
        number = item && item.value;
        break;
    }
    item.value = number + unit;
    setDataObj({
      ...dataObj,
      [name]: item.value
    });
  };

  const handleOnBlur = (elm, unit, name) => {
    formatUnit(elm, unit, name);
  };

  const removeUnit = (elm, replace, unit) => {
    const item = elm;
    const number = item.value.replace(replace, '');
    if (item.value.includes(unit)) {
      item.value = number;
    }
  };

  const handleClosePopup = () => {
    setImagesReview({
      ...imagesReview,
      isShow: false,
      content: ''
    });
  };

  const clickImagePreview = dataImg => {
    setImagesReview({
      isShow: true,
      content: dataImg
    });
  };

  const handleChange = (option, name) => {
    const { value, label } = option;
    setTextError({
      ...textError,
      [name]: ''
    });
    switch (name) {
      case 'nameProduct':
        setDataObj({
          ...dataObj,
          nameProduct: label
        });
        break;
      case 'categoryName':
        setDataObj({
          ...dataObj,
          categoryName: label
        });
        break;
      default:
        setDataObj({
          ...dataObj,
          [name]: value
        });
    }
  };

  const handleChangeInput = (value, name) => {
    setDataObj({
      ...dataObj,
      [name]: value
    });
    switch (name) {
      case 'valueWeight':
        setTextError({
          ...textError,
          mass: ''
        });
        break;
      case 'manufacturer':
        setTextError({
          ...textError,
          manufacturer: ''
        });
        break;
      default:
        setTextError({
          ...textError,
          [name]: ''
        });
        break;
    }
  };

  // Get list Product Name

  /**
   * Check validate
   */
  const rules = {
    validityDate: ['required'],
    commodityPrice: [
      'required',
      'notNumber',
      'priceNumberOtherThan0',
      'maxLimit'
    ],
    manufactureDate: ['required']
  };
  const ruleManufactureDate = {
    validityDate: ['required'],
    commodityPrice: [
      'required',
      'notNumber',
      'priceNumberOtherThan0',
      'maxLimit'
    ]
  };

  const handleSubmitForm = () => {
    let validation = {};
    const { id } = match.params;
    const validateManufactureDate = {
      validityDate: moment(expirationDateTime).format('YYYY-MM-DD'),
      commodityPrice: Number.parseFloat(
        dataObj &&
          dataObj.commodityPrice &&
          dataObj.commodityPrice.replace(/,/gi, '')
      )
    };
    const dataValidateType = {
      validityDate: moment(expirationDateTime).format('YYYY-MM-DD'),
      commodityPrice: Number.parseFloat(
        dataObj.commodityPrice &&
          dataObj.commodityPrice.toString().replace(/,/gi, '')
      ),
      manufactureDate:
        manufactureDateTime && moment(manufactureDateTime).format('YYYY-MM-DD')
    };
    const objSubmit = {
      expirationDate: moment(expirationDateTime).format('YYYY-MM-DD'),
      mass: Number.parseFloat(
        dataObj && dataObj.mass && dataObj.mass.toString().replace(/,/gi, '')
      ),
      price:
        dataObj && dataObj.commodityPrice
          ? Number.parseInt(
              dataObj &&
                dataObj.commodityPrice &&
                dataObj.commodityPrice.replace(/,/gi, ''),
              10
            )
          : null,
      priceCost:
        dataObj && dataObj.priceCost
          ? Number.parseFloat(
              dataObj &&
                dataObj.priceCost &&
                dataObj.priceCost.replace(/,/gi, '')
            )
          : 0,
      productId: parseInt(id, 10),
      productStatus: '',
      manufacturer: dataObj && dataObj.manufacturer,
      manufactureDate: manufactureDateTime
        ? moment(manufactureDateTime).format('YYYY-MM-DD')
        : null
    };

    if (dataObj && dataObj.livestock !== 'livestock') {
      validation = validator(dataValidateType, rules);
    } else {
      validation = validator(validateManufactureDate, ruleManufactureDate);
    }
    const manufactureDateValidate = moment(manufactureDateTime).format(
      'YYYY-MM-DD'
    );
    const expirationDateTimeValidate = moment(expirationDateTime).format(
      'YYYY-MM-DD'
    );

    if (Object.keys(validation).length > 0) {
      setTextError(validation);
      return;
    }
    if (manufactureDateValidate) {
      if (
        moment(manufactureDateValidate).isAfter(
          moment(expirationDateTimeValidate)
        )
      ) {
        setTextError({
          ...textError,
          validityDate: ERROR_MESSAGE.VALIDATE_TIME_SEARCH
        });
        return;
      }
    }
    setTextError({});
    updateProduct(parseInt(id, 10), objSubmit);
  };

  const onChangeExpirationDateTime = date => {
    setExpirationDateTime(date);
    setTextError({
      ...textError,
      validityDate: ''
    });
  };
  const onChangeManufactureDateTime = date => {
    setManufactureDateTime(date);
    setTextError({
      ...textError,
      manufactureDate: ''
    });
  };
  const handleSubmitModifyPopup = () => {
    setPopupModify({
      ...popupModify,
      isShow: false
    });
    handleSubmitForm();
  };
  const handleSubmitDelete = () => {
    setPopupCancel({
      isShow: true,
      content: ERROR_MESSAGE.TEXT_POPUP_CANCEL
    });
  };

  useEffect(() => {
    if (parseInt(dataObj.commodityPrice, 10) > 0) {
      setTextError({
        ...textError,
        commodityPrice: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataObj.commodityPrice]);

  const statusBtn = dataObj && dataObj.status;
  const checkStatus = () => {
    if (statusBtn === 1) {
      return <div className="btn btn-success">진열대기</div>;
    }
    if (statusBtn === 2) {
      return <div className="btn btn-dark">진열완료</div>;
    }
    if (statusBtn === 3) {
      return <div className="btn btn-primary">판매완료</div>;
    }
    if (statusBtn === 4) {
      return <div className="btn btn-danger">판매취소</div>;
    }
    return statusBtn;
  };
  return (
    <MainLayout>
      {redirect && <Redirect to="/merchandise" />}
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
        <>
          <Container fluid className="py-3 resgiter-product border-wrapper">
            <TitleHeader title="입고상품정보" />
            {!statusDetail && (
              <div className="text-center my-5">
                데이터가 존재하지 않습니다.
              </div>
            )}
            <div className="wrapp-btn text-right mb-3">
              <div className="btn-status">{checkStatus()}</div>
            </div>
            <div className="wrapper__info mb-5">
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">매장명</div>
                </div>
                <div className="col-md-4 py-2 border-right">
                  <InputChange
                    type="text"
                    value={dataObj && dataObj.storeName}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">기기식별코드</div>
                </div>
                <div className="col-md-4 py-2">
                  <InputChange
                    type="text"
                    value={dataObj && dataObj.codeDevice}
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">카테고리</div>
                </div>
                <div className="col-md-4 py-2 border-right">
                  <SelectCustom
                    listItem={[]}
                    disabled
                    option={dataObj && dataObj.categoryName}
                    placeholder="카테고리 선택"
                    onChange={e => handleChange(e, 'categoryName')}
                    noOptionsMessage={() => '옵션 없음'}
                    errorMsg={textError && textError.categoryName}
                    customClassName={`text-right ${
                      textError && textError.categoryName ? 'red' : ''
                    } `}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품명</div>
                </div>
                <div className="col-md-4 py-2">
                  <SelectCustom
                    listItem={[]}
                    disabled
                    option={dataObj && dataObj.nameProduct}
                    placeholder="상품명 선택"
                    onChange={e => handleChange(e, 'nameProduct')}
                    noOptionsMessage={() => '옵션 없음'}
                    errorMsg={textError && textError.nameProduct}
                    customClassName={`text-right ${
                      textError && textError.categoryName ? 'red' : ''
                    } `}
                  />
                </div>
              </Row>
            </div>

            <div className="wrapper__info">
              <div className="card-header edit-store">상품 기본 정보</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품코드</div>
                </div>
                <div className="col-md-10 py-2 input-50 wrapper-100">
                  <InputChange
                    type="text"
                    value={dataObj && dataObj.productCode}
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">매입처 상호</div>
                </div>
                <div className="col-md-10 py-2 input-50 wrapper-100">
                  <InputChange
                    type="text"
                    value={dataObj && dataObj.manufacturer}
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-3">
                  <div className="title">과세/비과세</div>
                </div>
                <div className="col-md-10 py-3 input-50 wrapper-radio d-flex align-items-center">
                  <Radio
                    labelRadio="과세"
                    name="tax"
                    disabled
                    onChange={() => {
                      setDataObj({
                        ...dataObj,
                        tax: 'tax'
                      });
                    }}
                    id="tax"
                    isChecked={dataObj && dataObj.tax === 'tax'}
                  />
                  <Radio
                    labelRadio="비과세"
                    name="tax"
                    onChange={() => {
                      setDataObj({
                        ...dataObj,
                        tax: 'free'
                      });
                    }}
                    id="free"
                    isChecked={dataObj && dataObj.tax === 'free'}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">원산지</div>
                </div>
                <div className="col-md-10 py-2 input-75  custom-flex  mr-custom custom-repon">
                  <InputChange
                    type="text"
                    placeholder="원산지를 입력하세요."
                    disabled
                    value={dataObj && dataObj.countryOfOrigin}
                    onChange={e => handleChangeInput(e, 'countryOfOrigin')}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">등급</div>
                </div>
                <div className="col-md-4 py-2 select-disable">
                  <SelectDropdown
                    listItem={listRank}
                    value={dataObj && dataObj.ranking}
                    onChange={e => handleChange(e, 'ranking')}
                    noOptionsMessage={() => '옵션 없음'}
                    disabled
                    placeholder="등급 선택"
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품 이미지</div>
                </div>
                <div className="col-md-10 py-2">
                  <div className="wrapper-input-res d-flex align-items-center">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageProduct}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct &&
                            appConfig.IMG_URL + dataObj.urlImageProduct
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct}
                    >
                      미리보기
                    </Button>
                  </div>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">랜딩 페이지 이미지</div>
                </div>
                <div className="col-md-10 input-50 px-0 bd-column">
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageLanding1}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj.urlImageLanding1 &&
                            appConfig.IMG_URL + dataObj.urlImageLanding1
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageLanding1}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageLanding2}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj.urlImageLanding2 &&
                            appConfig.IMG_URL + dataObj.urlImageLanding2
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageLanding2}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageLanding3}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj.urlImageLanding3 &&
                            appConfig.IMG_URL + dataObj.urlImageLanding3
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageLanding3}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageLanding4}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj.urlImageLanding4 &&
                            appConfig.IMG_URL + dataObj.urlImageLanding4
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageLanding4}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.urlImageLanding5}
                      disabled
                      onChange={() => {}}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj.urlImageLanding5 &&
                            appConfig.IMG_URL + dataObj.urlImageLanding5
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageLanding5}
                    >
                      미리보기
                    </Button>
                  </div>
                </div>
              </Row>
            </div>
            <div className="wrapper__info mb-3 mt-3 bg-table">
              <div className="card-header edit-store">매입 상품 정보</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">규격 (g)</div>
                </div>
                <div className="col-md-4 py-2 ">
                  <InputChange
                    type="text"
                    placeholder="g"
                    value={dataObj && dataObj.mass}
                    onChange={() => {}}
                    customClassName="text-right"
                    disabled
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품매입단가(원)</div>
                </div>
                <div className="col-md-4 py-2">
                  <InputChange
                    type="text"
                    placeholder="원"
                    value={dataObj && dataObj.priceCost}
                    onChange={() => {}}
                    customClassName="text-right"
                    disabled
                  />
                </div>
              </Row>
            </div>
            <div className="wrapper__info mb-3 mt-3 bg-table border-top">
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">기본정보선택</div>
                </div>
                <div className="col-md-10 py-2">
                  <div className="wrapper-input-res d-flex align-items-center">
                    <div className="wrapper-radio w-30 d-flex align-items-center py-2">
                      <Radio
                        id="livestock"
                        labelRadio="축산물"
                        name="livestock"
                        onChange={() => {
                          setDataObj({
                            ...dataObj,
                            livestock: 'livestock'
                          });
                        }}
                        isChecked={dataObj && dataObj.livestock === 'livestock'}
                        disabled
                      />
                      <Radio
                        labelRadio="가공품"
                        name="product"
                        onChange={() => {
                          setDataObj({
                            ...dataObj,
                            livestock: 'product'
                          });
                        }}
                        id="product"
                        isChecked={dataObj && dataObj.livestock === 'product'}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Row>
            </div>
            <div className="wrapper__info mb-3 bg-table">
              <div className="card-header edit-store">판매 상품정보</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">
                    상품판매가(원)
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-10 py-2">
                  <InputChange
                    type="text"
                    placeholder="원"
                    onChange={e => {
                      handleChangeInput(e, 'commodityPrice');
                    }}
                    onKeyPress={e => isNumberKey(e)}
                    onPaste={e => isOnPasteNumber(e)}
                    onBlur={e =>
                      handleOnBlur(e.currentTarget, '원', 'commodityPrice')
                    }
                    onFocus={e => removeUnit(e.currentTarget, /원|,/gi, '원')}
                    inputMode="numeric"
                    value={dataObj && dataObj.commodityPrice}
                    pattern="[0-9]*"
                    errorMsg={textError && textError.commodityPrice}
                    customClassName={`text-right ${
                      textError && textError.commodityPrice ? 'red' : ''
                    } `}
                    disabled={statusBtn !== 1}
                  />
                </div>
              </Row>
            </div>
            {dataObj && dataObj.livestock !== 'livestock' && (
              <div className="wrapper__info mb-3 bg-table bt-gray">
                <Row className="row__custom">
                  <div className="col-md-2 d-flex align-items-center py-2">
                    <div className="title">
                      제조일자
                      <span className="text-red">*</span>
                    </div>
                  </div>
                  <div className="col-md-10 py-2">
                    <div className="select-date">
                      <div className="start-date">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <DatePicker
                          selected={manufactureDateTime}
                          onChange={date => onChangeManufactureDateTime(date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          startDay={new Date()}
                          locale="ko"
                          maxDate={new Date()}
                          dateFormat="yyyy-MM-dd"
                          disabledKeyboardNavigation
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.preventDefault()}
                          onKeyDown={e => e.preventDefault()}
                          isClearable
                          placeholderText="날짜를 선택해주세요."
                          disabled={statusBtn !== 1}
                        />
                      </div>
                    </div>
                    {textError && textError.manufactureDate && (
                      <p className="error-msg mb-0 mt-2">
                        {textError && textError.manufactureDate}
                      </p>
                    )}
                  </div>
                </Row>
              </div>
            )}
            <div className="wrapper__info mb-3 bg-table bt-gray">
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">
                    유효기간
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-10 py-2">
                  <div className="select-date">
                    <div className="start-date">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <DatePicker
                        selected={expirationDateTime}
                        onChange={date => onChangeExpirationDateTime(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        startDay={new Date()}
                        minDate={new Date(moment(new Date()).add(1, 'days'))}
                        locale="ko"
                        dateFormat="yyyy-MM-dd"
                        disabledKeyboardNavigation
                        onChangeRaw={e => e.preventDefault()}
                        onFocus={e => e.preventDefault()}
                        onKeyDown={e => e.preventDefault()}
                        isClearable
                        placeholderText="날짜를 선택해주세요. "
                        disabled={statusBtn !== 1}
                      />
                    </div>
                  </div>
                  {textError && textError.validityDate && (
                    <p className="error-msg mb-0 mt-2">
                      {textError && textError.validityDate}
                    </p>
                  )}
                </div>
              </Row>
            </div>
            {(statusBtn === 2 || statusBtn === 3 || statusBtn === 4) && (
              <div className="wrapper__info mb-5 mt-5 bg-table bt-gray">
                <Row className="row__custom">
                  <div className="col-md-2 d-flex align-items-center py-2">
                    <div className="title">입고 수량</div>
                  </div>
                  <div className="col-md-4 py-2 ">
                    <InputChange
                      type="number"
                      value={dataObj && dataObj.insertedAmount}
                      placeholder="원"
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-center py-2">
                    <div className="title">상품위치</div>
                  </div>
                  <div className="col-md-4 py-2">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.location}
                      placeholder="원"
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-2 d-flex align-items-center py-2">
                    <div className="title">판매 수량</div>
                  </div>
                  <div className="col-md-4 py-2 ">
                    <InputChange
                      type="text"
                      value={dataObj && dataObj.saleAmount}
                      placeholder="원"
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-center py-2">
                    <div className="title"> </div>
                  </div>
                  <div className="col-md-4 py-2"> </div>
                </Row>
              </div>
            )}
            <div className="wrapper-btn d-flex justify-content-end mt-3 mb-5">
              {(statusBtn === 2 || statusBtn === 3 || statusBtn === 4) && (
                <Button
                  type="button"
                  variant="secondary btn-custom ml-3"
                  onClick={() => {
                    handleViewList();
                  }}
                >
                  목록
                </Button>
              )}
              {statusBtn === 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary btn-custom mr-3"
                    onClick={handleSubmitDelete}
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    variant="secondary btn-custom "
                    onClick={handleSubmitUpdate}
                  >
                    수정
                  </Button>
                </>
              )}
            </div>
            <ModalPrimary
              title="알림"
              content={popupModify.content}
              isOpen={popupModify.isShow}
              isShowCloseIco
              textBtnRight="확인"
              isShowTowBtn
              handleCloseIco={() => {
                setPopupModify(false);
              }}
              handleSubmit={() => {
                setPopupModify(false);
              }}
              handleClose={() => {
                handleSubmitModifyPopup();
              }}
              classNameBtnRight="blue"
              textBtnLeft="취소"
            />
            {/* Show Mess Update Failed */}
            <ModalPrimary
              title="알림"
              content={popupUpdateFailed.content}
              isOpen={popupUpdateFailed.isShow}
              handleClose={() => {
                closePopupUpdateFailed();
              }}
              isShowTowBtn={false}
              textBtnLeft="확인"
            />
            {/* Show Mess confirm Delete Failed */}
            <ModalPrimary
              title="알림"
              content={popupCancel.content}
              isOpen={popupCancel.isShow}
              handleCloseIco={() => {
                setPopupCancel(false);
              }}
              textBtnRight="확인"
              isShowTowBtn
              isShowCloseIco
              handleSubmit={() => {
                setPopupCancel(false);
              }}
              handleClose={() => {
                history.push('/merchandise');
              }}
              classNameBtnRight="blue"
              textBtnLeft="취소"
            />

            {/* Show Mess register Success */}
            <ModalPrimary
              title="알림"
              content={popupUpdateSuccess.content}
              isOpen={popupUpdateSuccess.isShow}
              handleClose={() => {
                closePopupUpdateSuccess();
              }}
              isShowTowBtn={false}
              textBtnLeft="확인"
            />
            <ModalPrimary
              title="이미지 미리보기"
              customClass="mh-500"
              content={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Image
                  src={imagesReview && imagesReview.content}
                  width="100%"
                  height="auto"
                />
              }
              size="md"
              animation={false}
              isOpen={imagesReview.isShow}
              handleClose={() => {
                handleClosePopup();
              }}
              isShowTowBtn={false}
              textBtnLeft="확인"
            />
          </Container>
        </>
      )}
    </MainLayout>
  );
};

export default withRouter(memo<Props>(EditProduct));
