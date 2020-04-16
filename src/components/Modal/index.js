// @flow
// libs
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';

type Props = {
  title: string,
  content: any,
  animation?: boolean,
  isOpen: boolean,
  size?: string,
  handleClose: Function,
  customClass?: string,
  isShowTowBtn?: boolean,
  classNameBtnRight?: string,
  handleSubmit?: Function,
  handleCloseIco?: Function,
  textBtnLeft?: string,
  textBtnRight?: string,
  isShowCloseIco?: boolean
};

export const ModalPrimary = ({
  title,
  content,
  animation = false,
  isOpen,
  size,
  handleClose,
  customClass,
  isShowTowBtn,
  classNameBtnRight = '',
  textBtnLeft = '확인',
  textBtnRight = '',
  handleSubmit = () => {},
  handleCloseIco = () => {},
  isShowCloseIco = false
}: Props) => (
  <Modal
    animation={animation}
    onHide={isShowCloseIco ? handleCloseIco : handleClose}
    show={isOpen}
    size={size}
    className={customClass}
  >
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{content}</Modal.Body>

    <Modal.Footer>
      {!isShowTowBtn ? (
        <Button onClick={handleClose} variant="primary" type="button">
          {textBtnLeft}
        </Button>
      ) : (
        <>
          <Button
            onClick={handleClose}
            variant="primary"
            type="button"
            className={classNameBtnRight}
          >
            {textBtnRight}
          </Button>
          <Button onClick={handleSubmit} variant="primary" type="button">
            {textBtnLeft}
          </Button>
        </>
      )}
    </Modal.Footer>
  </Modal>
);

ModalPrimary.defaultProps = {
  animation: false,
  size: '',
  customClass: '',
  isShowTowBtn: false,
  classNameBtnRight: '',
  textBtnLeft: '확인',
  textBtnRight: '',
  isShowCloseIco: false,
  handleSubmit: () => {},
  handleCloseIco: () => {}
};
export default memo<Props>(ModalPrimary);
