// @flow

import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CreatableSelect from 'react-select/creatable';
type Props = {
  placeholder?: string,
  errorMsg?: string,
  label?: string,
  disabled?: boolean,
  isSearchable?: boolean,
  icon?: string,
  onBlur?: Function,
  onChange?: Function,
  // defaultValue?: any,
  listItem?: Array<{
    id: number,
    value: any,
    label: string
  }>,
  listOptionString?: Array<{ id: number, name: any }>,
  innerRef?: any,
  noLabel?: boolean,
  option?: any,
  customClassName?: string,
  noOptionsMessage?: Function
};

const SelectCustom = ({
  // defaultValue = '',
  placeholder = '',
  errorMsg = '',
  label = '',
  disabled = false,
  isSearchable = false,
  icon = '',
  onBlur = null,
  onChange = () => {},
  listItem = [],
  innerRef = null,
  noLabel = false,
  listOptionString = [],
  option = null,
  customClassName = '',
  noOptionsMessage = () => {}
}: Props) => {
  // const currentValue = {
  //   label: option && option.label,
  //   value: option && option.value
  // };

  return (
    <div className="customer-select">
      {!!label && <p className="input__label">{label}</p>}
      <div className={`${customClassName} input__box`}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <Select
          placeholder={placeholder}
          // defaultValue={option ? currentValue : null}
          ref={innerRef}
          value={option || null}
          onChange={onChange}
          noOptionsMessage={noOptionsMessage}
          options={
            noLabel
              ? listOptionString.map(item => ({
                  id: item.id,
                  value: item.name,
                  label: item.name
                }))
              : listItem
          }
          blurInputOnSelect={onBlur}
          isDisabled={disabled}
          isSearchable={isSearchable}
        />
      </div>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

SelectCustom.defaultProps = {
  placeholder: '',
  errorMsg: '',
  label: '',
  disabled: false,
  isSearchable: false,
  icon: '',
  onBlur: null,
  onChange: () => {},
  innerRef: null,
  noLabel: false,
  listOptionString: [],
  // defaultValue: '',
  listItem: [],
  customClassName: '',
  option: {},
  noOptionsMessage: () => {}
};

export default SelectCustom;
