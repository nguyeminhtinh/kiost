// @flow

import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import Button from 'components/Button';
import AdvertisementSearch from 'components/Form/advertisementSearch';
import Table from 'components/Table';
import { headAdvertisement } from '../../constants/headerTable';
import DataAdvertisement from '../../mockData/DataAdvertisement';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import listPage from '../../constants/listPageSize';
import { listAdvertisement } from '../../constants/listKey';
import FormAdvertisementStatus from './TableStatus';
import { listValueStatusAd } from '../../constants/listStatusTable';

type Props = {
  history: {
    push: Function
  },
  isProcessing: boolean
};

const AdvertisementManagement = ({ history, isProcessing }: Props) => {
  const handleSubmitSearch = value => {
    console.log(value, 'Asdasd');
  };
  const totalCount = 100;
  const handleAddAdvertisement = () => {
    history.push(`/advertisement/add`);
  };
  const handleClickAdDetail = item => {
    history.push(`advertisement/${item.id}`);
  };
  return (
    <>
      {isProcessing && (
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
      )}
      <MainLayout>
        <div className="home-main">
          <Container fluid>
            <TitleHeader title="광고관리" />
            <Row>
              <Col sm={12}>
                <AdvertisementSearch
                  listPage={listPage}
                  listKey={listAdvertisement}
                  handleChange={handleSubmitSearch}
                />
              </Col>
              <Col sm={12}>
                <div className="top-status custom-block">
                  <div className="right-sm">
                    <FormAdvertisementStatus />
                  </div>

                  <div className="group-button my-4">
                    <div className="view-products">
                      <Button
                        type="submit"
                        variant="primary"
                        onClick={() => {}}
                      >
                        광고 삭제
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => {
                        handleAddAdvertisement();
                      }}
                    >
                      광고 등록
                    </Button>
                  </div>
                </div>
              </Col>

              <Col sm={12} className="tableAd">
                <Table
                  tableHeads={headAdvertisement}
                  tableBody={DataAdvertisement.advertisement}
                  statusField="status"
                  valueStatusField={listValueStatusAd}
                  isShowColumnBtnStatus
                  isShowColumnCheck
                  handleClickBtnDetail={handleClickAdDetail}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Col sm={12} className="wrapper-pagination">
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel={<span className="gap">...</span>}
            pageCount={Math.ceil(totalCount / 10)}
            // onPageChange={eventKey => handleActivePage(eventKey)}
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
      </MainLayout>
    </>
  );
};

export default memo<Props>(AdvertisementManagement);
