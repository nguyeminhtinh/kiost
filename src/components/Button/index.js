// @flow
// libs
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  onClick: Function,
  isdisabled?: boolean,
  size?: string,
  variant?: string,
  type: string,
  customClass?: string,
  children: string
};

export const PrimaryButton = ({
  isdisabled = false,
  onClick,
  variant = 'primary',
  type,
  size = 'sm',
  customClass = '',
  children
}: Props) => {
  return (
    <Button
      variant={variant}
      type={type}
      size={size}
      disabled={isdisabled}
      onClick={onClick}
      className={customClass}
    >
      {children}
    </Button>
  );
};

PrimaryButton.defaultProps = {
  isdisabled: false,
  customClass: '',
  size: 'sm',
  variant: 'primary'
};

export default memo<Props>(Button);
