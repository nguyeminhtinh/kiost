// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import BarChart from 'components/Charts/BarChart';

storiesOf('BarChart', module)
  .addDecorator(withInfo)
  .add('BarChart', () => {
    const data = [
      {
        id: 1,
        title: 'LA 갈비',
        value: 38,
        color: '#1f77b4'
      },
      {
        id: 2,
        title: '등심',
        value: 35,
        color: '#ff7f0e'
      },
      {
        id: 3,
        title: '한우',
        value: 30,
        color: '#2ca02c'
      },
      {
        id: 4,
        title: '삼겹살',
        value: 25,
        color: '#d62728'
      },
      {
        id: 5,
        title: '목살',
        value: 20,
        color: '#9467bd'
      },
      {
        id: 6,
        title: '살치살',
        value: 17,
        color: '#8c564b'
      },
      {
        id: 7,
        title: '꽃 듬심',
        value: 15,
        color: '#e377c2'
      },
      {
        id: 8,
        title: '항정살',
        value: 10,
        color: '#7f7f7f'
      },
      {
        id: 9,
        title: '스테이크',
        value: 5,
        color: '#bcbd22'
      },
      {
        id: 10,
        title: '돼지 갈비',
        value: 3,
        color: '#17becf'
      }
    ];
    return <BarChart data={data} titleChart="총 상품 매출 순위 Top10" />;
  });
