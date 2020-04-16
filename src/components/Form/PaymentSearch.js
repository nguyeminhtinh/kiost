// @flow
/* eslint-disable react/no-find-dom-node */
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Radio from 'components/Radio';
import Button from 'components/Button';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

registerLocale('ko', ko);

type Props = {
  handleSubmitSearch: Function
};
export const SecondarySearch = ({ handleSubmitSearch = () => {} }: Props) => {
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const initSearch = {
    pageIndex: 1,
    startDay: moment(startDay).format('YYYY-MM-DD'),
    endDay: moment(endDay).format('YYYY-MM-DD'),
    paymentType: null,
    status: null
  };
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [viewTime, setViewTime] = useState('today');
  const startDayRef = useRef(null);
  const endDayRef = useRef(null);

  const buttonActive = id => {
    setViewTime(id);
    switch (id) {
      case 'today':
        setStartDay(new Date());
        setEndDay(new Date());
        break;
      case 'week':
        setStartDay(new Date(moment(new Date()).subtract(6, 'days')));
        setEndDay(new Date());
        break;
      case '30days':
        setStartDay(new Date(moment(new Date()).subtract(29, 'days')));
        setEndDay(new Date());
        break;
      case '90days':
        setStartDay(new Date(moment(new Date()).subtract(89, 'days')));
        setEndDay(new Date());
        break;
      default:
        break;
    }
  };

  const submitSearch = () => {
    const startDate = moment(startDay).format('YYYY-MM-DD');
    const endDate = moment(endDay).format('YYYY-MM-DD');
    handleSubmitSearch({
      ...objectSearch,
      startDay: startDay && startDate,
      endDay: endDay && endDate
    });
  };

  useEffect(() => {
    const nodeStart =
      startDayRef && startDayRef.current && startDayRef.current.input
        ? startDayRef.current.input
        : null;
    const nodeEnd =
      endDayRef && endDayRef.current && endDayRef.current.input
        ? endDayRef.current.input
        : null;
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', 'true');
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', 'true');
  }, []);

  return (
    <div className="form-search align-items-start">
      <div className="form-search__left custom-icon-ie col-md-6">
        <div className="form-search__store">
          <p className="form-search__title w-custom">조회기간</p>
          <div className="list-button">
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive('today')}
              className={viewTime === 'today' ? 'active' : ''}
            >
              오늘
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive('week')}
              className={viewTime === 'week' ? 'active' : ''}
            >
              일주일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive('30days')}
              className={viewTime === '30days' ? 'active' : ''}
            >
              30일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive('90days')}
              className={viewTime === '90days' ? 'active' : ''}
            >
              90일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive('settingDate')}
              className={viewTime === 'settingDate' ? 'active' : ''}
            >
              기간설정
            </Button>
          </div>
        </div>
        <div className="form-search__date payment-date">
          <p className="form-search__title">조회일자</p>
          <div className="range-date">
            <div className="start-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={startDay}
                onChange={date => setStartDay(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                startDay={startDay}
                endDay={endDay}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={startDayRef}
                disabled={viewTime !== 'settingDate'}
                isClearable={!!startDay}
                placeholderText="날짜를 선택해주세요. "
              />
            </div>
            <p className="icon">~</p>
            <div className="end-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={endDay}
                onChange={date => setEndDay(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                endDay={endDay}
                minDate={startDay}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={endDayRef}
                disabled={viewTime !== 'settingDate'}
                isClearable={!!endDay}
                placeholderText="날짜를 선택해주세요. "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-search__right col-md-6">
        <div className="row">
          <div className="col-md-10 pl-custom">
            <div className="form-search__classification form-radio-right">
              <p className="form-search__title">결제구분</p>
              <Radio
                id="paymentTypeAll"
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    paymentType: null
                  });
                }}
                isChecked={objectSearch && objectSearch.paymentType === null}
                labelRadio="전체"
                name="paymentTypeAll"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    paymentType: 'creditcard'
                  });
                }}
                isChecked={
                  objectSearch && objectSearch.paymentType === 'creditcard'
                }
                id="creditcard"
                labelRadio="카드결제"
                name="creditcard"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    paymentType: 'kakaopay'
                  });
                }}
                isChecked={
                  objectSearch && objectSearch.paymentType === 'kakaopay'
                }
                id="kakaopay"
                labelRadio="QR결제"
                name="kakaopay"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    paymentType: 'point'
                  });
                }}
                isChecked={objectSearch && objectSearch.paymentType === 'point'}
                id="point"
                labelRadio="쿠폰결제"
                name="point"
              />
            </div>
            <div className="form-search__classification form-radio-right">
              <p className="form-search__title">결제상태</p>
              <Radio
                id="all"
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    status: null
                  });
                }}
                isChecked={objectSearch && objectSearch.status === null}
                labelRadio="전체"
                name="all"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    status: 'paid'
                  });
                }}
                isChecked={objectSearch && objectSearch.status === 'paid'}
                id="paid"
                labelRadio="결제완료"
                name="paid"
              />
              <Radio
                onChange={() => {
                  setObjectSearch({
                    ...objectSearch,
                    status: 'cancel'
                  });
                }}
                isChecked={objectSearch && objectSearch.status === 'cancel'}
                id="cancel"
                labelRadio="결제취소"
                name="cancel"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex justify-content-end check-screen">
              <Button type="submit" variant="secondary" onClick={submitSearch}>
                검색
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo<Props>(SecondarySearch);
