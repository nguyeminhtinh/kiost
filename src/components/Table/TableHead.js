// @flow
import React, { memo } from 'react';

type Props = {
  listItems: Array<{ id: number, name: string }>
};

const TableHead = ({ listItems }: Props) => (
  <tr>
    {listItems.map(item => (
      <th key={item.id}>{item && item.name}</th>
    ))}
  </tr>
);

export default memo<Props>(TableHead);
