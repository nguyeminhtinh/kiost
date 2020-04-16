// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import BoxDetail from '../../../components/BoxDetail';
import ModalPrimary from '../../../components/Modal';
import ModalPopUpDetail from './PopUpDetail';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import IMAGES from '../../../constants/images';

type Props = {
  match: {
    params: {
      id: any
    }
  },
  isProcessing: boolean,
  getInventoryListDetail: Function,
  inventoryListDetail: Array<{
    slotX: number,
    slotY: number,
    id: number,
    title: string,
    wearing: number,
    sale: number,
    stock: number,
    status: string,
    statusDay: string
  }>,
  inventoryProductDetail: Object,
  getInventoryProductDetail: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const InventoryDetail = ({
  match,
  isProcessing,
  getInventoryListDetail,
  inventoryListDetail,
  inventoryProductDetail,
  getInventoryProductDetail,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  // Show popUp
  const { id } = match.params;
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isShowPopUpNoProduct, setIsShowPopUpNoProduct] = useState(false);
  const [isShowPopUpAddProduct, setIsShowPopUpAddProduct] = useState(false);
  useEffect(() => {
    getInventoryListDetail(parseInt(id, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const closeModal = itemObj => {
    if (itemObj) {
      if (
        itemObj.status !== 'COMPLETE' &&
        itemObj.status !== 'CANCEL' &&
        (itemObj && itemObj.wearing !== 0)
      ) {
        if (itemObj.id) {
          getInventoryProductDetail(itemObj && itemObj.id);
          setIsShowPopUp(true);
        }
      }
    }

    if (itemObj && itemObj.status === 'COMPLETE') {
      setIsShowPopUpNoProduct(true);
    }

    if (
      ((itemObj && itemObj.wearing === 0) ||
        (itemObj && itemObj.wearing === null)) &&
      (itemObj.status !== 'COMPLETE' && itemObj.status !== 'CANCEL')
    ) {
      setIsShowPopUpAddProduct(true);
    }
  };

  const ChessBoard = () => {
    const rows = [];
    let objItemRow = [];
    for (let i = 1; i <= 7; i += 1) {
      objItemRow = inventoryListDetail.filter(item => item.slotY === i);
      rows.push(<ChessRow key={i} numberRow={i} objItemRow={objItemRow} />);
    }
    return (
      <div className="chess_board w-100">
        <div className="wrapper-status-inventory w-100">
          <div className="status-d1 btn">유효기간D-1</div>
          <div className="status-d2 btn">유효기간D-2</div>
          <div className="status-d3 btn">유효기간D-3</div>
        </div>
        {rows}
      </div>
    );
  };

  const ChessRow = numberRow => {
    const { objItemRow } = numberRow;
    const row = [];
    let objItemColumns = {};
    for (let i = 1; i <= 4; i += 1) {
      objItemColumns = objItemRow.filter(item => item.slotX === i);
      row.push(
        <ChessCell
          key={i}
          number={(1 - 1) * 4 + i}
          slotY={numberRow}
          objItemColumns={objItemColumns}
        />
      );
    }
    return <div className="chess_row w-100">{row}</div>;
  };

  const ChessCell = dataObj => {
    const slotX = dataObj.number;
    const slotY = dataObj && dataObj.slotY && dataObj.slotY.numberRow;
    const { objItemColumns } = dataObj;

    // eslint-disable-next-line consistent-return
    const renderStatusSort = objSort => {
      if ((objSort && objSort.wearing === 0) || (objSort && !objSort.wearing)) {
        if (objSort.slotX === slotX && objSort.slotY === slotY) {
          return (
            <div className="status-sale block bg-blue">
              <img src={IMAGES.imgNotSlot} alt="OutOfStock" />
            </div>
          );
        }
      }
      if (objSort && objSort.status === 'CANCEL') {
        if (objSort.slotX === slotX && objSort.slotY === slotY) {
          return (
            <div className="status-saleOff block">
              <img src={IMAGES.imgStopUse} alt="imgStopUse" />
            </div>
          );
        }
      }

      if (objSort && objSort.status === 'COMPLETE') {
        if (objSort.slotX === slotX && objSort.slotY === slotY) {
          return (
            <div className="status-sale block">
              <img src={IMAGES.imgOutOfStock} alt="OutOfStock" />
            </div>
          );
        }
      }
    };

    return (
      <div
        className="custom"
        onClick={() => closeModal(objItemColumns[0])}
        tabIndex={0}
        role="button"
        onKeyPress={() => {}}
      >
        <BoxDetail
          productName={objItemColumns[0] && objItemColumns[0].title}
          receipt={objItemColumns[0] && objItemColumns[0].wearing}
          stock={objItemColumns[0] && objItemColumns[0].sale}
          quantity={objItemColumns[0] && objItemColumns[0].stock}
          statusDay={objItemColumns[0] && objItemColumns[0].statusDay}
          key={objItemColumns[0] && objItemColumns[0].id}
        />
        {renderStatusSort(objItemColumns[0])}
      </div>
    );
  };
  const heddleRenderNumberColum = () => {
    return (
      <div className="render-number-colum">
        <div className="item">1층</div>
        <div className="item">2층</div>
        <div className="item">3층</div>
        <div className="item">4층</div>
        <div className="item">5층</div>
        <div className="item">6층</div>
        <div className="item">7층</div>
      </div>
    );
  };

  return (
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
        <div className="home-main wrap-slot">
          <Container fluid>
            <TitleHeader title="재고관리(슬롯)" />
            <Row>
              <Col
                xs={12}
                lg={12}
                xl={7}
                className="layer wrap-slot-content mb-3"
              >
                {heddleRenderNumberColum()}
                <ChessBoard />
              </Col>
            </Row>
          </Container>
          <ModalPrimary
            title="상품상세"
            content={
              <ModalPopUpDetail dataProductDetail={inventoryProductDetail} />
            }
            size="md"
            animation={false}
            isOpen={isShowPopUp}
            isShowTowBtn={false}
            textBtnLeft="확인"
            handleClose={() => {
              setIsShowPopUp(false);
            }}
            customClass="modal-center custom-popup-detail popup-detail-inventory"
          />
          {/* Modal No Data */}
          <ModalPrimary
            isOpen={isShowPopUpNoProduct}
            content={ERROR_MESSAGE.PRODUCT_ARE_OUT_OF_STOCK}
            handleClose={() => {
              setIsShowPopUpNoProduct(false);
            }}
            size="xs"
            customClass="modal-center"
            title="알림"
            isShowTowBtn={false}
            textBtnLeft="확인"
          />
          {/* Modal No Data */}
          <ModalPrimary
            isOpen={isShowPopUpAddProduct}
            content={ERROR_MESSAGE.PRODUCT_ARE_OUT_OF_STOCK_ADD_PRODUCT}
            handleClose={() => {
              setIsShowPopUpAddProduct(false);
            }}
            size="xs"
            customClass="modal-center"
            title="알림"
            isShowTowBtn={false}
            textBtnLeft="확인"
          />
        </div>
      )}
    </MainLayout>
  );
};

export default memo<Props>(InventoryDetail);
