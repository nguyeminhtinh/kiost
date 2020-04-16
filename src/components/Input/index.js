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
  inputMode?: string
};

const Input = ({
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
  inputMode = ''
}: Props) => {
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
          defaultValue={value}
          // value={value}
          disabled={disabled}
          type={type}
          onKeyPress={onKeyPress}
          readOnly={readOnly}
          onPaste={onPaste}
          pattern={pattern}
          inputMode={inputMode}
          onBlur={e => onBlur && onBlur(e)}
          onFocus={e => onFocus && onFocus(e)}
          onChange={e => onChange && onChange(e.target.value)}
          autoCapitalize="none"
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  errorMsg: '',
  innerRef: null,
  label: '',
  disabled: false,
  readOnly: false,
  icon: '',
  type: 'text',
  onBlur: null,
  onFocus: null,
  onChange: null,
  onKeyPress: null,
  onPaste: null,
  variant: 'outline',
  customClassName: '',
  pattern: '',
  inputMode: ''
};

export default Input;
