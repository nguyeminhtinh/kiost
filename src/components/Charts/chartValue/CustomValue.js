// @flow
// libs
import React, { memo } from 'react';

type Props = {
  value?: number,
  stroke?: number,
  x?: Number,
  y?: number
};
export const CustomizedValue = ({ x, y, stroke, value }: Props) => {
  return (
    <text x={x} y={y} dy={-12} fill={stroke} fontSize={10} textAnchor="middle">
      {Number(value).toLocaleString('en')}
    </text>
  );
};

CustomizedValue.defaultProps = {
  value: '',
  stroke: '',
  x: '',
  y: ''
};
export default memo<Props>(CustomizedValue);
