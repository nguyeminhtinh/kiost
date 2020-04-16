// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

// Component
import { PrimaryButton } from 'components/Button';

storiesOf('Button', module)
  .addDecorator(withInfo)
  .add('Primary', () => (
    <PrimaryButton type="submit" variant="primary" onPress={action('clicked')}>
      Primary
    </PrimaryButton>
  ))
  .add('Secondary', () => (
    <PrimaryButton
      type="submit"
      variant="secondary"
      onPress={action('clicked')}
    >
      Secondary
    </PrimaryButton>
  ))
  .add('Danger', () => (
    <PrimaryButton type="submit" variant="danger" onPress={action('clicked')}>
      DangerDanger
    </PrimaryButton>
  ));
