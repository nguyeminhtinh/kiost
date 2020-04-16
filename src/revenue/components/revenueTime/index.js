// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import SimpleLineChartValue from '../../../components/Charts/chartValue/LineChartValue';
import SecondarySearch from '../../../components/Form/SecondarySearch';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import Table from '../../../components/Table/index';
import { headRevenueTime } from '../../../constants/headerTable';

type Props = {
  getRevenuesByTime: Function,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  revenuesData: {
    charts: Array<{
      house: number,
      totalMoney: number
    }>,
    table: Array<{
      createdAt: string,
      totalMoney: number,
      profit: number
    }>,
    totalRows: number
  },
  dataTable: Array<{ createdAt: string, totalMoney: number, profit: number }>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const RevenueTime = ({
  getRevenuesByTime,
  getDeviceCode,
  deviceCodes,
  revenuesData,
  dataTable,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [paramFilter, setParamFilter] = useState({
    pageIndex: 1,
    deviceId: null
  });
  const handleSubmitSearch = value => {
    setParamFilter({ ...paramFilter, deviceId: value });
  };

  useEffect(() => {
    getRevenuesByTime(paramFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paramFilter && paramFilter.deviceId,
    paramFilter && paramFilter.pageIndex
  ]);

  useEffect(() => {
    getDeviceCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const dataRevenueHourse = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index <= 24; index++) {
    // eslint-disable-next-line no-unused-expressions
    revenuesData &&
      revenuesData.charts &&
      // eslint-disable-next-line no-loop-func
      revenuesData.charts.forEach(item => {
        if (parseInt(item.house, 10) === index) {
          dataRevenueHourse.push({
            id: index,
            value: item.totalMoney,
            label: parseInt(item.house, 10)
          });
        }
      });
    if (!dataRevenueHourse[index]) {
      dataRevenueHourse.push({
        id: index,
        value: 0,
        label: index
      });
    }
  }

  const handleSelectPagination = eventKey => {
    getRevenuesByTime({ ...paramFilter, pageIndex: eventKey.selected + 1 });
  };

  return (
    <MainLayout>
      <Container fluid className="form-revenue-time-page home-main">
        <Row>
          <Col xs={12}>
            <div>
              <TitleHeader title="시간별 매출현황" />
              <SecondarySearch
                listDrive={Immutable.asMutable(deviceCodes)}
                handleSubmitSearch={handleSubmitSearch}
              />
              <div className="overflow-x">
                <SimpleLineChartValue
                  data={dataRevenueHourse}
                  chartHeight={300}
                  chartMinHeight={300}
                  chartMinWidth={1190}
                  chartColor="#8884d8"
                />
              </div>
              <div className="mt-3">
                <div className="revenue-time table-price-3-4">
                  <Table tableHeads={headRevenueTime} tableBody={dataTable} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {revenuesData.totalRows > 10 && (
        <Col sm={12} className="wrapper-pagination">
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel={<span className="gap">...</span>}
            pageCount={Math.ceil(revenuesData.totalRows / 10)}
            onPageChange={eventKey => handleSelectPagination(eventKey)}
            forcePage={0}
            containerClassName="pagination"
            disabledClassName="disabled"
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            marginPagesDisplayed={1}
            nextLinkClassName="page-link"
          />
        </Col>
      )}
    </MainLayout>
  );
};

export default RevenueTime;
