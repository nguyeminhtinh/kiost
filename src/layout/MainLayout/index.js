/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef } from 'react';
import useClickOutside from 'customHooks/useClickOutSide';
import Header from '../../components/Header';
import Menu from '../Menu';

type Props = {
  children: React.AbstractComponent<{}>
};

const MainLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const refMenu = useRef(null);
  const iconRef = useRef(null);
  const mainContent = useRef(null);

  useClickOutside(
    refMenu,
    () => {
      if (isOpen) {
        setIsOpen(false);
      }
    },
    { iconRef }
  );
  let classHeight = '';
  if (window.innerHeight < 900) {
    classHeight = 'heightMenu';
  }

  return (
    <div className={`wrapper-content ${isOpen ? 'open' : ''}`}>
      <div className="wrapper-mobile">
        <div
          className={`d-mobile btn-menu  ${isOpen ? 'show' : ''}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          tabIndex={0}
          role="menuitem"
          onKeyPress={() => {}}
          ref={iconRef}
        >
          <span className="icon" />
        </div>
      </div>
      <div className={`sidebar ${isOpen ? 'show' : ''} ${classHeight}`}>
        <Menu innerRef={refMenu} />
      </div>
      <div className="main-content" ref={mainContent}>
        <div className="content">
          <Header name="admin님 안녕하세요" urlUser="#" />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
