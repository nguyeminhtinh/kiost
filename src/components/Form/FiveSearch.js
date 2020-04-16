// @flow
// libs
import React, { memo, useState, useRef } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import Input from 'components/Input';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

registerLocale('ko', ko);

type Props = {
  listStore: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKeySearchFive: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const FiveSearch = ({
  listStore,
  listKeySearchFive,
  handleSubmitSearch
}: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedRowKey, setSelectedRowKey] = useState('전체');
  const [selectedStore, setSelectedStore] = useState('전체');
  const inputSearchRef = useRef(null);
  const handleSearch = () => {
    const inputSearch = inputSearchRef.current
      ? inputSearchRef.current.value
      : null;
    const objSearch = {
      startDate,
      endDate,
      store: selectedStore,
      [selectedRowKey]: inputSearch
    };

    handleSubmitSearch(objSearch);
  };
  return (
    <div className="form-search ">
      <div className="form-search__left">
        <div className="form-search__date">
          <p className="form-search__title">조회 일자</p>
          <div className="range-date">
            <div className="start-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                startDate={startDate}
                endDate={endDate}
                locale="ko"
              />
            </div>
            <p className="icon">~</p>
            <div className="end-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                endDate={endDate}
                minDate={startDate}
                locale="ko"
              />
            </div>
          </div>
        </div>
        <div className="form-search__store">
          <p className="form-search__title">가맹점명</p>
          <SelectDropdown
            listItem={listStore}
            value={selectedStore}
            onChange={optionStore => {
              setSelectedStore(optionStore && optionStore.value);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail">
          <p className="form-search__title">검색</p>
          <SelectDropdown
            listItem={listKeySearchFive}
            value={selectedRowKey}
            onChange={optionRowKey => {
              setSelectedRowKey(optionRowKey && optionRowKey.label);
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
        <Button type="submit" variant="secondary" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};

export default memo<Props>(FiveSearch);
