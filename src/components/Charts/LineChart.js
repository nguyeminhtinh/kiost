// @flow
// libs
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import CustomTooltip from './customTooltip';

type Props = {
  data: Array<{
    title: string,
    value: Number
  }>,
  chartColor: string,
  titleChart?: string,
  unit?: string,
  onDetail?: string,
  chartMinWidth?: number,
  chartMinHeight?: number,
  chartHeight?: number
};
const DataFormate = number => {
  if (number > 1000) {
    return `${number.toLocaleString('en')}`;
  }
  return number.toLocaleString('en');
};
export const SimpleLineChart = ({
  data,
  titleChart = '',
  unit = '',
  onDetail = '',
  chartHeight,
  chartMinWidth,
  chartMinHeight,
  chartColor
}: Props) => (
  <>
    <div className="title-chart">
      {!!titleChart && <h2>{titleChart}</h2>}
      {!!unit && <h3>{unit}</h3>}
      {!!onDetail && (
        <Link to={onDetail}>
          상세보기
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
    {data.length <= 0 ? (
      <div className="wrap-data-empty-250">
        <h2 className="data-empty">현재 데이터가 없습니다.</h2>
      </div>
    ) : (
      <div className="wrap-chart">
        <ResponsiveContainer
          height={chartHeight}
          minWidth={chartMinWidth}
          minHeight={chartMinHeight}
        >
          <AreaChart
            width={600}
            height={200}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="label" />
            <YAxis tickFormatter={DataFormate} width={100} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip label="data" payload={data} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.3}
              strokeWidth={2}
              activeDot={{ r: 3 }}
              dot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </>
);
SimpleLineChart.defaultProps = {
  titleChart: '',
  unit: '',
  onDetail: '',
  chartMinWidth: '',
  chartMinHeight: '',
  chartHeight: ''
};
export default memo<Props>(SimpleLineChart);
