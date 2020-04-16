// @flow
// libs
import React, { useState, useRef } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import Input from 'components/Input';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKey: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleChange: Function
};
export const AdvertisementSearch = ({
  listPage,
  listKey,
  handleChange = () => {}
}: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [key, setListKey] = useState('전체');
  const inputSearchRef = useRef(null);
  const submitSearch = () => {
    const valueInput = inputSearchRef.current
      ? inputSearchRef.current.value
      : '';
    const objectSearch = {
      pageSize,
      [key]: valueInput
    };
    handleChange(objectSearch);
  };
  return (
    <div className="form-search ">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={pageSize}
            onChange={e => setPageSize(e.value)}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail">
          <p className="form-search__title">검색</p>
          <SelectDropdown
            listItem={listKey}
            value={key}
            // defaultValue={listKeyStore[0]}
            onChange={e => {
              setListKey(e.value);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            // onChange={e => {
            //   setValueInput(e);
            // }}
            innerRef={inputSearchRef}
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

export default AdvertisementSearch;
