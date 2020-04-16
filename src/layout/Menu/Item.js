// @flow
// libs
import React, { memo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ItemSubMenu from './SubItem';

type Props = {
  label: string,
  to: string,
  icon: Object,
  sub: boolean,
  subMenu: Array<{
    id: number,
    subLabel: string,
    subTo: string,
    subIcon: string,
    subActive: boolean
  }>,
  handelClickMenu?: Function,
  location: Object,
  keyId: number,
  activeProductSub: boolean,
  activeRevenuerSub: boolean,
  id: number
};

const ItemMenu = ({
  label,
  to,
  icon,
  sub,
  subMenu,
  keyId,
  handelClickMenu,
  location,
  activeProductSub,
  activeRevenuerSub,
  id
}: Props) => {
  const array = [
    {
      id: ''
    }
  ];
  const [itemActive, setItemActive] = useState(array[0]);

  /**
   * handel click add class sub menu
   * prams list array
   */
  const handelClickSubMenu = itemClicking => {
    setItemActive(itemClicking);
  };
  /**
   * function render sub menu
   * prams list array
   */
  const result = [];
  if (subMenu.length > 0) {
    subMenu.map(item => {
      result.push(
        <ItemSubMenu
          key={item.id}
          id={id}
          keyId={item.id}
          subTo={item.subTo}
          subIcon={item.subIcon}
          subLabel={item.subLabel}
          location={location}
          subActive={item.id === itemActive.id}
          handelClickSubMenu={() => handelClickSubMenu(item)}
        />
      );
      return result;
    });
  }

  const activeClass = location.pathname === to ? 'active' : '';
  const activeSub =
    (location.pathname.includes('revenues') && keyId === 7) ||
    (activeRevenuerSub && keyId === 7) ||
    (location.pathname.includes('merchandise') && keyId === 4) ||
    (activeProductSub && keyId === 4) ||
    (location.pathname.includes('device') && keyId === 3) ||
    (location.pathname.includes('stores') && keyId === 2) ||
    (location.pathname.includes('members') && keyId === 6) ||
    (location.pathname.includes('inventory') && keyId === 5)
      ? ' active'
      : '';
  return (
    <li
      className={`nav__item ${activeClass} ${
        sub ? 'nav__sub' : ''
      } ${activeSub}`}
      onClick={handelClickMenu}
      tabIndex={0}
      role="menuitem"
      onKeyPress={() => {}}
    >
      <Link to={to} className="nav__item__link">
        {icon && <FontAwesomeIcon icon={icon} />}
        {!!label && <p className="nav__item__link__label">{label}</p>}
        {sub && <FontAwesomeIcon icon={faChevronUp} />}
      </Link>
      {subMenu.length > 0 ? (
        <ul className={`nav__item__dropdown ${activeSub}`}>{result}</ul>
      ) : (
        ''
      )}
    </li>
  );
};
ItemMenu.defaultProps = {
  handelClickMenu: null
};

export default memo<Props>(ItemMenu);
