// @flow
/* eslint-disable react/no-find-dom-node */
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SelectDropdown from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

registerLocale('ko', ko);
type Props = {
  listDrive: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKeySearchFourth: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const FourthSearch = ({
  listDrive,
  listKeySearchFourth,
  handleSubmitSearch
}: Props) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRowKey, setSelectedRowKey] = useState({
    value: 'productName',
    label: '선택'
  });

  const [deviceCodeOption, setDeviceCodeOption] = useState({
    value: null,
    label: '전체'
  });
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  const [valueInput, setValueInput] = useState();
  const handleChangeInput = value => {
    setValueInput(value);
  };

  const handleSearch = () => {
    let objSearch = {};

    if (selectedRowKey && selectedRowKey.value) {
      objSearch = { [selectedRowKey.value]: valueInput };
    }

    if (startDate) {
      objSearch = {
        ...objSearch,
        startDate: moment(startDate).format('YYYY-MM-DD')
      };
    }

    if (endDate) {
      objSearch = {
        ...objSearch,
        endDate: moment(endDate).format('YYYY-MM-DD')
      };
    }

    if (deviceCodeOption && deviceCodeOption.value) {
      objSearch = {
        ...objSearch,
        deviceId: deviceCodeOption && deviceCodeOption.value
      };
    }

    handleSubmitSearch({ ...objSearch, pageIndex: 1 });
  };

  useEffect(() => {
    const nodeStart =
      startDateRef && startDateRef.current ? startDateRef.current.input : '';
    const nodeEnd =
      endDateRef && endDateRef.current ? endDateRef.current.input : '';
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', 'true');
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', 'true');
  }, []);

  return (
    <div className="form-search ">
      <div className="form-search__left custom-select-w">
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
                dropdownMode="select"
                startDate={startDate}
                endDate={endDate}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={startDateRef}
                popperPlacement="top-start"
                placeholderText="날짜를 선택해주세요. "
                isClearable={!!startDate}
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
                dropdownMode="select"
                endDate={endDate}
                minDate={startDate}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={endDateRef}
                popperPlacement="top-start"
                placeholderText="날짜를 선택해주세요. "
                isClearable={!!endDate}
              />
            </div>
          </div>
        </div>

        <div className="form-search__address w-13rem">
          <p className="form-search__title">기기식별코드</p>
          <SelectDropdown
            // placeholder="시/도"
            listItem={listDrive}
            option={deviceCodeOption}
            onChange={option => {
              setDeviceCodeOption(option);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail w-13rem">
          <p className="form-search__title">검색</p>
          <SelectDropdown
            placeholder="선택"
            listItem={listKeySearchFourth}
            option={selectedRowKey}
            noOptionsMessage={() => '옵션 없음'}
            onChange={option => {
              setSelectedRowKey(option);
            }}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            // innerRef={searchValueRef}
            onChange={e => handleChangeInput(e)}
            value={valueInput}
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
export default memo<Props>(FourthSearch);
