// @flow

import React, { memo } from 'react';

type Props = {
  name: string,
  checked: boolean,
  onChange: Function,
  label: string,
  disabled?: boolean,
  onKeyPress?: Function
};

export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  onKeyPress = null
}: Props) => {
  return (
    <div className={`checkbox ${checked ? 'checkbox--checked' : ''}`}>
      <label className="checkbox__label" htmlFor={name}>
        {label}
        <input
          className="checkbox__input"
          id={name}
          type="checkbox"
          onChange={onChange}
          disabled={disabled}
          onKeyPress={onKeyPress}
        />
      </label>
    </div>
  );
};
Checkbox.defaultProps = {
  disabled: false,
  onKeyPress: null
};

export default memo<Props>(Checkbox);
