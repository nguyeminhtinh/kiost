// @flow
import React, { memo } from 'react';

type Props = {
  dataProductDetail: Object
};
const ModalPopUpDetail = ({ dataProductDetail }: Props) => {
  console.log(dataProductDetail, 'dataProductDetail');
  return (
    <>
      <div className="pb-3 popup-product-detail">
        <div className="row">
          <div className="col-12 col-sm-5 left">
            <div className="img-left mb-3">
              {dataProductDetail && dataProductDetail.url_image ? (
                <img
                  src={
                    dataProductDetail &&
                    dataProductDetail.url_image &&
                    dataProductDetail.url_image
                  }
                  alt="product"
                  width="90"
                  height="90"
                  className="d-block"
                />
              ) : (
                <div className="d-flex img-none">상품이미지영역</div>
              )}
            </div>
            <h2>
              {dataProductDetail &&
                dataProductDetail.name_product &&
                dataProductDetail.name_product}
            </h2>
            {dataProductDetail && dataProductDetail.origin && (
              <p>{`${dataProductDetail.origin}/${dataProductDetail.rank}`}</p>
            )}
            <h3>
              {dataProductDetail &&
                dataProductDetail.price &&
                dataProductDetail.price}
              <span>원</span>
            </h3>
          </div>
          <div className="col-12 col-sm-7 right">
            <div className="content-detail">
              <div className="item d-flex">
                <div className="label">금액</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.price &&
                    `${dataProductDetail.price}원`}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">중량</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.weight &&
                    `${dataProductDetail.weight}g`}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">원산지</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.origin &&
                    dataProductDetail.origin}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">등급</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.rank &&
                    dataProductDetail.rank}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">유효기한</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.expiration_date &&
                    dataProductDetail.expiration_date}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">상품수량/입고개수</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.goods_receipt &&
                    dataProductDetail.goods_receipt}
                </div>
              </div>
              <div className="item d-flex">
                <div className="label">상품위치</div>
                <div className="value">
                  {dataProductDetail &&
                    dataProductDetail.location &&
                    dataProductDetail.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo<Props>(ModalPopUpDetail);
