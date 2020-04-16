// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import TableData from 'components/Table';
import SelectDropdown from 'components/Select';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import { headStorePopup } from '../../constants/headerTable';
// import storeItemsPopup from '../../mockData/storeItemsPopup';
import filterStoreItems from '../../mockData/filterStoreItems';

const ContenPopup = () => {
  const [selectedStore, setSelectedStore] = useState({
    id: 1,
    value: 'name',
    label: '가맹점명'
  });
  const [rowActive, setrowActive] = useState({});

  const onClickRow = rowData => {
    setrowActive(rowData);
  };
  return (
    <>
      <Row className="row__custom register-device__popup">
        <Col xs={3}>
          <SelectDropdown
            listItem={filterStoreItems}
            defaultValue={selectedStore}
            onChange={optionStore => {
              setSelectedStore({ optionStore });
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
        </Col>
        <Col xs={6}>
          <Input onChange={() => {}} />
        </Col>
        <Col xs={3}>
          <PrimaryButton type="button" variant="secondary" onClick={() => {}}>
            검색
          </PrimaryButton>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <TableData
            tableHeads={headStorePopup}
            // tableBody={storeItemsPopup}
            onClickRow={onClickRow}
            rowActive={rowActive}
          />
        </Col>
      </Row>
    </>
  );
};

export default ContenPopup;
