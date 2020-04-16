// @flow

import React, { memo, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import PaymentSearch from 'components/Form/PaymentSearch';
import Table from 'components/Table';
import ModalPrimary from 'components/Modal';
import PrimaryButton from 'components/Button';
// eslint-disable-next-line import/no-unresolved
import moment from 'moment';
import PaymentDetail from './paymentDetail';
import { headerPayment } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { listValueStatusPayment } from '../../../constants/listStatusTable';

type Props = {
  openModal?: Function,
  isProcessing: boolean,
  isOpenModal?: boolean,
  closeModal?: Function,
  getListPayment: Function,
  listPayment: Function,
  totalRows: number,
  getListPaymentDetail: Function,
  listPaymentDetail: Object,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  getAllListPaymentHistory: Function,
  listAllPayment: Array<{}>
};

const HistoryPayment = ({
  isProcessing,
  openModal = () => {},
  isOpenModal = false,
  closeModal = () => {},
  getListPayment,
  listPayment,
  totalRows,
  getListPaymentDetail,
  listPaymentDetail,
  isOpenNotify,
  notifyAccountDenied,
  getAllListPaymentHistory,
  listAllPayment
}: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [params, setParams] = useState({
    pageIndex: 1,
    startDay: moment(new Date()).format('YYYY-MM-DD'),
    endDay: moment(new Date()).format('YYYY-MM-DD'),
    paymentType: null,
    status: null
  });

  useEffect(() => {
    getListPayment(params);
    /**
     * TODO: just assume maximum page size, will update this
     */
    getAllListPaymentHistory({
      ...params,
      pageSize: 9999999
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSubmitSearch = dataSearch => {
    setParams(dataSearch);
    getListPayment(dataSearch);
  };
  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    setPaginationIndex(eventKey.selected);
    const paramsRequest = { ...params, pageIndex: eventKey.selected + 1 };
    getListPayment(paramsRequest);
  };
  const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
  const fileExtension = '.xlsx';

  const exportToExcel = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <MainLayout>
        <div className="member-page border">
          <Container fluid>
            <TitleHeader title="결제내역" />
            <Row>
              <Col sm={12}>
                <PaymentSearch handleSubmitSearch={handleSubmitSearch} />
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
                  <div className="text-right px-3 w-100">
                    <PrimaryButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        exportToExcel(listAllPayment, 'payment-history');
                      }}
                      disabled={listAllPayment && listAllPayment.length <= 0}
                    >
                      엑셀 다운로드
                    </PrimaryButton>
                  </div>
                  <Col sm={12} className="table-price-5-7 mt-3">
                    <Table
                      tableHeads={headerPayment}
                      tableBody={listPayment}
                      statusField="status"
                      valueStatusField={listValueStatusPayment}
                      isShowColumnBtnStatus
                      showLabel
                      isShowId
                      isShowColumnBtn
                      handleClickBtnDetail={item => {
                        openModal();
                        getListPaymentDetail(item.id);
                      }}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={paginationIndex}
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
        {!isProcessing && (
          <ModalPrimary
            title="결제내역 상세"
            size="md"
            content={<PaymentDetail listPaymentDetail={listPaymentDetail} />}
            animation={false}
            isOpen={isOpenModal}
            handleClose={() => {
              closeModal();
            }}
            textBtnLeft="닫기"
            customClass="modal-center modal-payment"
          />
        )}
      </MainLayout>
    </>
  );
};

HistoryPayment.defaultProps = {
  openModal: () => {},
  isOpenModal: false,
  closeModal: () => {}
};
export default memo<Props>(HistoryPayment);
