// @flow
// libs
import React, { memo } from 'react';

type Props = {
  payload: Array<{
    id: number,
    label: string,
    value: number
  }>,
  label: string
};

const CustomTooltip = ({ label, payload }: Props) => {
  const active = true;
  const renderTooltip = () => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : ${payload &&
              payload[0] &&
              payload[0].value.toLocaleString('en')}`}
          </p>
        </div>
      );
    }
    return null;
  };
  return <div>{renderTooltip()}</div>;
};

export default memo<Props>(CustomTooltip);
