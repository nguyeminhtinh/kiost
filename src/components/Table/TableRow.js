// @flow
import React, { memo, useState } from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

type Props = {
  rowItem: Object,
  onClickTableRow?: Function,
  rowActive?: Object,
  isShowColumnBtn?: boolean,
  statusField?: string,
  isShowColumnBtnStatus?: boolean,
  statusActive?: boolean,
  valueStatusField?: Object,
  handleClickBtnDetail?: Function,
  isShowColumnCheck?: boolean,
  showLabel?: boolean,
  isShowId?: boolean
};

const TableRow = ({
  rowItem,
  onClickTableRow,
  rowActive,
  valueStatusField = {},
  isShowColumnBtn = false,
  handleClickBtnDetail = false,
  isShowColumnBtnStatus = false,
  statusField,
  statusActive,
  isShowColumnCheck = false,
  showLabel = false,
  isShowId
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const fieldId = 'id';
  const renderBtnStatus = item => {
    let className = '';
    let labelButton = '';
    switch (item && item.status) {
      case 1:
        className = valueStatusField[0].className;
        labelButton = valueStatusField[0].textLabe;
        break;
      case 2:
        className = valueStatusField[1].className;
        labelButton = valueStatusField[1].textLabe;
        break;
      case 3:
        className = valueStatusField[2] && valueStatusField[2].className;
        labelButton = valueStatusField[2] && valueStatusField[2].textLabe;
        break;
      case 4:
        className = valueStatusField[3] && valueStatusField[3].className;
        labelButton = valueStatusField[3] && valueStatusField[3].textLabe;
        break;
      default:
        className = '';
        labelButton = '';
        break;
    }
    if (!showLabel) {
      return (
        <>
          {labelButton && (
            <Button
              onClick={() => handleClickBtnDetail(item)}
              type="secondary"
              variant={`primary ${className}`}
            >
              {labelButton}
            </Button>
          )}
        </>
      );
    }
    return <p className={`mb-0 ${className}`}>{labelButton}</p>;
  };

  return (
    <tr
      onClick={() => onClickTableRow && onClickTableRow(rowItem)}
      className={`${onClickTableRow ? 'row-cursor-pointer' : ''} ${
        rowActive && rowActive.id === rowItem.id ? 'row-active' : ''
      }`}
    >
      {isShowColumnCheck && (
        <td>
          <Checkbox
            label=""
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
            }}
            name={rowItem && rowItem.id}
          />
        </td>
      )}
      {Object.keys(rowItem).map(item => (
        <td
          key={item}
          className={`${
            // eslint-disable-next-line no-nested-ternary
            isShowColumnBtnStatus && statusActive && rowItem.status === 1
              ? 'active'
              : isShowId && item === fieldId
              ? 'd-none'
              : ''
          }`}
        >
          {isShowColumnBtnStatus && item === statusField
            ? renderBtnStatus(rowItem)
            : rowItem[item]}
        </td>
      ))}
      {isShowColumnBtn && (
        <td>
          <Button
            onClick={() => handleClickBtnDetail(rowItem)}
            type="secondary"
          >
            상세보기
          </Button>
        </td>
      )}
    </tr>
  );
};
TableRow.defaultProps = {
  onClickTableRow: null,
  rowActive: null,
  isShowColumnBtn: false,
  isShowColumnBtnStatus: false,
  statusField: '',
  statusActive: false,
  valueStatusField: {},
  handleClickBtnDetail: () => {},
  isShowColumnCheck: false,
  showLabel: false,
  isShowId: false
};
export default memo<Props>(TableRow);
