// @flow
// libs
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';

import Immutable from 'seamless-immutable';

import { Row, Container, Image } from 'react-bootstrap';
import Input from 'components/Input/InputChange';
import { Redirect } from 'react-router-dom';
import listRank from 'constants/listRank';
import { validator } from 'utils/Validators';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../../../layout/MainLayout';
import appConfig from '../../../config/appConfig';
import Radio from '../../../components/Radio';
import Button from '../../../components/Button';
import TitleHeader from '../../../components/TitleHeader';
import SelectCustom from '../../../components/Select/SelectCustom';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import { isNumberKey, isOnPasteNumber } from '../../../constants/validate';
import { Types } from '../../redux';

registerLocale('ko', ko);

type Props = {
  history: {
    push: Function
  },
  getProductCodeByCategory: Function,
  userInfo: Object,
  getCategories: Function,
  categories: Array<{}>,
  registerProduct: Function,
  statusRepose: Object,
  type: string,
  getProductSelecting: Function,
  productSelecting: Object,
  productName: Array<{
    id: number,
    value: string,
    label: string
  }>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
export const ProductRegister = ({
  userInfo,
  getCategories,
  categories,
  getProductCodeByCategory,
  registerProduct,
  statusRepose,
  type,
  getProductSelecting,
  productSelecting,
  productName,
  history,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const dataSubmit = {
    companyName: (userInfo && userInfo.companyName) || '',
    tax: 'tax',
    origin: 'domestic',
    categoryNo: '',
    validityYear: '',
    validityMonth: '',
    validityDay: '',
    category: '',
    nameProduct: '',
    productNameId: '',
    ranking: '',
    price: '',
    livestock: '',
    commodityPrice: '',
    mass: '',
    manufacturer: '',
    priceCost: '',
    productCode: '',
    countryOfOrigin: '',
    urlImageProduct: '',
    urlImageProduct1: '',
    urlImageProduct2: '',
    urlImageProduct3: '',
    urlImageProduct4: '',
    urlImageProduct5: ''
  };
  const [textError, setTextError] = useState({});
  const [dataObj, setDataObj] = useState(dataSubmit);
  const [isCategory, setIsCategory] = useState(false);
  const [isName, setIsName] = useState(false);
  const [categoryOption, setCategoryOption] = useState(null);
  const [productNameOption, setProductNameOption] = useState(null);
  const [expirationDateTime, setExpirationDateTime] = useState(null);
  const [manufactureDateTime, setManufactureDateTime] = useState(null);

  const [popupRegisterFailed, setPopupRegisterFailed] = useState({
    isShow: false,
    content: ''
  });
  const [imagesReview, setImagesReview] = useState({
    isShow: false,
    content: ''
  });
  const [popupConfirmCancel, setPopupConfirmCancel] = useState({
    isShow: false
  });
  const [popupRegisterSuccess, setPopupRegisterSuccess] = useState({
    isShow: false,
    content: ''
  });
  const [redirect, setRedirect] = useState(false);

  // check status response
  useEffect(() => {
    switch (type) {
      case Types.REGISTER_PRODUCT_SUCCESS:
        if (statusRepose) {
          setPopupRegisterSuccess({
            content: ERROR_MESSAGE.REGISTER_SUCCESS,
            isShow: true
          });
        } else {
          setPopupRegisterFailed({
            content: ERROR_MESSAGE.REGISTER_FAILED,
            isShow: true
          });
        }
        break;
      case Types.REGISTER_PRODUCT_FAILED:
        setPopupRegisterFailed({
          content: ERROR_MESSAGE.REGISTER_FAILED,
          isShow: true
        });
        break;
      default:
        break;
    }
  }, [type, statusRepose]);

  useEffect(() => {
    setDataObj({
      ...dataObj,
      categoryNo: productSelecting && productSelecting.categoryNo,
      productCode: productSelecting && productSelecting.productCode,
      tax: productSelecting && productSelecting.tax,
      origin: productSelecting && productSelecting.origin,
      ranking: productSelecting && productSelecting.ranking,
      livestock: productSelecting && productSelecting.livestock,
      manufacturer: productSelecting && productSelecting.manufacturer,
      mass: productSelecting && productSelecting.mass,
      priceCost: productSelecting && productSelecting.priceCost,
      countryOfOrigin: productSelecting && productSelecting.countryOfOrigin,
      urlImageProduct: productSelecting && productSelecting.urlImageProduct,
      urlImageProduct1: productSelecting && productSelecting.urlImageProduct1,
      urlImageProduct2: productSelecting && productSelecting.urlImageProduct2,
      urlImageProduct3: productSelecting && productSelecting.urlImageProduct3,
      urlImageProduct4: productSelecting && productSelecting.urlImageProduct4,
      urlImageProduct5: productSelecting && productSelecting.urlImageProduct5
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCategory,
    isName,
    productSelecting && productSelecting.tax,
    productSelecting && productSelecting.productCode,
    productSelecting && productSelecting.ranking,
    productSelecting && productSelecting.origin,
    productSelecting && productSelecting.urlImageProduct,
    productSelecting && productSelecting.urlImageProduct1,
    productSelecting && productSelecting.urlImageProduct2,
    productSelecting && productSelecting.urlImageProduct3,
    productSelecting && productSelecting.urlImageProduct4,
    productSelecting && productSelecting.urlImageProduct5,
    productSelecting && productSelecting.livestock,
    productSelecting && productSelecting.categoryNo,
    productSelecting && productSelecting.manufacturer,
    productSelecting && productSelecting.mass,
    productSelecting && productSelecting.priceCost,
    productSelecting && productSelecting.countryOfOrigin
  ]);

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

  const handleSubmit = () => {
    let validation = {};
    const expirationDate =
      expirationDateTime && moment(expirationDateTime).format('YYYY-MM-DD');

    const dataValidate = {
      validityDate: expirationDate,
      commodityPrice: Number.parseFloat(
        dataObj.commodityPrice &&
          dataObj.commodityPrice.toString().replace(/,/gi, '')
      ),
      manufactureDate:
        manufactureDateTime && moment(manufactureDateTime).format('YYYY-MM-DD')
    };
    const validateManufactureDate = {
      validityDate: expirationDate,
      commodityPrice: Number.parseFloat(
        dataObj.commodityPrice &&
          dataObj.commodityPrice.toString().replace(/,/gi, '')
      )
    };

    const dataSubmitForm = {
      expirationDate,
      mass: dataObj.mass
        ? Number.parseFloat(
            dataObj.mass && dataObj.mass.toString().replace(/,/gi, '')
          )
        : 0,
      price: Number.parseInt(
        dataObj.commodityPrice &&
          dataObj.commodityPrice.toString().replace(/,/gi, ''),
        10
      ),
      priceCost: dataObj.priceCost
        ? Number.parseFloat(
            dataObj.priceCost && dataObj.priceCost.toString().replace(/,/gi, '')
          )
        : 0,
      productId: productSelecting && productSelecting.id,
      productStatus: '',
      manufacturer: dataObj.manufacturer && dataObj.manufacturer.trim(),
      manufactureDate: manufactureDateTime
        ? moment(manufactureDateTime).format('YYYY-MM-DD')
        : null,
      productType: dataObj && dataObj.livestock
    };

    if (dataObj && dataObj.livestock !== 'livestock') {
      validation = validator(dataValidate, rules);
    } else {
      validation = validator(validateManufactureDate, ruleManufactureDate);
    }

    if (Object.keys(validation).length > 0) {
      setTextError(validation);
      return;
    }
    const manufactureDateValidate = moment(manufactureDateTime).format(
      'YYYY-MM-DD'
    );
    const expirationDateTimeValidate = moment(expirationDate).format(
      'YYYY-MM-DD'
    );
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
    // eslint-disable-next-line no-use-before-define
    registerProduct(dataSubmitForm);
  };
  const closePopupRegisterFailed = () => {
    setPopupRegisterFailed({
      ...popupRegisterFailed,
      isShow: false
    });
  };
  const closePopupRegisterSuccess = () => {
    setPopupRegisterSuccess({
      ...popupRegisterSuccess,
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
    setPopupConfirmCancel({
      ...popupConfirmCancel,
      isShow: false
    });
    setImagesReview({
      ...imagesReview,
      isShow: false,
      content: ''
    });
  };

  const clickCancel = () => {
    setPopupConfirmCancel({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_CANNEL
    });
  };
  const clickImagePreview = dataImg => {
    setImagesReview({
      isShow: true,
      content: dataImg
    });
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

  const handleChange = (option, name) => {
    // label
    const { value } = option;
    setTextError({
      ...textError,
      [name]: ''
    });
    switch (name) {
      case 'nameProduct':
        setProductNameOption(option);
        getProductSelecting(value);
        setIsName(true);
        break;
      case 'category':
        setCategoryOption(option);
        setProductNameOption(null);
        getProductCodeByCategory(value);
        setIsCategory(true);
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
      case 'manufacturer':
        setTextError({
          ...textError,
          manufacturer: ''
        });
        break;
      case 'commodityPrice':
        setTextError({
          ...textError,
          commodityPrice: ''
        });
        break;
      default:
        setTextError({
          ...textError,
          [name]: '',
          validityDateTime: ''
        });

        break;
    }
  };
  useEffect(() => {
    if (parseInt(dataObj.commodityPrice, 10) > 0) {
      setTextError({
        ...textError,
        commodityPrice: ''
      });
    }
  }, [dataObj.commodityPrice]);
  // Get list Category
  const listCategories =
    categories === undefined || categories === null
      ? []
      : Immutable.asMutable(categories);

  // Get list Product Name

  const listProductName =
    productName === undefined || productName === null
      ? []
      : Immutable.asMutable(productName);
  return (
    <MainLayout>
      {redirect && <Redirect to="/merchandise" />}
      <Container fluid className="py-3 resgiter-product border-wrapper">
        <TitleHeader title="입고상품등록" />
        <div className="wrapper__info mb-5">
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">매장명</div>
            </div>
            <div className="col-md-10 py-2 ">
              <Input
                type="text"
                value={dataObj && dataObj.companyName}
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
                listItem={listCategories}
                option={categoryOption}
                placeholder="카테고리 선택"
                onChange={e => handleChange(e, 'category')}
                noOptionsMessage={() => '옵션 없음'}
                errorMsg={textError && textError.category}
                customClassName={`text-right ${
                  textError && textError.category ? 'red' : ''
                } `}
              />
            </div>
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">상품명</div>
            </div>
            <div className="col-md-4 py-2">
              <SelectCustom
                listItem={listProductName}
                option={productNameOption}
                placeholder="상품명 선택"
                onChange={e => handleChange(e, 'nameProduct')}
                noOptionsMessage={() => '옵션 없음'}
                disabled={categoryOption === null}
              />
            </div>
          </Row>
        </div>
        {isCategory && isName && productNameOption !== null && (
          // eslint-disable-next-line react/jsx-fragments
          <React.Fragment>
            <div className="wrapper__info">
              <div className="card-header edit-store">상품 기본 정보</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품코드</div>
                </div>
                <div className="col-md-10 py-2 input-50 wrapper-100">
                  <Input
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
                  <Input
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
                <div className="col-md-7 py-2 input-75  custom-flex  mr-custom custom-repon">
                  <Input
                    type="text"
                    placeholder="원산지를 입력하세요."
                    disabled
                    value={productSelecting && productSelecting.countryOfOrigin}
                    onChange={e => handleChangeInput(e, 'countryOfOrigin')}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">등급</div>
                </div>
                <div className="col-md-4 py-2 select-disable">
                  <SelectCustom
                    listItem={listRank}
                    option={{ value: dataObj.ranking, label: dataObj.ranking }}
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
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct}
                      disabled
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
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct1}
                      disabled
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct1 &&
                            appConfig.IMG_URL + dataObj.urlImageProduct1
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct1}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct2}
                      disabled
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct2 &&
                            appConfig.IMG_URL + dataObj.urlImageProduct2
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct2}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct3}
                      disabled
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct3 &&
                            appConfig.IMG_URL + dataObj.urlImageProduct3
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct3}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct4}
                      disabled
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct4 &&
                            appConfig.IMG_URL + dataObj.urlImageProduct4
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct4}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res d-flex align-items-center px-3">
                    <Input
                      type="text"
                      value={dataObj && dataObj.urlImageProduct5}
                      disabled
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        clickImagePreview(
                          dataObj &&
                            dataObj.urlImageProduct5 &&
                            appConfig.IMG_URL + dataObj.urlImageProduct5
                        );
                      }}
                      disabled={dataObj && !dataObj.urlImageProduct5}
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
                  <Input
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
                  <Input
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
              <Row className="row__custom ">
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
                  <Input
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
                          maxDate={new Date()}
                          locale="ko"
                          dateFormat="yyyy-MM-dd"
                          disabledKeyboardNavigation
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.preventDefault()}
                          onKeyDown={e => e.preventDefault()}
                          isClearable
                          placeholderText="날짜를 선택해주세요. "
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
                  <div className="title d-flex">
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
            <div className="wrapper-btn d-flex justify-content-end mt-3 mb-5">
              <Button
                type="button"
                variant="secondary btn-custom "
                onClick={() => {
                  clickCancel();
                }}
              >
                취소
              </Button>
              <Button
                type="button"
                variant="secondary btn-custom ml-3"
                onClick={handleSubmit}
              >
                등록
              </Button>
            </div>
          </React.Fragment>
        )}
        <ModalPrimary
          title="알림"
          content={popupConfirmCancel.content}
          isOpen={popupConfirmCancel.isShow}
          isShowCloseIco
          textBtnRight="확인"
          isShowTowBtn
          handleCloseIco={() => {
            setPopupConfirmCancel({ isShow: false });
          }}
          handleSubmit={() => {
            setPopupConfirmCancel({ isShow: false });
          }}
          handleClose={() => {
            handleClosePopup();
            history.push('/merchandise');
          }}
          classNameBtnRight="blue"
          textBtnLeft="취소"
        />
        {/* Show Mess register Failed */}
        <ModalPrimary
          title="알림"
          content={popupRegisterFailed.content}
          isOpen={popupRegisterFailed.isShow}
          handleClose={() => {
            closePopupRegisterFailed();
          }}
        />
        {/* Show Mess register Success */}
        <ModalPrimary
          title="알림"
          content={popupRegisterSuccess.content}
          isOpen={popupRegisterSuccess.isShow}
          handleClose={() => {
            closePopupRegisterSuccess();
          }}
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
        />
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(ProductRegister);
