// @flow
// libs
import React, { memo } from 'react';

type Props = {
  productName: string,
  receipt: number,
  stock: number,
  quantity: number,
  statusDay: string
};
export const BoxDetail = ({
  productName,
  receipt,
  stock,
  quantity,
  statusDay
}: Props) => {
  let checkStatus = '';
  switch (statusDay) {
    case 'D-1':
      checkStatus = 'box-green';
      break;
    case 'D-2':
      checkStatus = 'box-blue ';
      break;
    case 'D-3':
      checkStatus = 'box-yellow';
      break;
    case 'D++':
      checkStatus = 'animation';
      break;
    default:
      break;
  }

  return (
    <div className="box-detail">
      <div className={checkStatus}>
        <div className="box-detail__title">{productName}</div>
        <div className="box-detail__body icon-import ">
          <p>입고</p>
          <p>{receipt}</p>
        </div>
        <div className="box-detail__body icon-exist">
          <p>판매</p>
          <p>{stock}</p>
        </div>
        <div className="box-detail__body icon-sell">
          <p>재고</p>
          <p>{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(BoxDetail);
