// @flow
// libs
import React, { memo, useState } from 'react';
// import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Radio from 'components/Radio';
import Input from 'components/Input/InputChange';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listCategory: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listDeviceCode: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKey: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const MerchandiseSearch = ({
  listPage,
  listCategory,
  listDeviceCode,
  listKey,
  handleSubmitSearch = () => {}
}: Props) => {
  const initSearch = {
    numberRows: 10,
    category: null,
    codeDevice: null,
    listKey: '',
    productName: '',
    productStatus: null
  };
  const [numberRowOption, setNumberRowOption] = useState({
    label: 10,
    value: 10
  });
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [categorySelected, setCategorySelected] = useState({
    value: null,
    label: '전체'
  });

  const [valueDefault, setValueDefault] = useState();
  const [deviceSelected, setDeviceSelected] = useState({
    value: null,
    label: '전체'
  });

  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const [keySearch, setKeySearch] = useState({
    value: 0,
    label: '선택'
  });
  const handleSelectChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'numberRows':
        setNumberRowOption(option);
        break;
      case 'category':
        setCategorySelected(option);
        break;
      case 'deviceCode':
        setDeviceSelected(option);
        break;
      case 'listKey':
        setKeySearch(option);
        setValueDefault('');
        break;
      default:
        break;
    }
    setObjectSearch({
      ...objectSearch,
      [name]: value
    });
  };
  // const inputSearchRef = useRef('');

  const formatSearchKey = () => {
    let searchKey = 'all';
    switch (keySearch.value) {
      case 0:
        searchKey = 'all';
        break;
      case 1:
        searchKey = 'productName';
        break;
      case 2:
        searchKey = 'productCode';
        break;
      // case 3:
      //   searchKey = 'validity';
      //   break;
      // case 4:
      //   searchKey = 'location';
      //   break;
      // case 5:
      //   searchKey = 'quantity';
      //   break;
      default:
        break;
    }
    return searchKey;
  };
  const submitSearch = () => {
    const key = formatSearchKey();
    const dataSearch = {
      numberRows: numberRowOption.value,
      categoryId:
        categorySelected.value === '전체' ? null : categorySelected.value,
      codeDevice: deviceSelected.value,
      productStatus: objectSearch.productStatus,
      [key]: valueDefault
    };
    handleSubmitSearch(dataSearch);
  };

  return (
    <div className="form-search form-search-merchandise">
      <div className="form-search__left">
        <div className="form-search__pages w-220">
          <p className="form-search__title">항목 보기</p>
          <SelectCustom
            listItem={listPage}
            option={numberRowOption}
            onChange={e => handleSelectChange(e, 'numberRows')}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="선택"
          />
        </div>

        <div className="group-deviceCode">
          <div className="form-search__deviceCode ml-0">
            <p className="form-search__title">카테고리</p>
            <SelectCustom
              listItem={listCategory}
              option={categorySelected}
              onChange={e => handleSelectChange(e, 'category')}
              noOptionsMessage={() => '옵션 없음'}
            />
          </div>
          <div className="form-search__deviceCode ml-0">
            <p className="form-search__title">기기식별코드</p>
            <SelectCustom
              listItem={listDeviceCode}
              option={deviceSelected}
              onChange={e => handleSelectChange(e, 'deviceCode')}
              noOptionsMessage={() => '옵션 없음'}
            />
          </div>
        </div>
        <div className="form-search__classification">
          <p className="form-search__title">상품상태</p>
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                productStatus: null
              });
            }}
            isChecked={objectSearch && objectSearch.productStatus === null}
            id="all"
            labelRadio="전체"
            name="all"
          />
          <Radio
            id="WAIT"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                productStatus: 'WAIT'
              });
            }}
            isChecked={objectSearch && objectSearch.productStatus === 'WAIT'}
            labelRadio="진열대기"
            name="WAIT"
          />
          <Radio
            id="DP-COMPLETE"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                productStatus: 'DP-COMPLETE'
              });
            }}
            isChecked={
              objectSearch && objectSearch.productStatus === 'DP-COMPLETE'
            }
            labelRadio="진열완료"
            name="DP-COMPLETE"
          />
          <Radio
            id="CANCEL"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                productStatus: 'CANCEL'
              });
            }}
            isChecked={objectSearch && objectSearch.productStatus === 'CANCEL'}
            labelRadio="판매취소"
            name="CANCEL"
          />
          <Radio
            id="COMPLETE"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                productStatus: 'COMPLETE'
              });
            }}
            isChecked={
              objectSearch && objectSearch.productStatus === 'COMPLETE'
            }
            labelRadio="판매완료"
            name="COMPLETE"
          />
        </div>
        <div className="form-search__detail w-13rem">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKey}
            option={keySearch}
            onChange={e => handleSelectChange(e, 'listKey')}
            noOptionsMessage={() => '옵션 없음'}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            onChange={e => handleChangeInput(e)}
            value={valueDefault}
          />
        </div>
      </div>
      <div className="form-search__right">
        <Button type="submit" variant="secondary" onClick={submitSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};
export default memo<Props>(MerchandiseSearch);
