// @flow
import React, { useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';

import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import MerchandiseSearch from 'components/Form/MerchandiseSearch';
import Table from 'components/Table';
import Button from 'components/Button';
import Loading from 'components/Loading';

import { headMerchandise } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import { searchTypeProductPage } from '../../constants/listKey';
import listPage from '../../constants/listPageSize';
import { listValueStatusProduct } from '../../constants/listStatusTable';

type Props = {
  history: {
    push: Function
  },
  getMerchandise: Function,
  productList: Array<{
    id: number,
    productCode: string,
    productCategory: string,
    productName: string,
    validity: string,
    productLocation: string,
    quantity: number,
    status: number
  }>,
  statusProducts: Object,
  totalRows: number,
  getCategories: Function,
  categories: Array<{}>,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const MerchandiseManagement = ({
  history,
  getMerchandise,
  productList,
  statusProducts,
  totalRows,
  getCategories,
  categories,
  getDeviceCode,
  deviceCodes,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [deviceCodeList, setDeviceCodeList] = useState([]);
  const [params, setParams] = useState({
    numberRows: 10,
    productStatus: '',
    categoryId: null,
    productName: '',
    codeDevice: null,
    location: '',
    currentPage: 0,
    expired: false
  });

  const handleSubmitSearch = value => {
    setParams(value);
    getMerchandise(value);
  };

  const handleSelectPagination = eventKey => {
    setParams({ ...params, currentPage: eventKey.selected });
    const paramsRequest = { ...params, currentPage: eventKey.selected };
    getMerchandise(paramsRequest);
  };

  const handleAddMerchandise = () => {
    history.push(`/merchandise/add`);
  };

  const handleMerchandiseDetail = item => {
    history.push({
      pathname: `/merchandise/${item.id}`,
      state: { productStockId: item.productStockId }
    });
  };

  useEffect(() => {
    getCategories();
    getDeviceCode();
    // setCategoryList(categories);
    setDeviceCodeList(deviceCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length, deviceCodes.length]);

  useEffect(() => {
    getMerchandise(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleCheckEXP = paramBody => {
    setParams({ ...params, expired: true });
    getMerchandise({ ...paramBody, currentPage: 0, expired: true });
  };
  const defaultCategoriesOptions = {
    id: 0,
    value: '',
    label: '전체'
  };
  const listCategoryProduct =
    categories === undefined || categories === null
      ? []
      : Immutable.asMutable([defaultCategoriesOptions, ...categories]);

  return (
    <>
      <MainLayout>
        <div className="home-main">
          <Container fluid>
            <TitleHeader title="입고상품관리" />
            <Row>
              <Col sm={12}>
                <MerchandiseSearch
                  listDeviceCode={Immutable.asMutable(deviceCodeList)}
                  listKey={searchTypeProductPage}
                  listPage={listPage}
                  handleSubmitSearch={handleSubmitSearch}
                  listCategory={listCategoryProduct}
                />
              </Col>

              <Col sm={12} className="text-right top-status">
                <div className="table-status pl-0  my-4 table-responsive table-right-md pl-0 w-md-75">
                  <table className="table table-striped table-responsive col-sm-6 col-md-12 table-bordered text-center mb-0 px-0">
                    <thead>
                      <tr>
                        <th scope="col">진열대기</th>
                        <th scope="col">진열완료</th>
                        <th scope="col">판매취소</th>
                        <th scope="col">판매완료</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {statusProducts && statusProducts.waiting
                            ? statusProducts.waiting
                            : 0}
                        </td>
                        <td>
                          {statusProducts && statusProducts.dpComplete
                            ? statusProducts.dpComplete
                            : 0}
                        </td>
                        <td>
                          {statusProducts && statusProducts.cancel
                            ? statusProducts.cancel
                            : 0}
                        </td>
                        <td>
                          {statusProducts && statusProducts.complete
                            ? statusProducts.complete
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="group-button my-4">
                  <div className="view-products">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => handleCheckEXP(params)}
                    >
                      유효기간 임박 상품 보기
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddMerchandise}
                  >
                    입고상품등록
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
                <Col sm={12} className="table-merchandise productStockId-none">
                  <Table
                    tableHeads={headMerchandise}
                    tableBody={productList}
                    statusField="status"
                    valueStatusField={listValueStatusProduct}
                    isShowColumnBtnStatus
                    onClickRow={handleMerchandiseDetail}
                    // handleClickBtnDetail={handleMerchandiseDetail}
                    isShowId
                  />
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > params.numberRows && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.numberRows)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={params.currentPage || 0}
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

export default MerchandiseManagement;
