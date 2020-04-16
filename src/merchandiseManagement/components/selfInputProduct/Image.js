// @flow
import React, { memo } from 'react';
import { Col, Image } from 'react-bootstrap';

type Props = {
  elementImg: Object,
  handleGetImageSelector: Function,
  imgSelector: Object
};

const ImageBlock = ({
  elementImg,
  handleGetImageSelector,
  imgSelector
}: Props) => {
  return (
    <>
      {elementImg.value && (
        <Col
          xs={3}
          className={`mb-3 row-img ${
            imgSelector && imgSelector.id === elementImg.id ? 'active' : ''
          }`}
          onClick={() => {
            handleGetImageSelector(elementImg);
          }}
        >
          <Image
            width="90"
            height="90"
            className="d-block"
            src={elementImg.value}
            rounded
          />
          <p className="mb-0">
            {elementImg && elementImg.imageName && elementImg.imageName}
          </p>
        </Col>
      )}
    </>
  );
};

export default memo<Props>(ImageBlock);
