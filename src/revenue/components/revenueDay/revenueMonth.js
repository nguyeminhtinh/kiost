// @flow
// libs
import React from 'react';
import Table from '../../../components/Table/index';
import { headRevenueDay } from '../../../constants/headerTable';
import ChartDay from '../../../components/Charts/ChartDay';

type Props = { dataChart: Array<{}>, dataTable: Array<{}> };

export const RevenueMonth = ({ dataChart, dataTable }: Props) => (
  <>
    <div className="wrap-chart overflow-x">
      <ChartDay
        data={dataChart}
        chartHeight={300}
        chartMinHeight={300}
        chartMinWidth={1190}
        barSizeWidth={30}
        radiusWidth={[45, 45, 0, 0]}
      />
    </div>
    <div className="mt-3 table-price-2-3">
      <Table tableHeads={headRevenueDay} tableBody={dataTable} />
    </div>
  </>
);

export default RevenueMonth;
