// @flow

import React from 'react';
// import Icon from 'components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

type Props = {
  imageSrc: string,
  isVisible: boolean,
  handleClose: Function
};
export const ImageViewer = ({ imageSrc, isVisible, handleClose }: Props) => {
  return isVisible ? (
    <div className="image-viewer justify-center align-center">
      <div className="popup-image-review">
        <div className="head-popup">
          <h4>이미지 미리보기</h4>
          <button
            type="button"
            onClick={handleClose}
            className="image-viewer__close-btn"
          >
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
        </div>

        <img
          className="image-viewer__image max-500"
          src={imageSrc}
          alt="imgViewer"
        />
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-primary mb-3 mt-3 btn-close-review"
        >
          확인
        </button>
      </div>
    </div>
  ) : null;
};

export default ImageViewer;
