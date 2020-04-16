// @flow
import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

type Props = {
  rowItem: Object
};

const TableRow = ({ rowItem }: Props) => {
  return (
    <Row>
      <Col xs={3} className="boder-item">
        {rowItem}
      </Col>
    </Row>
  );
};

export default memo<Props>(TableRow);
