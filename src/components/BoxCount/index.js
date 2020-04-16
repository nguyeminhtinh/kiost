// @flow
// libs
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  image: string,
  number: number,
  titleHeader: string,
  iconDetail: boolean,
  OnDetail: string,
  customClass?: string,
  alt?: string,
  titleLink: string
};
export const BoxCount = ({
  image,
  number,
  customClass = '',
  OnDetail,
  alt,
  titleLink,
  iconDetail,
  titleHeader
}: Props) => (
  <div className="count">
    <div className="count__title">
      <h2>{titleHeader}</h2>
    </div>
    <div className="count__item d-flex">
      <div>
        <img src={image} className={`img ${customClass}`} alt={alt} />
      </div>
      {number && number > 0 ? (
        <p className="count__item__number">
          {Number(number).toLocaleString('en')}
        </p>
      ) : (
        <p className="count__item__text mb-0">현재 데이터가 없습니다.</p>
      )}
      <div className="count__item__link">
        <Link to={OnDetail} className="count__item__link__detail">
          {titleLink}
          {iconDetail && <FontAwesomeIcon icon={faChevronRight} />}
        </Link>
      </div>
    </div>
  </div>
);

BoxCount.defaultProps = {
  customClass: '',
  alt: ''
};

export default memo<Props>(BoxCount);
