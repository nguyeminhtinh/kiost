// @flow
// libs
import React, { useState } from 'react';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';
import { listKeyManualProduct } from '../../constants/listKey';
import listPage from '../../constants/listPageSize';

type Props = {
  handleSubmitSearch: Function
};

const ProductManualSearch = ({ handleSubmitSearch }: Props) => {
  const initSearch = {};
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [pageNumber, setPageNumber] = useState(10);

  const [searchKeyOption, setSearchKeyOption] = useState({
    id: 0,
    value: 'all',
    label: '선택'
  });

  const [valueDefault, setValueDefault] = useState('');
  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const handleSelectChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'listKey':
        setSearchKeyOption(option);
        setValueDefault('');
        break;
      default:
        setObjectSearch({
          ...objectSearch,
          [name]: value
        });
    }
  };
  const submitSearch = () => {
    const objSearch = {
      pageNumber,
      pageIndex: 0
    };
    handleSubmitSearch({
      ...objSearch,
      [searchKeyOption && searchKeyOption.value]: valueDefault
    });
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages w-220">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={pageNumber}
            onChange={e => setPageNumber(e.value)}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKeyManualProduct}
            option={searchKeyOption}
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

export default ProductManualSearch;
