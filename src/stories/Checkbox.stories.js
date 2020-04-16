// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Checkbox } from 'components/Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withInfo)
  .add('Primary', () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Checkbox
        name="rememberMe"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        checked={isChecked}
        label="label example"
      />
    );
  });
