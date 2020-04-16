// @flow
// libs
import React, { memo } from 'react';

type Props = {
  title: string,
  customClass?: string
};
export const TitleHeader = ({ title, customClass = '' }: Props) => (
  <div className={`title__header ${customClass}`}>
    <h1>{title}</h1>
  </div>
);

TitleHeader.defaultProps = {
  customClass: ''
};

export default memo<Props>(TitleHeader);
