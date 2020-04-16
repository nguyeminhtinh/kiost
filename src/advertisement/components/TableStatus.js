// @flow
import React from 'react';
import TableStatus from '../../components/TableStatus';
import { DataAdvertisement } from '../../mockData/DataAdvertisement';
import { headAdvertisementStatus } from '../../constants/headerTable';

const TableDeiceStatus = () => {
  return (
    <div className="device-status">
      <TableStatus
        tableHeads={headAdvertisementStatus}
        tableBody={DataAdvertisement.information}
      />
    </div>
  );
};

export default TableDeiceStatus;
