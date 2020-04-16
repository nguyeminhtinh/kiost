// @flow
// libs
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
import CustomTooltip from './customTooltip';
import CustomizedAxisTick from './customizedAxisTick';

const DataFormate = number => {
  if (number > 1000) {
    return `${number.toLocaleString('en')}`;
  }
  return number.toLocaleString('en');
};

type Props = {
  data: Array<{
    id: number,
    title: string,
    value: number
  }>,
  titleBarChart?: string,
  onDetail?: string,
  chartMinWidth?: number,
  chartMinHeight?: number,
  chartHeight?: number
};

export const SimpleBarChart = ({
  data,
  titleBarChart = '',
  onDetail = '',
  chartMinWidth,
  chartMinHeight,
  chartHeight
}: Props) => (
  <>
    <div className="title-chart bar">
      {!!titleBarChart && <h2 className="title-bar-chart">{titleBarChart}</h2>}
      {!!onDetail && (
        <Link to={onDetail}>
          상세보기
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
    {data.length <= 0 ? (
      <div className="wrap-data-empty">
        <h2 className="data-empty">현재 데이터가 없습니다.</h2>
      </div>
    ) : (
      <div className="wrap-chart">
        <ResponsiveContainer
          minHeight={chartMinHeight}
          minWidth={chartMinWidth}
          height={chartHeight}
        >
          <ComposedChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 40
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis
              dataKey="label"
              tickMargin={15}
              interval={0}
              dx={0}
              height={50}
              tick={<CustomizedAxisTick />}
            />
            <YAxis allowDataOverflow tickFormatter={DataFormate} width={100} />
            <Tooltip
              cursor={false}
              content={<CustomTooltip label="data" payload={data} />}
            />
            <Bar dataKey="value" fill="#4ab5e1" barSize={30}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.id}
                  stroke="rgba(74,181,225,0.5)"
                  strokeWidth={index === 10 ? 8 : 8}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#04679b"
              activeDot={{ r: 5 }}
              dot={{ r: 5 }}
              onMouseDown={() => {}}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )}
  </>
);
SimpleBarChart.defaultProps = {
  titleBarChart: '',
  onDetail: '',
  chartMinWidth: '',
  chartMinHeight: '',
  chartHeight: ''
};
export default memo<Props>(SimpleBarChart);
