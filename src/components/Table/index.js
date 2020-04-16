// @flow
import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import TableRow from './TableRow';

type Props = {
  tableHeads: Array<{ id: number, name: string }>,
  tableBody: Array<{ id: number }>,
  onClickRow?: Function,
  rowActive?: Object,
  isShowColumnBtn?: boolean,
  isShowColumnBtnStatus?: boolean,
  statusField?: string,
  statusActive?: boolean,
  valueStatusField?: Object,
  handleClickBtnDetail?: Function,
  isShowColumnCheck?: boolean,
  showLabel?: boolean,
  isShowId?: boolean
};

const TableData = ({
  tableHeads,
  tableBody,
  onClickRow,
  rowActive,
  isShowColumnBtn = false,
  isShowColumnBtnStatus = false,
  statusField,
  valueStatusField,
  statusActive,
  showLabel = false,
  handleClickBtnDetail = () => {},
  isShowColumnCheck = false,
  isShowId
}: Props) => {
  const renderBodyTable =
    tableBody &&
    tableBody.map(item => (
      <TableRow
        onClickTableRow={onClickRow}
        rowItem={item}
        key={item.id}
        showLabel={showLabel}
        rowActive={rowActive}
        isShowColumnBtn={isShowColumnBtn}
        isShowColumnBtnStatus={isShowColumnBtnStatus}
        statusField={statusField}
        handleClickBtnDetail={handleClickBtnDetail}
        valueStatusField={valueStatusField}
        statusActive={statusActive}
        isShowColumnCheck={isShowColumnCheck}
        isShowId={isShowId}
      />
    ));

  const renderBody = () => {
    if (renderBodyTable && renderBodyTable.length > 0) {
      return renderBodyTable;
    }
    return (
      <tr className="p-3 text-center table-no-data w-100">
        <td colSpan={tableHeads && tableHeads.length}>
          <p className="mb-0">데이터가 존재하지 않습니다.</p>
        </td>
      </tr>
    );
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <TableHead listItems={tableHeads} />
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  );
};

TableData.defaultProps = {
  onClickRow: null,
  rowActive: null,
  isShowColumnBtn: false,
  isShowColumnBtnStatus: false,
  statusField: '',
  statusActive: false,
  valueStatusField: null,
  handleClickBtnDetail: () => {},
  isShowColumnCheck: false,
  showLabel: false,
  isShowId: false
};
export default memo<Props>(TableData);
