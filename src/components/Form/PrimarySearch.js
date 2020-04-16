// @flow
// libs
import React, { memo, useState } from 'react';
import SelectDropdown from 'components/Select';
import Radio from 'components/Radio';
import Button from 'components/Button';
import SelectCustom from 'components/Select/SelectCustom';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  deviceCodes: Array<{
    id: number,
    value: any,
    label: string
  }>,
  handleSubmitSearch: Function
};

export const PrimarySearch = ({
  listPage,
  handleSubmitSearch = () => {},
  deviceCodes
}: Props) => {
  const initSearch = {
    pageSize: 10,
    deviceType: '',
    frozenType: '',
    deviceStatus: '',
    deviceId: ''
  };

  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [selectedDeviceCode, setSelectedDeviceCode] = useState({
    value: '',
    label: '전체'
  });
  const handleSelectChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'deviceId':
        setSelectedDeviceCode(option);
        break;
      default:
        break;
    }
    setObjectSearch({
      ...objectSearch,
      [name]: value
    });
  };

  const submitSearch = () => {
    handleSubmitSearch(objectSearch);
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={objectSearch.pageSize}
            onChange={e => handleSelectChange(e, 'pageSize')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="group-radio-btn">
          <div className="form-search__classification">
            <p className="form-search__title">기기모델명</p>
            <Radio
              id="all"
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: ''
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === ''}
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
                    frozenType: ''
                  });
                }}
                isChecked={objectSearch && objectSearch.frozenType === ''}
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
        <div className="form-search__classification">
          <p className="form-search__title">기기상태</p>
          <Radio
            id="instrumentAll"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: ''
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === ''}
            labelRadio="전체"
            name="instrumentAll"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: 'use'
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === 'use'}
            id="use"
            labelRadio="사용중"
            name="inuse"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: 'stop'
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === 'stop'}
            id="stop"
            labelRadio="사용해지"
            name="used"
          />
        </div>
        <div className="form-search__detail input-width w-13rem w-select-custom">
          <p className="form-search__title">기기식별코드</p>
          <SelectCustom
            listItem={deviceCodes}
            option={selectedDeviceCode}
            onChange={e => handleSelectChange(e, 'deviceId')}
            noOptionsMessage={() => '옵션 없음'}
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

PrimarySearch.defaultProp = {
  handleSubmitSearch: () => {}
};
export default memo<Props>(PrimarySearch);
