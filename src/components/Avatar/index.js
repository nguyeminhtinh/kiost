// @flow
// libs
import React, { memo } from 'react';

type Props = {
  url: string,
  value?: string,
  customClass?: string
};
export const Avatar = ({ url, value, customClass = '' }: Props) => (
  <div className="avatar">
    <img src={url} className={`avatar__img ${customClass}`} alt="avatar" />
    <p className="avatar__username">{value}</p>
  </div>
);

Avatar.defaultProps = {
  customClass: '',
  value: ''
};

export default memo<Props>(Avatar);
