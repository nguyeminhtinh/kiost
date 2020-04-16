// @flow
// libs
import React, { memo, useState, useRef } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import Input from 'components/Input';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listStoreName: Array<{
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

export const StoreSearch = ({
  listPage,
  listStoreName,
  listDeviceCode,
  listKey,
  handleSubmitSearch
}: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [storeName, setStoreName] = useState('전체');
  const [deviceCode, setDeviceCode] = useState('전체');
  const [key, setListKey] = useState('전체');
  const inputSearchRef = useRef(null);
  const submitSearch = () => {
    const valueInput = inputSearchRef.current
      ? inputSearchRef.current.value
      : '';
    const objectSearch = {
      pageSize,
      storeName,
      deviceCode,
      [key]: valueInput
    };
    handleSubmitSearch(objectSearch);
  };
  return (
    <div className="form-search">
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

        <div className="form-search__name-store">
          <p className="form-search__title">매장명</p>
          <SelectDropdown
            placeholder="시/도"
            listItem={listStoreName}
            value={storeName}
            onChange={e => setStoreName(e.value)}
            noOptionsMessage={() => '옵션 없음'}
          />
          <div className="form-search__deviceCode mb-0">
            <p className="form-search__title">기기식별코드</p>
            <SelectDropdown
              placeholder="전체"
              listItem={listDeviceCode}
              value={deviceCode}
              onChange={e => setDeviceCode(e.value)}
              noOptionsMessage={() => '옵션 없음'}
            />
          </div>
        </div>
        <div className="form-search__detail w550">
          <p className="form-search__title">검색</p>
          <SelectDropdown
            listItem={listKey}
            value={key}
            onChange={e => {
              setListKey(e.value);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
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

export default memo<Props>(StoreSearch);
