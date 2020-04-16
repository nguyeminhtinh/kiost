// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Immutable from 'seamless-immutable';

import Loading from 'components/Loading';
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'components/Table';
import PrimarySearch from '../../../components/Form/PrimarySearch';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import { ModalPrimary } from '../../../components/Modal';
import listPage from '../../../constants/listPageSize';
import { headDevice } from '../../../constants/headerTable';
import { listValueStatusDrive } from '../../../constants/listStatusTable';

type Props = {
  getListDevices: Function,
  listDevices: Array<{}>,
  history: {
    push: Function
  },
  isProcessing: boolean,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  totalRows: number,
  devicesInfo: Object,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const Device = ({
  getListDevices,
  listDevices,
  history,
  isProcessing,
  getDeviceCode,
  deviceCodes,
  totalRows,
  devicesInfo,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    pageSize: 10,
    deviceType: '',
    frozenType: '',
    deviceStatus: '',
    deviceId: '',
    pageIndex: 0
  });
  const handleSubmitSearch = value => {
    setParams(value);
    getListDevices(value);
  };

  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    const paramsRequest = { ...params, pageIndex: eventKey.selected };
    getListDevices(paramsRequest);
  };

  useEffect(() => {
    getListDevices(params);
  }, []);

  useEffect(() => {
    getDeviceCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCodes.length]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);
  // Popup no data Detail
  const [popupCancel, setPopupCancel] = useState({
    isShow: false,
    content: ''
  });

  const handleClickRowDevice = item => {
    if (item && item.id) {
      history.push(`device/${item.id}`);
    }
  };

  const closePopupCancel = () => {
    setPopupCancel({
      ...popupCancel,
      isShow: false
    });
  };

  return (
    <>
      <MainLayout>
        <Container fluid className="form-device-page device-page border">
          <Row>
            <Col xs={12}>
              <TitleHeader title="기기 조회" />
              <PrimarySearch
                listPage={listPage}
                handleSubmitSearch={handleSubmitSearch}
                deviceCodes={Immutable.asMutable(deviceCodes)}
              />

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
                  <div sm={12}>
                    <div className="table-status pl-0  my-4 table-responsive table-right-md pl-0 w-md-75">
                      <table className="table table-striped table-responsive col-sm-6 col-md-12 table-bordered text-center mb-0 px-0">
                        <thead>
                          <tr>
                            <th scope="col">전체</th>
                            <th scope="col">사용중</th>
                            <th scope="col">사용해지</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {(devicesInfo && devicesInfo.countAll) || 0}
                            </td>
                            <td>
                              {(devicesInfo && devicesInfo.countInUse) || 0}
                            </td>
                            <td>
                              {(devicesInfo && devicesInfo.countUsed) || 0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="table-wid-style4">
                    <Table
                      tableHeads={headDevice}
                      tableBody={listDevices}
                      onClickRow={handleClickRowDevice}
                      statusField="status"
                      showLabel
                      valueStatusField={listValueStatusDrive}
                      isShowColumnBtnStatus
                      isShowId
                    />
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
        {totalRows > params.pageSize && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.pageSize)}
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
      <ModalPrimary
        title="알림"
        content={popupCancel.content}
        isOpen={popupCancel.isShow}
        handleClose={() => {
          closePopupCancel();
        }}
        isShowTowBtn={false}
        textBtnLeft="확인"
      />
    </>
  );
};

export default memo<Props>(Device);
