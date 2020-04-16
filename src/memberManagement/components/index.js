// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import ThirdSearch from 'components/Form/ThirdSearch';
import Table from 'components/Table';
import { headMember } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import listPage from '../../constants/listPageSize';

type Props = {
  history: {
    push: Function
  },
  getListMembers: Function,
  getDeviceCode: Function,
  isProcessing: boolean,
  listMembers: Array<{}>,
  deviceCodes: Array<{}>,
  totalRows: number,
  totalCustomer: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const MemberManagement = ({
  history,
  isProcessing,
  getListMembers,
  listMembers,
  getDeviceCode,
  deviceCodes,
  totalRows,
  totalCustomer,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [paramFilter, setParamFilter] = useState({
    deviceId: null,
    pageIndex: 0,
    pageSize: 10,
    phoneNumber: ''
  });
  const handleSubmitSearch = objSearch => {
    setParamFilter(objSearch);
  };

  // const handleViewDetail = item => {
  //   history.push(`members/${item.id}`);
  // };

  useEffect(() => {
    getDeviceCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListMembers(paramFilter);
  }, [
    paramFilter && paramFilter.deviceId,
    paramFilter && paramFilter.pageIndex,
    paramFilter && paramFilter.pageSize,
    paramFilter && paramFilter.phoneNumber
  ]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const handleActivePage = eventKey => {
    getListMembers({ ...paramFilter, pageIndex: eventKey.selected });
  };

  const handleClickViewDetail = item => {
    history.push(`members/${item && item.phone}`);
  };
  return (
    <>
      <MainLayout>
        <div className="member-page border">
          <Container fluid>
            <TitleHeader title="구매고객관리" />
            <Row>
              <Col sm={12}>
                <ThirdSearch
                  listPage={listPage}
                  listDeviceCode={Immutable.asMutable(deviceCodes)}
                  handleChange={handleSubmitSearch}
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
                <>
                  <Col sm={12} className="d-flex justify-content-end">
                    <div className="table-status col-12 col-sm-6 col-md-4 col-xl-3 pl-0 table-responsive my-4 number-total pr-0">
                      <table className="table table-striped table-bordered text-center mb-0 pr-0">
                        <thead>
                          <tr>
                            <th scope="col">총 방문 고객 수</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {totalCustomer ? `${totalCustomer}명` : '0명'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>

                  <Col sm={12} className="table-price-3">
                    <Table
                      tableHeads={headMember}
                      tableBody={listMembers}
                      onClickRow={handleClickViewDetail}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > paramFilter.pageSize && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / paramFilter.pageSize)}
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

export default memo<Props>(MemberManagement);
