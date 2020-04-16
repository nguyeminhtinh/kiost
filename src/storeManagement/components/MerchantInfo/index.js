// @flow
// libs
import React, { memo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, FormControl, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import Table from 'components/Table';
import Input from 'components/Input';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { headItemsDeviceStore } from '../../../constants/headerTable';

type Props = {
  history: {
    push: Function
  },
  isProcessing: boolean,
  dataStoreDetail: Object,
  getStoreDetail: Function,
  listDevice: Array<{
    id: number,
    nameDevice: string,
    deviceCode: string,
    frozen: string
  }>,
  totalRows: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
export const MerchantInfo = ({
  history,
  isProcessing,
  dataStoreDetail,
  getStoreDetail,
  listDevice,
  totalRows,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const handleDeviceDetail = item => {
    history.push(`/device/${item.id}`);
  };
  useEffect(() => {
    getStoreDetail({ pageIndex: 1, numberRows: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    getStoreDetail({ pageIndex: eventKey.selected + 1, numberRows: 10 });
  };

  return (
    <>
      <div className="">
        <MainLayout>
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
            <Container fluid className="py-3 home-main">
              <TitleHeader title="매장조회" />
              {dataStoreDetail ? (
                <div className="wrapper__info mb-5 bg-white">
                  <div className="card-header edit-store">기본정보</div>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">사업자 등록번호</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.businessReg}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">매장 코드</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.erpTraderCode}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">매장명</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.companyName}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">매장주소</div>
                    </div>
                    <div className="col-md-9 py-2">
                      <Row>
                        <div className="col-12 col-md-9 pr-md-0">
                          <Input
                            type="text"
                            value={dataStoreDetail && dataStoreDetail.address}
                            disabled
                          />
                        </div>
                        <div className="col-12 col-md-3 mt-2 mt-md-0 ">
                          <Input
                            type="text"
                            value={
                              dataStoreDetail && dataStoreDetail.addressDetail
                            }
                            disabled
                          />
                        </div>
                      </Row>
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">매장 전화번호</div>
                    </div>
                    <div className="col-md-9 py-2">
                      <Row className="row-50 mr-0">
                        <div className="col-4 d-line">
                          <Input
                            type="text"
                            value={
                              dataStoreDetail && dataStoreDetail.phoneFirst
                            }
                            disabled
                          />
                        </div>
                        <div className="col-4 d-line">
                          <Input
                            type="text"
                            value={
                              dataStoreDetail && dataStoreDetail.phoneSecond
                            }
                            disabled
                          />
                        </div>
                        <div className="col-4 pr-0">
                          <Input
                            type="text"
                            value={dataStoreDetail && dataStoreDetail.phoneEnd}
                            disabled
                          />
                        </div>
                      </Row>
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">대표자명</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.ceoName}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">계산서 발행 방법</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.niceYN}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">이메일 주소</div>
                    </div>
                    <div className="col-md-9 py-2 input-50">
                      <Input
                        type="text"
                        value={dataStoreDetail && dataStoreDetail.taxEmail}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">사업의 종류</div>
                    </div>
                    <div className="col-md-9 py-2">
                      <Row>
                        <div className="col-12 col-md-6 pr-md-0">
                          <Input
                            type="text"
                            value={
                              dataStoreDetail && dataStoreDetail.taxBusinessType
                            }
                            disabled
                          />
                        </div>
                        <div className="col-12 col-md-6 mt-2 mt-md-0">
                          <Input
                            type="text"
                            value={
                              dataStoreDetail &&
                              dataStoreDetail.taxBusinessCategory
                            }
                            disabled
                          />
                        </div>
                      </Row>
                    </div>
                  </Row>
                  <Row className="row__custom">
                    <div className="col-md-3 d-flex align-items-center py-2">
                      <div className="title">기타 특이사항</div>
                    </div>
                    <div className="col-md-9 py-2">
                      <FormControl
                        as="textarea"
                        aria-label="With textarea"
                        disabled
                        value={dataStoreDetail && dataStoreDetail.traderMemo}
                      />
                    </div>
                  </Row>
                </div>
              ) : (
                <div className="text-center my-5">
                  데이터가 존재하지 않습니다.
                </div>
              )}

              <div className="wrapper__info">
                <div className="card">
                  <div className="card-header">기기정보</div>
                  <div className="card-body table-wid-style1">
                    <Table
                      tableHeads={headItemsDeviceStore}
                      tableBody={listDevice}
                      onClickRow={handleDeviceDetail}
                      isShowId
                    />
                  </div>
                </div>
              </div>
            </Container>
          )}

          {totalRows > 10 && (
            <div sm={12} className="wrapper-pagination">
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
            </div>
          )}
        </MainLayout>
      </div>
    </>
  );
};

export default memo<Props>(MerchantInfo);
