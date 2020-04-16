// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Table from 'components/Table';
import { rowItems, headItems } from 'mockData/tableItems';

storiesOf('Table', module)
  .addDecorator(withInfo)
  .add('Table Data', () => (
    <Table tableHeads={headItems} tableBody={rowItems} />
  ));
