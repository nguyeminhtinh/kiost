// @flow
// libs
import React, { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomTooltip from '../customTooltip';

type Props = {
  data: Array<{
    title: string,
    value: Number
  }>,
  chartMinWidth?: number,
  chartMinHeight?: number,
  chartHeight?: number
};

export const SimpleLineChartValue = ({
  data,
  chartMinWidth,
  chartMinHeight,
  chartHeight
}: Props) => (
  <>
    {data.length <= 0 && (
      <h2 className="data-empty">현재 데이터가 없습니다.</h2>
    )}
    <div className="wrap-chart">
      <ResponsiveContainer
        height={chartHeight}
        minWidth={chartMinWidth}
        minHeight={chartMinHeight}
      >
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 30, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="label" padding={{ left: 30, right: 30 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip label="data" payload={data} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            dot={{ r: 6 }}
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </>
);
SimpleLineChartValue.defaultProps = {
  chartMinWidth: '',
  chartMinHeight: '',
  chartHeight: ''
};
export default memo<Props>(SimpleLineChartValue);
