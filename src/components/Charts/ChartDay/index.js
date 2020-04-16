// @flow
// libs
import React, { memo } from 'react';

import {
  ComposedChart,
  Line,
  Bar,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Cell
} from 'recharts';
import CustomTooltip from '../customTooltip';

type Props = {
  data: Array<{
    id: number,
    title: string,
    value: number
  }>,
  chartMinWidth?: number,
  chartMinHeight?: number,
  chartHeight?: number,
  barSizeWidth: number
};

const DataFormate = number => {
  if (number > 1000) {
    return `${number.toLocaleString('en')}`;
  }
  return number.toLocaleString('en');
};

export const ChartDay = ({
  data,
  chartMinWidth,
  chartMinHeight,
  chartHeight,
  barSizeWidth
}: Props) => (
  <div>
    <ResponsiveContainer
      minHeight={chartMinHeight}
      height={chartHeight}
      minWidth={chartMinWidth}
    >
      <ComposedChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 30, right: 0, left: 12, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" minTickGap={0} />
        <YAxis allowDataOverflow tickFormatter={DataFormate} width={100} />
        <Tooltip
          cursor={false}
          content={<CustomTooltip label="data" payload={data} />}
        />
        <Bar dataKey="value" fill="#4ab5e1" barSize={barSizeWidth}>
          {data &&
            data.map((entry, index) => (
              <Cell
                key={entry.id}
                stroke="rgba(74,181,225,0.5)"
                strokeWidth={index === 10 ? 8 : 8}
              />
            ))}
        </Bar>
        <Line type="monotone" dataKey="value" stroke="#04679b" />
        <Tooltip cursor={false} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);
ChartDay.defaultProps = {
  chartMinWidth: '',
  chartMinHeight: '',
  chartHeight: ''
};
export default memo<Props>(ChartDay);
