// @flow
// libs
import React, { useState } from 'react';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';

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
  handleChange: Function
};
export const ThirdSearch = ({
  listPage,
  listDeviceCode,
  handleChange = () => {}
}: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [phoneRef, setPhoneRef] = useState('');
  const [deviceCodeOption, setDeviceCodeOption] = useState({
    id: null,
    value: null,
    label: '전체'
  });
  const handleChangeInput = value => {
    setPhoneRef(value);
  };
  const submitSearch = () => {
    const objSearch = {
      pageSize,
      deviceId: deviceCodeOption && deviceCodeOption.value,
      pageIndex: 0
    };
    handleChange({
      ...objSearch,
      phoneNumber: phoneRef ? phoneRef.replace(/-/gi, '') : ''
    });
  };
  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages w-220">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={pageSize}
            onChange={e => setPageSize(e.value)}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__deviceCode ml-0">
          <p className="form-search__title">기기식별코드</p>
          <SelectCustom
            placeholder="시/군/구"
            listItem={listDeviceCode}
            option={deviceCodeOption}
            onChange={option => setDeviceCodeOption(option)}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail">
          <p className="form-search__title">휴대폰 번호 검색</p>
          <Input
            placeholder="-없이 숫자만 입력"
            type="text"
            onChange={e => handleChangeInput(e)}
            value={phoneRef}
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

export default ThirdSearch;
