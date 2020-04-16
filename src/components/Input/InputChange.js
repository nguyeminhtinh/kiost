// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  placeholder?: string,
  value?: string | number | any,
  errorMsg?: string,
  innerRef?: any,
  label?: string,
  disabled?: boolean,
  icon?: string,
  type?: string,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  onPaste?: Function,
  readOnly?: boolean,
  variant?: 'outline',
  customClassName?: string,
  pattern?: string,
  inputMode?: string,
  onMouseLeave?: Function
  // step?: string
};

const InputChange = ({
  placeholder = '',
  value = '',
  errorMsg = '',
  innerRef = null,
  label = '',
  disabled = false,
  readOnly = false,
  icon = '',
  type = 'text',
  onBlur = null,
  onChange = null,
  customClassName = null,
  onFocus = null,
  onKeyPress = null,
  onPaste = null,
  variant = 'outline',
  pattern = '',
  inputMode = '',
  onMouseLeave
}: // step = 'any'
Props) => {
  return (
    <div
      className={`input__wrapper ${
        variant !== 'outline' ? ` input__wrapper--${variant}` : ''
      }`}
    >
      {!!label && <p className="input__label">{label}</p>}
      <div className="input__box">
        {icon && <FontAwesomeIcon icon={icon} />}
        <input
          className={`input ${
            variant !== 'outline' ? `input--${variant}` : ''
          } ${customClassName}`}
          placeholder={placeholder}
          ref={innerRef}
          value={value}
          disabled={disabled}
          type={type}
          onKeyPress={onKeyPress}
          readOnly={readOnly}
          onPaste={onPaste}
          onMouseLeave={onMouseLeave}
          pattern={pattern}
          inputMode={inputMode}
          onBlur={e => onBlur && onBlur(e)}
          onFocus={e => onFocus && onFocus(e)}
          onChange={e => onChange && onChange(e.target.value)}
          autoCapitalize="none"
          autoComplete="off"
          // step={step}
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

InputChange.defaultProps = {
  placeholder: '',
  value: '',
  errorMsg: '',
  innerRef: null,
  label: '',
  disabled: false,
  readOnly: false,
  icon: '',
  type: 'text',
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  onPaste: null,
  variant: 'outline',
  customClassName: '',
  pattern: '',
  inputMode: '',
  onMouseLeave: null
  // step: 'any'
};

export default InputChange;
