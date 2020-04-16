// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import LineChart from 'components/Charts/LineChart';

storiesOf('LineChart', module)
  .addDecorator(withInfo)
  .add('LineChart', () => {
    const data = [
      {
        title: '3시',
        value: 4000
      },
      {
        title: '6시',
        value: 2300
      },
      {
        title: '9시',
        value: 3000
      },
      {
        title: '12시',
        value: 3500
      },
      {
        title: '15시',
        value: 2000
      }
    ];
    return <LineChart data={data} titleChart="현재 매출" unit="1,000,000원" />;
  });
