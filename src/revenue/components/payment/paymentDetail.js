// @flow
import React, { memo } from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

type Props = {
  listPaymentDetail: Function
};
const PaymentDetail = ({ listPaymentDetail }: Props) => {
  const {
    payType,
    companyName,
    productName,
    address,
    deviceCode
  } = listPaymentDetail;
  const phoneNumber =
    listPaymentDetail && listPaymentDetail.phoneNumber
      ? listPaymentDetail.phoneNumber.toString().replace(/-/gi, '')
      : '';
  const tel =
    listPaymentDetail && listPaymentDetail.tel ? listPaymentDetail.tel : '';
  let type = '';
  switch (payType) {
    case 'creditcard':
      type = '카드결제';
      break;
    case 'kakaopay':
      type = 'QR결제(카카오페이)';
      break;
    case 'point':
      type = '쿠폰결제';
      break;
    default:
      break;
  }
  const phone = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    7
  )}-${phoneNumber.slice(7, 11)}`;
  const phoneStore = `${tel.slice(0, 3)}-${tel.slice(3, 7)}-${tel.slice(
    7,
    11
  )}`;

  const isPoint = !!(
    listPaymentDetail &&
    (listPaymentDetail.point || listPaymentDetail.point > 0)
  );

  return (
    <>
      <Row className="mt-1 table-detail-payment">
        <Col xs={12}>
          <div className="scroll-popup">
            <div className="table-responsive mb-4">
              <table className="table table-bordered text-left mb-0">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-left">
                      결제정보
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-30">결제시간</td>
                    <td>
                      {listPaymentDetail &&
                        listPaymentDetail.createdAt &&
                        moment(listPaymentDetail.createdAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td>구분</td>
                    <td>{type}</td>
                  </tr>
                  <tr>
                    <td>결제상태</td>
                    <td>
                      {listPaymentDetail &&
                      listPaymentDetail.orderStatus &&
                      listPaymentDetail.orderStatus === 'paid'
                        ? '결제완료'
                        : '결제취소'}
                    </td>
                  </tr>
                  <tr>
                    <td>결제금액</td>
                    <td className="text-right">
                      {listPaymentDetail &&
                        listPaymentDetail.totalMoney &&
                        listPaymentDetail.totalMoney.toLocaleString('en')}
                      원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive pr-0 mb-4">
              <table className="table table-bordered text-left mb-0">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-left">
                      주문정보
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-30">상품명</td>
                    <td>{productName}</td>
                  </tr>

                  {isPoint && (
                    <>
                      <tr>
                        <td>적립금</td>
                        <td>
                          {listPaymentDetail &&
                            listPaymentDetail.point &&
                            listPaymentDetail.point.toLocaleString('en')}
                          점
                        </td>
                      </tr>
                      <tr>
                        <td>핸드폰번호</td>
                        <td>{phone}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-responsive pr-0">
              <table className="table table-bordered text-left mb-0">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-left">
                      매장정보
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-30">매장명</td>
                    <td>{companyName}</td>
                  </tr>
                  <tr>
                    <td>매장주소</td>
                    <td>{address}</td>
                  </tr>
                  <tr>
                    <td>매장전화번호</td>
                    <td>{phoneStore}</td>
                  </tr>
                  <tr>
                    <td>기기식별코드</td>
                    <td>{deviceCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default memo<Props>(PaymentDetail);
