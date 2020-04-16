// @flow

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import InventorySearch from 'components/Form/InventorySearch';
import Loading from 'components/Loading';
import Table from 'components/Table';
import { headInventory } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import listPage from '../../constants/listPageSize';

type Props = {
  history: {
    push: Function
  },
  getInventoryList: Function,
  inventoryList: Array<{}>,
  isProcessing: boolean,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  totalRows: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const InventoryManagement = ({
  history,
  getInventoryList,
  inventoryList,
  isProcessing,
  totalRows,
  getDeviceCode,
  deviceCodes,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    deviceId: null,
    deviceType: null,
    frozenType: null,
    pageIndex: 0,
    pageNumber: 10
  });
  const handleSubmitSearch = value => {
    setParams(value);
    getInventoryList(value);
  };
  const handleViewDetail = item => {
    history.push(`/inventory/${item.id}`);
  };

  useEffect(() => {
    getInventoryList(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getDeviceCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCodes.length]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    const paramsRequest = { ...params, pageIndex: eventKey.selected };
    getInventoryList(paramsRequest);
  };

  return (
    <>
      <MainLayout>
        <div className="inventory-page border">
          <Container fluid>
            <TitleHeader title="재고관리" />
            <Row>
              <Col sm={12}>
                <InventorySearch
                  listDeviceCode={Immutable.asMutable(deviceCodes)}
                  listPage={listPage}
                  handleSubmitSearch={handleSubmitSearch}
                />
              </Col>
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
                <Col sm={12}>
                  <div className="table-wid-style2">
                    <Table
                      tableHeads={headInventory}
                      tableBody={inventoryList}
                      isShowId
                      onClickRow={handleViewDetail}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > params.pageNumber && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.pageNumber)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={params.pageIndex || 0}
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
    </>
  );
};

export default InventoryManagement;
