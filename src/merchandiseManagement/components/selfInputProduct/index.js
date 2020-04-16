// @flow
import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import ProductManualSearch from 'components/Form/ProductManualSearch';
import Table from 'components/Table';
import Button from 'components/Button';
import Loading from 'components/Loading';

import { productManualHeadTable } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';

type Props = {
  history: {
    push: Function
  },
  totalRows: number,
  isProcessing: boolean,
  getMerchandiseManual: Function,
  dataMerchandiseManual: Array<{
    rowId: string,
    id: number,
    productCode: string,
    category: string,
    productName: string
  }>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const SelfProduct = ({
  history,
  getMerchandiseManual,
  dataMerchandiseManual,
  totalRows,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  // const [deviceCodeList, setDeviceCodeList] = useState([]);
  const [params, setParams] = useState({
    productName: '',
    deviceId: null,
    pageIndex: 0,
    pageNumber: 10,
    productCode: ''
  });

  const handleSubmitSearch = objSearch => {
    setParams(objSearch);
    getMerchandiseManual(objSearch);
  };

  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    const paramsRequest = { ...params, pageIndex: eventKey.selected };
    getMerchandiseManual(paramsRequest);
  };

  const handleMerchandiseDetail = item => {
    history.push(`/merchandise/manual/${item.id}`);
  };

  useEffect(() => {
    getMerchandiseManual(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleAddManualProduct = () => {
    history.push(`/merchandise/registerProduct`);
  };

  return (
    <>
      <MainLayout>
        <div className="home-main">
          <Container fluid>
            <TitleHeader title="자체상품관리" />
            <Row>
              <Col sm={12}>
                <ProductManualSearch handleSubmitSearch={handleSubmitSearch} />
              </Col>

              <Col
                sm={12}
                className="text-right top-status d-flex justify-content-end"
              >
                <div className="group-button my-4">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddManualProduct}
                  >
                    자체상품등록
                  </Button>
                </div>
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
                <Col sm={12} className="table-merchandise">
                  <Table
                    tableHeads={productManualHeadTable}
                    tableBody={dataMerchandiseManual}
                    statusField="status"
                    isShowColumnBtnStatus
                    onClickRow={handleMerchandiseDetail}
                    isShowId
                  />
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
              nextLinkClassName="page-link"
              marginPagesDisplayed={1}
            />
          </Col>
        )}
      </MainLayout>
    </>
  );
};

export default SelfProduct;
