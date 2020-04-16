// @flow
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { validator } from 'utils/Validators';
import { Row, Container } from 'react-bootstrap';
import Input from 'components/Input';
import InputChange from 'components/Input/InputChange';
import ImageViewer from '../../../components/ImageViewer';
import appConfig from '../../../config/appConfig';
import MainLayout from '../../../layout/MainLayout';
import Radio from '../../../components/Radio';
import Button from '../../../components/Button';
import SelectCustom from '../../../components/Select/SelectCustom';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import ModalPopUpImage from './popupImage';
import { isNumberKey, isOnPasteNumber } from '../../../constants/validate';

import { listRanking } from '../../../constants/listKey';

type Props = {
  history: {
    push: Function
  },
  dataImage: Object,
  registerImageProduct: Function,
  updateImageProduct: Function,
  imageList: Array<{}>,
  getImageCategory: Function,
  imageListAuthor: Array<{}>,
  getImageCategoryAuthor: Function,
  type: string,
  isProcessing: boolean,
  categoriesOptions: Array<{}>,
  errorMess: string,
  addProductSeft: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
export const RegisterProduct = ({
  getImageCategory,
  imageList,
  type,
  history,
  isProcessing,
  categoriesOptions,
  errorMess,
  addProductSeft,
  registerImageProduct,
  dataImage,
  isOpenNotify,
  notifyAccountDenied,
  imageListAuthor,
  getImageCategoryAuthor,
  updateImageProduct
}: Props) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [statusTax, setStatusTax] = useState('tax');
  const [statusLivestock, setStatusLivestock] = useState('livestock');
  const [imagesPopup, setImagesPopup] = useState({
    isShow: false
  });
  const [popupConfirmCancel, setPopupConfirmCancel] = useState({
    isShow: false
  });
  const [imageID, setImageID] = useState(null);
  const [isChecks, setIsChecks] = useState(false);
  const [errorServerRes, setErrorServerRes] = useState('');
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);
  const [inputFileActive, setInputFileActive] = useState('');
  const productCodeRef = useRef(null);
  const productImages = useRef(null);
  const productNameRef = useRef('');
  const productNameBuyRef = useRef('');
  const [productOriginRef, setProductOriginRef] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [imageChoose, setImageChoose] = useState('');
  const [error, setError] = useState({});
  const [imgPreview, setImgPreview] = useState('');

  const [category] = useState({
    value: 9999,
    label: '자체상품'
  });
  const [redirect, setRedirect] = useState(false);
  const [nameProduct, setNameProduct] = useState(null);
  const [Ranking, setListRanking] = useState(null);
  const [popupConfirmAdd, setPopupConfirmAdd] = useState({
    isShow: false
  });
  const [codeProductValue, setCodeProductValue] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [priceCost, setPriceCost] = useState('');
  const [mass, setMass] = useState('');
  const [imageName, setNameImage] = useState('');
  const [popupRegisterSuccess, setPopupRegisterSuccess] = useState({
    isShow: false,
    content: ''
  });
  const [imageUpload, setImageUpload] = useState('');
  const handleOnchangeTax = e => {
    const { name } = e.target;
    setStatusTax(name);
  };

  const clickCancel = () => {
    setPopupConfirmCancel({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_CANNEL
    });
  };

  const handleSubmitFormData = () => {
    const productName =
      productNameRef && productNameRef.current
        ? productNameRef.current.value
        : '';
    const dataSubmit = {
      categoryId: category && category.value ? category.value : '',
      code: codeProductValue && codeProductValue.trim(),
      imagePath: dataImage && dataImage.image,
      name: productName && productName.trim(),
      tax: statusTax,
      origin: 'NA',
      productOrigin: productOriginRef && productOriginRef.trim(),
      productLevel: Ranking && Ranking.value,
      type: statusLivestock,
      manufacturer: manufacturer && manufacturer.trim(),
      mass: Number.parseFloat(mass && mass.replace(/,/gi, '')),
      priceCost: Number.parseFloat(priceCost && priceCost.replace(/,/gi, '')),
      imageName: imageName && imageName.trim()
    };
    addProductSeft(dataSubmit);
  };

  const handleSubmitFromRegister = () => {
    const productName =
      productNameRef && productNameRef.current
        ? productNameRef.current.value
        : '';

    const dataSubmit = {
      categoryId: category && category.value ? category.value : '',
      code: codeProductValue && codeProductValue.trim(),
      imagePath,
      name: productName && productName.trim(),
      tax: statusTax,
      origin: 'NA',
      productOrigin: productOriginRef && productOriginRef.trim(),
      productLevel: Ranking && Ranking.value,
      type: statusLivestock,
      manufacturer: manufacturer && manufacturer.trim(),
      mass: Number.parseFloat(mass && mass.replace(/,/gi, '')),
      priceCost: Number.parseFloat(priceCost && priceCost.replace(/,/gi, '')),
      imageName: imageName && imageName.trim()
    };
    addProductSeft(dataSubmit);
  };

  useEffect(() => {
    switch (type) {
      case 'ADD_PRODUCT_SEFT_FAILED':
        setErrorServerRes(errorMess);
        break;
      case 'ADD_PRODUCT_SEFT_SUCCESS':
        setPopupRegisterSuccess({
          content: ERROR_MESSAGE.REGISTER_SUCCESS,
          isShow: true
        });
        break;
      case 'UPDATE_IMAGE_PRODUCT_SUCCESS':
        handleSubmitFromRegister();
        break;
      case 'UPDATE_IMAGE_PRODUCT_FAILED':
        setErrorServerRes(errorMess && errorMess);
        break;
      case 'REGISTER_IMAGE_PRODUCT_SUCCESS':
        handleSubmitFormData();
        break;
      case 'REGISTER_IMAGE_PRODUCT_FAILED':
        setErrorServerRes(errorMess);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, errorMess]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleChangeInput = (value, name) => {
    switch (name) {
      case 'codeProduct':
        setCodeProductValue(value);
        break;
      case 'productOrigin':
        setProductOriginRef(value);
        break;
      case 'manufacturer':
        setManufacturer(value);
        break;
      case 'priceCost':
        setPriceCost(value);
        break;
      case 'mass':
        setMass(value);
        break;
      case 'imageName':
        setNameImage(value);
        break;
      default:
        break;
    }
  };
  const formatUnit = (elm, unit, name) => {
    const item = elm;
    let number = '';
    switch (name) {
      default:
        number = item && item.value;
        break;
    }
    item.value = number + unit;
    switch (name) {
      case 'priceCost':
        setPriceCost(item.value);
        break;
      case 'mass':
        setMass(item.value);
        break;
      default:
        break;
    }
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

  const handleChange = (option, name) => {
    switch (name) {
      case 'name':
        setNameProduct(option);
        break;
      case 'level':
        setListRanking(option);
        break;
      default:
    }
  };

  const handleSelectImage = item => {
    setIsOpenPopupImage(false);
    switch (inputFileActive) {
      case 'imagePath':
        if (item) {
          setImagePath(item && item.img);
          setNameImage(item && item.imageName);
          setImageID(item && item.id);
        }
        break;
      default:
        break;
    }
  };
  // Upload image product choose local
  const handleSubmitImageChoose = () => {
    const formData = new window.FormData();
    if (imageUpload) {
      if (imageUpload.size > 4000000) {
        setPopupConfirmAdd({
          ...popupConfirmAdd,
          isShow: true,
          content: '이 파일은 너무 큽니다'
        });
      } else {
        formData.append('image', imageUpload);
        formData.append('categoryId', 9999);
        formData.append('imageName', imageName);
        formData.append('self', true);
        registerImageProduct(formData);
      }
    }
  };

  const rules = {
    categoryId: [''],
    code: ['code', 'required', 'productCode'],
    name: ['name', 'required'],
    productLevel: ['productLevel', 'required'],
    origin: [],
    imagePath: ['required'],
    productOrigin: ['required'],
    tax: ['tax', 'required'],
    type: ['required'],
    manufacturer: ['required'],
    mass: ['required', 'notNumber', 'priceNumberOtherThan0', 'maxLimit'],
    priceCost: ['required', 'notNumber', 'priceNumberOtherThan0', 'maxLimit'],
    imageName: ['required']
  };

  const handleSubmitForm = () => {
    let validation = {};
    const productName =
      productNameRef && productNameRef.current
        ? productNameRef.current.value
        : '';

    const dataSubmit = {
      categoryId: category && category.value ? category.value : '',
      code: codeProductValue && codeProductValue.trim(),
      imagePath,
      name: productName && productName.trim(),
      tax: statusTax,
      origin: 'NA',
      productOrigin: productOriginRef && productOriginRef.trim(),
      productLevel: Ranking && Ranking.value,
      type: statusLivestock,
      manufacturer: manufacturer && manufacturer.trim(),
      mass: Number.parseFloat(mass && mass.replace(/,/gi, '')),
      priceCost: Number.parseFloat(priceCost && priceCost.replace(/,/gi, '')),
      imageName: imageName && imageName.trim()
    };
    validation = validator(dataSubmit, rules);
    if (Object.keys(validation).length > 0) {
      setError(validation);
      return;
    }
    if (!isChecks) {
      handleSubmitImageChoose();
    } else {
      updateImageProduct({ id: parseInt(imageID, 10), name: imageName });
    }

    setPopupConfirmCancel({
      ...popupConfirmCancel,
      isShow: false
    });
    setImagesPopup({
      ...imagesPopup,
      isShow: false
    });
  };
  const handlePreviewImage = url => {
    setIsPreviewImage(true);
    setImgPreview(url);
  };

  const closePopupRegisterSuccess = () => {
    setPopupRegisterSuccess({
      ...popupRegisterSuccess,
      isShow: false
    });
    setRedirect(true);
  };
  const handleChangeFile = e => {
    setIsChecks(false);
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size > 4000000) {
        setPopupConfirmAdd({
          ...popupConfirmAdd,
          isShow: true,
          content: '이 파일은 너무 큽니다'
        });
        return;
      }
      setImagePath(e.target.files[0].name);
      setImageChoose(
        (window.URL || window.webkitURL).createObjectURL(e.target.files[0])
      );
      setImageUpload(e.target.files[0]);
    }
  };

  return (
    <MainLayout>
      {redirect && <Redirect to="/merchandise/manual" />}
      <Container
        fluid
        className="py-3 register-page border-wrapper register-product-stock"
      >
        <div className="title__header">
          <h1>자체상품등록</h1>
        </div>
        <div className="wrapper__info mb-5">
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">카테고리</div>
            </div>
            <div className="col-md-4 py-2 ">
              <SelectCustom
                listItem={[]}
                option={category}
                onChange={e => handleChange(e, 'category')}
                noOptionsMessage={() => '옵션 없음'}
                placeholder="카테고리 선택"
                errorMsg={error.categoryId}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex align-items-center py-2 border-left">
              <div className="title d-flex">
                상품명
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-4 py-2">
              <Input
                value={nameProduct}
                type="text"
                onChange={e => handleChangeInput(e, 'productName')}
                innerRef={productNameRef}
                placeholder="상품명/브랜드를 입력해주세요."
                errorMsg={error.name}
              />
            </div>
          </Row>
        </div>
        <div className="wrapper__info">
          <div className="card-header edit-store">상품정보입력</div>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                상품코드
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-10 py-2 input-50 wrapper-100 input-block">
              <InputChange
                value={codeProductValue}
                type="text"
                onChange={e => handleChangeInput(e, 'codeProduct')}
                innerRef={productCodeRef}
                placeholder="상품코드를 입력하세요."
                errorMsg={error.code}
                maxLength="45"
              />
            </div>
          </Row>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                매입처 상호
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-10 py-2 input-50 wrapper-100 input-block">
              <InputChange
                value={manufacturer}
                type="text"
                onChange={e => handleChangeInput(e, 'manufacturer')}
                innerRef={productNameBuyRef}
                placeholder="매입처 상호를 입력하세요."
                errorMsg={error.manufacturer}
              />
            </div>
          </Row>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-3">
              <div className="title d-flex">
                과세/비과세
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-10 py-3 input-50 wrapper-radio d-flex align-items-center">
              <Radio
                onChange={event => handleOnchangeTax(event)}
                id="tax"
                isChecked={statusTax === 'tax'}
                labelRadio="과세"
                name="tax"
              />
              <Radio
                onChange={event => handleOnchangeTax(event)}
                id="free"
                isChecked={statusTax === 'free'}
                labelRadio="비과세"
                name="free"
              />
            </div>
          </Row>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                원산지
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-10 py-2 input-75  custom-flex d-flex align-items-center">
              <InputChange
                type="text"
                placeholder="원산지를 입력하세요."
                value={productOriginRef}
                onChange={e => handleChangeInput(e, 'productOrigin')}
                maxLength="40"
                errorMsg={error.productOrigin}
              />
            </div>
          </Row>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                등급
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-4 py-2">
              <SelectCustom
                listItem={listRanking}
                option={Ranking}
                onChange={e => handleChange(e, 'level')}
                noOptionsMessage={() => '옵션 없음'}
                errorMsg={error.productLevel}
                placeholder="등급 선택"
              />
            </div>
          </Row>
          <div className="wrapper__info mb-5">
            <Row className="row__custom">
              <div className="col-xl-4 d-flex align-items-center">
                <div className="row w-130">
                  <div className="col-md-2 col-lg-2 col-xl-6 d-flex align-items-center py-2">
                    <div className="title">
                      상품 이미지
                      <span className="text-red">*</span>
                    </div>
                  </div>
                  <div className="col-md-5 col-lg-10 col-xl-6 py-2 pl-lg-2 border-left">
                    <InputChange
                      value={imageName}
                      type="text"
                      onChange={e => handleChangeInput(e, 'imageName')}
                      placeholder="이미지명을 입력해주세요."
                      errorMsg={error.imageName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-8 d-flex align-items-center">
                <div className="row w-130">
                  <div className="col-md-2 col-lg-2 d-flex align-items-center p-2">
                    <div className="title d-flex">
                      이미지 파일
                      <span className="text-red">*</span>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-10 py-2 border-left">
                    <div className="wrapper-input-res wrapper-input-group-btn d-flex align-items-start input-block">
                      <InputChange
                        type="text"
                        value={imagePath || ''}
                        onChange={() => {}}
                        readOnly
                        innerRef={productImages}
                        errorMsg={error.imagePath}
                        placeholder="이미지를 선택해주세요."
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {
                          setIsOpenPopupImage(true);
                          setInputFileActive('imagePath');
                          setIsChecks(true);
                        }}
                      >
                        이미지선택
                      </Button>
                      <div className="group-btn-file imageLocal">
                        <input
                          type="file"
                          className="custom-file-input"
                          lang="ko"
                          onChange={e => handleChangeFile(e)}
                          accept=".png, .jpg, .jpeg, .gif"
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          onClick={() => {}}
                        >
                          직접 등록
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        onClick={() =>
                          handlePreviewImage(
                            isChecks
                              ? imagePath && appConfig.IMG_URL + imagePath
                              : imageChoose
                          )
                        }
                        disabled={!imagePath}
                      >
                        미리보기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
        <div className="wrapper__info mb-3 mt-3 bg-table">
          <div className="card-header edit-store">매입 상품 정보</div>
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                규격 (g)
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-4 py-2 ">
              <InputChange
                type="text"
                placeholder="g"
                value={mass}
                onChange={e => {
                  handleChangeInput(e, 'mass');
                }}
                onKeyPress={e => isNumberKey(e)}
                onPaste={e => isOnPasteNumber(e)}
                onBlur={e => handleOnBlur(e.currentTarget, 'g', 'mass')}
                onFocus={e => removeUnit(e.currentTarget, /g|,/gi, 'g')}
                inputMode="numeric"
                pattern="[0-9]*"
                errorMsg={error && error.mass}
                customClassName={`text-right ${
                  error && error.mass ? 'red' : ''
                } `}
              />
            </div>
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">
                상품매입단가(원)
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-4 py-2">
              <Input
                type="text"
                placeholder="원"
                value={priceCost}
                onChange={e => {
                  handleChangeInput(e, 'priceCost');
                }}
                onKeyPress={e => isNumberKey(e)}
                onPaste={e => isOnPasteNumber(e)}
                onBlur={e => handleOnBlur(e.currentTarget, '원', 'priceCost')}
                onFocus={e => removeUnit(e.currentTarget, /원|,/gi, '원')}
                inputMode="numeric"
                pattern="[0-9]*"
                errorMsg={error && error.priceCost}
                customClassName={`text-right ${
                  error && error.priceCost ? 'red' : ''
                } `}
              />
            </div>
          </Row>
        </div>
        <div className="wrapper__info mb-3 mt-5 bg-table border-top">
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title d-flex">
                기본정보선택
                <span className="text-red">*</span>
              </div>
            </div>
            <div className="col-md-10 py-2">
              <div className="wrapper-input-res d-flex align-items-center">
                <div className="wrapper-radio w-30 d-flex align-items-center py-2">
                  <Radio
                    id="livestock"
                    labelRadio="축산물"
                    name="livestock"
                    onChange={() => {
                      setStatusLivestock('livestock');
                    }}
                    isChecked={statusLivestock === 'livestock'}
                  />
                  <Radio
                    labelRadio="가공품"
                    name="product"
                    onChange={() => {
                      setStatusLivestock('product');
                    }}
                    id="product"
                    isChecked={statusLivestock === 'product'}
                  />
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div className="wrapper-btn d-flex justify-content-end mt-3">
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
            onClick={() => handleSubmitForm()}
          >
            등록
          </Button>
        </div>
        <ModalPrimary
          title="알림"
          content={popupConfirmCancel.content}
          handleCloseIco={() => {
            setPopupConfirmCancel({ isShow: false });
          }}
          isOpen={popupConfirmCancel.isShow}
          isShowCloseIco
          handleClose={() => {
            history.push(`/merchandise/manual`);
          }}
        />

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
            history.push(`/merchandise/manual`);
          }}
          classNameBtnRight="blue"
          textBtnLeft="취소"
        />

        <ModalPrimary
          title="이미지 선택"
          isConfirm
          isShowFooter={false}
          content={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <ModalPopUpImage
              getImageCategory={getImageCategory}
              categoryId={category && category.value}
              imageList={imageList}
              getImageCategoryAuthor={getImageCategoryAuthor}
              imageListAuthor={imageListAuthor}
              handleSelectImage={handleSelectImage}
              isProcessing={isProcessing}
              categoriesOptions={categoriesOptions}
            />
          }
          isOpen={isOpenPopupImage}
          handleClose={() => {
            setIsOpenPopupImage(false);
          }}
          customClass="popup-img-category-button-none"
        />
        <ModalPrimary
          title="등록 오류"
          isConfirm
          content={errorServerRes}
          size="md"
          animation={false}
          isOpen={errorServerRes !== ''}
          handleClose={() => {
            setErrorServerRes('');
          }}
        />
        <ImageViewer
          handleClose={() => {
            setIsPreviewImage(false);
          }}
          isVisible={isPreviewImage}
          imageSrc={imgPreview}
        />
        {/* /Check validate */}
        <ModalPrimary
          title="알림"
          content={popupConfirmAdd.content}
          isOpen={popupConfirmAdd.isShow}
          handleClose={() => {
            setPopupConfirmAdd({
              isShow: false
            });
          }}
        />
        <ModalPrimary
          title="알림"
          content={popupRegisterSuccess.content}
          isOpen={popupRegisterSuccess.isShow}
          handleClose={() => {
            closePopupRegisterSuccess();
          }}
        />
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(RegisterProduct);
