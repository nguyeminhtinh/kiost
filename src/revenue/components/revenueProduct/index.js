// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import FourthSearch from 'components/Form/FourthSearch';
import Table from 'components/Table';
import { headRevenueProduct } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { listKeySearchFourth } from '../../../constants/listKey';

type Props = {
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  getRevenuesProduct: Function,
  totalAmount: number,
  totalMoney: number,
  totalRows: number,
  dataTable: Array<{}>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const RevenueProduct = ({
  getDeviceCode,
  deviceCodes,
  getRevenuesProduct,
  totalAmount,
  totalMoney,
  totalRows,
  dataTable,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    pageIndex: 1
  });

  const handleSubmitSearch = search => {
    getRevenuesProduct(search);
    setParams(search);
  };

  useEffect(() => {
    getDeviceCode();
  }, []);

  useEffect(() => {
    getRevenuesProduct(params);
  }, [
    params.checkSearchDate,
    params.deviceCode,
    params.endDate,
    params.startDate,
    params.pageIndex,
    params.productName,
    params.all
  ]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    getRevenuesProduct({ ...params, pageIndex: eventKey.selected + 1 });
  };

  return (
    <MainLayout>
      <div className="home-main">
        <Container fluid>
          <TitleHeader title="상품별 매출 · 통계" />
          <Row>
            <Col sm={12}>
              <FourthSearch
                listDrive={Immutable.asMutable(deviceCodes)}
                listKeySearchFourth={listKeySearchFourth}
                handleSubmitSearch={handleSubmitSearch}
              />
            </Col>
            <Col sm={12}>
              <div className="essential">
                <div className="total-stores">
                  <div className="head-total">총 판매건수</div>
                  <div className="body-total">
                    {totalAmount}
                    <span>건</span>
                  </div>
                </div>
                <div className="total-sales">
                  <div className="head-total">매출총액</div>
                  <div className="body-total">
                    {totalMoney}
                    <span>원</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} className="table-price-4-5">
              <div className="title-table">상품별 매출통계표</div>
              <Table tableHeads={headRevenueProduct} tableBody={dataTable} />
            </Col>
          </Row>
        </Container>
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
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
      </div>
    </MainLayout>
  );
};

export default RevenueProduct;
