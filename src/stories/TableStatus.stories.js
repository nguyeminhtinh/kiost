// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TableStatus from 'components/TableStatus';
import { rowItems, headItems } from 'mockData/tableStatus';

storiesOf('TableStatus', module)
  .addDecorator(withInfo)
  .add('Table Data', () => (
    <TableStatus tableHeads={headItems} tableBody={rowItems} />
  ));
