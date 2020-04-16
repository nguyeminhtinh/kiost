// @flow
/* eslint-disable react/jsx-fragments */
// libs
import React, { useState, memo } from 'react';
import moment from 'moment';
import Button from 'components/Button';
import Radio from 'components/Radio';
import SelectCustom from 'components/Select/SelectCustom';
import listMonth from '../../constants/listMonth';

type Props = {
  handleOnchangeRadio?: Function,
  handleSubmitSearch: Function,
  radioActive: string,
  listYear: Array<{
    id: number,
    value: number,
    label: string
  }>
};

export const SixthSearch = ({
  radioActive,
  handleOnchangeRadio = () => {},
  handleSubmitSearch = () => {},
  listYear
}: Props) => {
  const currentYear = parseInt(moment().format('YYYY'), 10);
  const [yearOption, setYearOption] = useState({
    value: currentYear,
    label: `${currentYear}년`
  });
  const currentMonth = parseInt(moment().format('MM'), 10);
  const [monthOption, setMonthOption] = useState({
    value: currentMonth,
    label: `${currentMonth}월`
  });

  const handleSelectChange = (option, name) => {
    switch (name) {
      case 'year':
        setYearOption(option);
        break;
      case 'month':
        setMonthOption(option);
        break;
      default:
        break;
    }
  };

  const submitSearch = () => {
    let objectSearch = {};
    switch (radioActive) {
      case 'day':
        objectSearch = {
          searchType: radioActive,
          month: monthOption && monthOption.value,
          year: yearOption && yearOption.value
        };
        break;
      case 'month':
        objectSearch = {
          searchType: radioActive,
          year: yearOption && yearOption.value
        };
        break;
      case 'year':
        objectSearch = {
          searchType: radioActive
        };
        break;
      default:
        break;
    }
    handleSubmitSearch(objectSearch);
  };

  const renderSearchBox = () => {
    let searchBox = null;
    switch (radioActive) {
      case 'month':
        searchBox = (
          <SelectCustom
            listItem={listYear}
            option={yearOption}
            onChange={e => handleSelectChange(e, 'year')}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="선택"
          />
        );
        break;
      case 'year':
        searchBox = null;
        break;
      case 'day':
        searchBox = (
          <React.Fragment>
            <SelectCustom
              listItem={listYear}
              option={yearOption}
              onChange={e => handleSelectChange(e, 'year')}
              placeholder="선택"
              noOptionsMessage={() => '옵션 없음'}
            />
            <p className="mx-1"> </p>
            <SelectCustom
              listItem={listMonth}
              noOptionsMessage={() => '옵션 없음'}
              option={monthOption}
              onChange={e => handleSelectChange(e, 'month')}
              placeholder="선택"
            />
          </React.Fragment>
        );
        break;
      default:
        break;
    }
    return searchBox;
  };

  return (
    <div className="form-search">
      <div className="form-search__left custom-search">
        <div className="form-search__classification">
          <p className="form-search__title">조회 분류</p>
          <Radio
            onChange={event => handleOnchangeRadio(event.target.name)}
            id="day"
            isChecked={radioActive === 'day'}
            labelRadio="일별매출"
            name="day"
          />
          <Radio
            onChange={event => handleOnchangeRadio(event.target.name)}
            id="month"
            isChecked={radioActive === 'month'}
            labelRadio="월별매출"
            name="month"
          />
          <Radio
            onChange={event => handleOnchangeRadio(event.target.name)}
            id="year"
            isChecked={radioActive === 'year'}
            labelRadio="연별매출"
            name="year"
          />
        </div>
        <div className="form-search__date">
          {radioActive !== 'year' && (
            <p className="form-search__title">조회 일자</p>
          )}

          <div className="start-date form-search__store mb-0">
            {renderSearchBox()}
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
SixthSearch.defaultProps = {
  handleOnchangeRadio: () => {}
};
export default memo<Props>(SixthSearch);
