// @flow
// libs
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  subLabel: string,
  subTo: string,
  subIcon: string,
  handelClickSubMenu?: Function,
  location: Object,
  keyId: number,
  id: number
};

const ItemSubMenu = ({
  subLabel,
  subTo,
  subIcon,
  handelClickSubMenu = null,
  location,
  keyId,
  id
}: Props) => {
  const activeSub =
    (location.pathname.includes(`merchandise/${id}`) && keyId === 7) ||
    (location.pathname.includes(`merchandise/add`) && keyId === 7) ||
    (location.pathname.includes(`merchandise/manual/${id}`) && keyId === 8) ||
    (location.pathname.includes(`merchandise/registerProduct`) && keyId === 8);
  return (
    <li
      className={`nav__item nav__sub__item nav__dropdown__item ${
        // eslint-disable-next-line no-nested-ternary
        location.pathname === subTo ? 'active' : activeSub ? 'active' : ''
      }`}
      onClick={handelClickSubMenu}
      tabIndex={0}
      role="menuitem"
      onKeyPress={() => {}}
    >
      <Link to={subTo} className="nav__item__link">
        {subIcon && <FontAwesomeIcon icon={subIcon} />}
        {!!subLabel && (
          <p className="nav__item__link__label sub__label">{subLabel}</p>
        )}
      </Link>
    </li>
  );
};

ItemSubMenu.defaultProps = {
  handelClickSubMenu: null
};

export default memo<Props>(ItemSubMenu);
