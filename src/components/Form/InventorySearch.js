// @flow
// libs
import React, { memo, useState } from 'react';
import SelectCustom from 'components/Select/SelectCustom';
import Radio from 'components/Radio';
import Button from 'components/Button';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listDeviceCode: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const InventorySearch = ({
  listPage,
  listDeviceCode,
  handleSubmitSearch
}: Props) => {
  const [numberRowOption, setNumberRowOption] = useState({
    label: 10,
    value: 10
  });
  const [deviceCode, setDeviceCode] = useState({
    value: null,
    label: '전체'
  });
  const initSearch = {
    deviceId: null,
    deviceType: null,
    frozenType: null,
    pageIndex: 0,
    pageNumber: 10
  };
  const [objectSearch, setObjectSearch] = useState(initSearch);

  const handleSelectChange = (option, name) => {
    const { value } = option;
    setObjectSearch({
      ...objectSearch,
      [name]: value
    });
    switch (name) {
      case 'pageNumber':
        setNumberRowOption(option);
        break;
      case 'deviceId':
        setDeviceCode(option);
        break;
      default:
        break;
    }
  };

  const submitSearch = () => {
    handleSubmitSearch(objectSearch);
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectCustom
            listItem={listPage}
            option={numberRowOption}
            onChange={e => handleSelectChange(e, 'pageNumber')}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="선택"
          />
        </div>

        <div className="form-search__name-store">
          <div className="form-search__deviceCode mb-0">
            <p className="form-search__title">기기식별코드</p>
            <SelectCustom
              listItem={listDeviceCode}
              option={deviceCode}
              onChange={e => handleSelectChange(e, 'deviceId')}
              noOptionsMessage={() => '옵션 없음'}
            />
          </div>
        </div>
        <div className="group-radio-btn">
          <div className="form-search__classification">
            <p className="form-search__title">기기모델명</p>
            <Radio
              id="all"
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: null
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === null}
              labelRadio="전체"
              name="all"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'single'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'single'}
              id="single"
              labelRadio="싱글"
              name="single"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'slim'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'slim'}
              id="slim"
              labelRadio="슬림"
              name="slim"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'double'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'double'}
              id="double"
              labelRadio="더블"
              name="double"
            />
          </div>
          <div className="radio-flex-right">
            <div className="form-search__classification">
              <p className="form-search__title">냉동/냉장</p>
              <Radio
                id="frozenAll"
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    frozenType: null
                  });
                }}
                isChecked={objectSearch && objectSearch.frozenType === null}
                labelRadio="전체"
                name="frozenAll"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    frozenType: 'frozen'
                  });
                }}
                isChecked={objectSearch && objectSearch.frozenType === 'frozen'}
                id="frozen"
                labelRadio="냉동"
                name="frozen"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    frozenType: 'cold'
                  });
                }}
                isChecked={objectSearch && objectSearch.frozenType === 'cold'}
                id="cold"
                labelRadio="냉장"
                name="cold"
              />
            </div>
          </div>
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

export default memo<Props>(InventorySearch);
