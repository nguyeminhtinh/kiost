// @flow
import React, { memo } from 'react';
import TableStatus from '../../../components/TableStatus';
import { headDeviceStatus } from '../../../constants/headerTable';

type Props = {
  inforGeneral: Object
};

const TableDeiceStatus = ({ inforGeneral }: Props) => {
  return (
    <div className="device-status">
      <TableStatus tableHeads={headDeviceStatus} tableBody={inforGeneral} />
    </div>
  );
};

export default memo<Props>(TableDeiceStatus);
