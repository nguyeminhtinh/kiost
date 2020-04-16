// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { memo, useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'components/Table';
import Loading from 'components/Loading';
import ROUTERS from '../../constants/routers';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import MainLayout from '../../layout/MainLayout';
import TitleHeader from '../../components/TitleHeader';
import { headMainPage } from '../../constants/headerTable';
import { listValueStatusHome } from '../../constants/listStatusTable';

type Props = {
  getRevenues: Function,
  topRevenuesTime: Array<{
    value: number
  }>,
  topRevenuesDay: Array<{
    value: number
  }>,
  topProducts: Array<{}>,
  dataExpiration: Array<{}>,
  isProcessing: boolean,
  history: {
    push: Function
  },
  totalRows: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const Home = ({
  getRevenues,
  isProcessing,
  history,
  topRevenuesTime,
  topRevenuesDay,
  topProducts,
  dataExpiration,
  totalRows,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    getRevenues(pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  useEffect(() => {
    setPageIndex();
  }, []);

  const handleViewDetail = () => {
    history.push(`/merchandise`);
  };

  const handleActivePage = eventKey => {
    getRevenues(eventKey.selected + 1);
  };

  const currentSales =
    (topRevenuesTime &&
      topRevenuesTime.reduce((sum, sale) => {
        return sum + sale.value;
      }, 0)) ||
    0;
  const totalRevenue =
    (topRevenuesDay &&
      topRevenuesDay.reduce((sum, total) => {
        return sum + total.value;
      }, 0)) ||
    0;

  return (
    <Container className="reset-padding" fluid>
      <MainLayout>
        <div className="home-main p-3">
          {isProcessing ? (
            <div className="wrapper-loading">
              <Loading
                animation="grow"
                role="status"
                className=""
                text=""
                variant="dark"
                size="lg"
              />
            </div>
          ) : (
            <>
              <TitleHeader title="메인화면" />
              <Row>
                <Col md={6}>
                  <div className="line-chart line-overflow-x">
                    <LineChart
                      data={
                        topRevenuesTime
                          ? Immutable.asMutable(topRevenuesTime)
                          : []
                      }
                      titleChart="현재 매출"
                      unit={`${currentSales &&
                        currentSales.toLocaleString('en')}원`}
                      onDetail={ROUTERS.REVENUE_TIME}
                      chartHeight={250}
                      chartMinHeight={250}
                      chartMinWidth={320}
                      chartColor="#8884d8"
                    />
                  </div>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <div className="line-chart line-overflow-x">
                    <LineChart
                      data={
                        topRevenuesDay
                          ? Immutable.asMutable(topRevenuesDay)
                          : []
                      }
                      titleChart="총 매출(일별)"
                      unit={`${totalRevenue &&
                        totalRevenue.toLocaleString('en')}원`}
                      onDetail={ROUTERS.REVENUEDAY_DAY}
                      chartHeight={250}
                      chartMinHeight={250}
                      chartMinWidth={320}
                      chartColor="#82ca9d"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <div className="bar-chart overflow-x">
                    <BarChart
                      data={topProducts ? Immutable.asMutable(topProducts) : []}
                      titleBarChart="총 상품 매출 순위 Top10"
                      onDetail={ROUTERS.REVENUE_PRODUCT}
                      chartHeight={300}
                      chartMinHeight={300}
                      chartMinWidth={992}
                    />
                  </div>
                </Col>
              </Row>

              <div className="wrap-box mt-3">
                <Row>
                  <Col sm={12} className="mt-3 table-main table-expiration">
                    <h4 className="mb-3 title-weig">유효기한 임박상품 </h4>
                    <Table
                      tableHeads={headMainPage}
                      tableBody={dataExpiration}
                      statusField="status"
                      valueStatusField={listValueStatusHome}
                      isShowColumnBtnStatus
                      onClickRow={handleViewDetail}
                      statusActive
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
        {totalRows > 5 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 5)}
              onPageChange={eventKey => handleActivePage(eventKey)}
              forcePage={pageIndex || 0}
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
              nextLinkClassName="page-link"
              marginPagesDisplayed={1}
            />
          </Col>
        )}
      </MainLayout>
    </Container>
  );
};

export default memo<Props>(Home);
