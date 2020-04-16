// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { headInfoMember } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';

type Props = {
  match: {
    params: {
      phone: any
    }
  },
  getMemberDetail: Function,
  dataMemberInfo: Array<{}>,
  totalRows: number,
  customerPoit: number,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const MemberInfo = ({
  match,
  getMemberDetail,
  dataMemberInfo,
  totalRows,
  customerPoit,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    pageIndex: 0,
    pageNumber: 10
  });
  useEffect(() => {
    const { phone } = match.params;
    setParams({ ...params, phone });
    getMemberDetail({ ...params, phone });
  }, [match.params.phone, params.pageIndex]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const handleActivePage = eventKey => {
    getMemberDetail({ ...params, pageIndex: eventKey.selected });
  };

  return (
    <>
      <MainLayout>
        <div className="home-main">
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
            <Container fluid>
              <TitleHeader title="구매고객정보" />
              <Row>
                <Col sm={12}>
                  <div className="total">
                    <div className="total__title">총 적립금</div>
                    <div className="total__money">
                      <p>{customerPoit ? `${customerPoit}점` : '0점'}</p>
                    </div>
                  </div>
                </Col>
                <Col sm={12} className="table-price-4 custom-striped">
                  <div className="phoneMember">
                    <p className="label-phone">핸드폰번호</p>
                    <p className="number-phone">{match.params.phone}</p>
                  </div>
                  <Table
                    tableHeads={headInfoMember}
                    tableBody={dataMemberInfo}
                  />
                </Col>
              </Row>
            </Container>
          )}
        </div>
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleActivePage(eventKey)}
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
              nextLinkClassName="page-link"
              marginPagesDisplayed={1}
            />
          </Col>
        )}
      </MainLayout>
    </>
  );
};

export default MemberInfo;
