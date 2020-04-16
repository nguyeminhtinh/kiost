// @flow
import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

type Props = {
  listItems: Array<{ id: number, name: string }>
};

const TableHead = ({ listItems }: Props) => (
  <Row>
    {listItems.map(item => (
      <Col key={item.id} xs={3} className="boder-item title">
        {item && item.name}
      </Col>
    ))}
  </Row>
);

export default memo<Props>(TableHead);
