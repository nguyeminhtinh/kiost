// @flow
// libs
import React, { memo } from 'react';

type Props = {
  x: number,
  y: number,
  payload: any,
  width?: number,
  fontSize?: number
};

const CustomizedAxisTick = ({ x, y, payload, width, fontSize }: Props) => {
  const rx = new RegExp(`.{1,${10}}`, 'g');
  const chunks =
    payload &&
    payload.value
      .replace(/-/g, ' ')
      .replace(/[(]/g, ' (')
      .split(' ')
      .map(s => s.match(rx))
      .flat();
  const tspan = chunks.map((s, i) => (
    <tspan x={0} y={15} dy={i * 15} key={s}>
      {s}
    </tspan>
  ));
  return (
    <g transform={`translate(${x},${y})`}>
      <text width={width} height="auto" textAnchor="middle" fontSize={fontSize}>
        {tspan}
      </text>
    </g>
  );
};
CustomizedAxisTick.defaultProps = {
  width: 40,
  fontSize: 12
};
export default memo<Props>(CustomizedAxisTick);
