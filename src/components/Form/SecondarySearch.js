// @flow
// libs
import React, { memo, useState } from 'react';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';

type Props = {
  listDrive?: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};
export const SecondarySearch = ({
  listDrive = [],
  handleSubmitSearch = () => {}
}: Props) => {
  const [deviceCodeOption, setDeviceCodeOption] = useState({
    id: null,
    value: null,
    label: '전체'
  });
  const submitSearch = () => {
    handleSubmitSearch(deviceCodeOption && deviceCodeOption.value);
  };
  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__address w-13rem device-width">
          <p className="form-search__title"> 기기식별코드</p>
          <SelectCustom
            listItem={listDrive}
            option={deviceCodeOption}
            onChange={option => {
              setDeviceCodeOption(option);
            }}
            noOptionsMessage={() => '옵션 없음'}
            placeholder=""
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
SecondarySearch.defaultProps = {
  listDrive: []
};
export default memo<Props>(SecondarySearch);
