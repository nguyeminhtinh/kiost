// @flow
// libs
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Immutable from 'seamless-immutable';
import { Container } from 'react-bootstrap';
import SixthSearch from '../../../components/Form/SixthSearch';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import RevenueDay from './revenueDay';

type Props = {
  getRevenuesByDate: Function,
  dataRevenueDate: {
    data: {
      charts: Array<{
        day: number,
        totalMoney: number,
        month: number,
        year: number
      }>,
      table: Array<{
        createdAt: string,
        totalMoney: number,
        profit: number
      }>
    }
  },
  getListYear: Function,
  listYear: Array<{}>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

export const RevenueDayMain = ({
  getRevenuesByDate,
  dataRevenueDate,
  getListYear,
  listYear,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [radioActive, setRadioActive] = useState('day');

  const [paramFilter, setParamFilter] = useState({
    searchType: 'day'
  });
  const param = {
    searchType: 'year',
    year: parseInt(moment().format('YYYY'), 10)
  };
  const handleOnchangeRadio = value => {
    setRadioActive(value);
  };

  useEffect(() => {
    getRevenuesByDate(paramFilter);
    getListYear(param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const days = moment(
    // eslint-disable-next-line no-useless-concat
    `${
      paramFilter && paramFilter.year
        ? paramFilter.year
        : parseInt(moment().format('YYYY'), 10)
    }` +
      '-' +
      `${
        paramFilter && paramFilter.month
          ? paramFilter.month
          : parseInt(moment().format('MM'), 10)
      }`,
    'YYYY-MM'
  ).daysInMonth();

  const dataChart = [];

  // TODO Create helper for clean code
  switch (paramFilter && paramFilter.searchType) {
    case 'day':
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < days + 1; index++) {
        // eslint-disable-next-line no-unused-expressions
        dataRevenueDate &&
          dataRevenueDate.data &&
          dataRevenueDate.data.charts &&
          // eslint-disable-next-line no-loop-func
          dataRevenueDate.data.charts.forEach(item => {
            if (parseInt(item.day, 10) === index) {
              dataChart.push({
                id: index,
                value: item.totalMoney,
                label: `${parseInt(item.day, 10)}일`
              });
            }
          });
        if (!dataChart[index - 1]) {
          dataChart.push({
            id: index,
            value: 0,
            label: `${index}일`
          });
        }
      }
      break;
    case 'month':
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < 12 + 1; index++) {
        // eslint-disable-next-line no-unused-expressions
        dataRevenueDate &&
          dataRevenueDate.data &&
          dataRevenueDate.data.charts &&
          dataRevenueDate.data.charts.forEach(item => {
            if (parseInt(item.month, 10) === index) {
              dataChart.push({
                id: index,
                value: item.totalMoney,
                label: `${parseInt(item.month, 10)}월`
              });
            }
          });
        if (!dataChart[index - 1]) {
          dataChart.push({
            id: index,
            value: 0,
            label: `${index}월`
          });
        }
      }
      break;
    case 'year':
      // eslint-disable-next-line no-unused-expressions
      dataRevenueDate &&
        dataRevenueDate.data &&
        dataRevenueDate.data.charts &&
        dataRevenueDate.data.charts.forEach((item, index) =>
          dataChart.push({
            id: index,
            value: item.totalMoney,
            label: `${item.year}년`
          })
        );
      break;
    default:
      break;
  }

  // profit: -12000, totalMoney: 8000, createdAt: "2020-02-10 15:11:44"
  const formatDataTable = () => {
    let dataTable = [];

    switch (paramFilter && paramFilter.searchType) {
      case 'day':
        // eslint-disable-next-line no-unused-expressions
        dataTable =
          dataRevenueDate &&
          dataRevenueDate.data &&
          dataRevenueDate.data.table &&
          dataRevenueDate.data.table.map(item => ({
            date: moment(item.createdAt).format('YYYY-MM-DD'),
            amountRevenuce:
              item.totalMoney && item.totalMoney.toLocaleString('en'),
            interestRat: item.profit && item.profit.toLocaleString('en')
          }));
        break;
      case 'month':
        dataTable =
          dataRevenueDate &&
          dataRevenueDate.data &&
          dataRevenueDate.data.table &&
          dataRevenueDate.data.table.map(item => ({
            date: moment(item.createdAt).format('YYYY-MM'),
            amountRevenuce:
              item.totalMoney && item.totalMoney.toLocaleString('en'),
            interestRat: item.profit && item.profit.toLocaleString('en')
          }));
        break;
      case 'year':
        dataTable =
          dataRevenueDate &&
          dataRevenueDate.data &&
          dataRevenueDate.data.table &&
          dataRevenueDate.data.table.map(item => ({
            date: moment(item.createdAt).format('YYYY'),
            amountRevenuce:
              item.totalMoney && item.totalMoney.toLocaleString('en'),
            interestRat: item.profit && item.profit.toLocaleString('en')
          }));
        break;
      default:
        break;
    }

    return dataTable;
  };

  const handleSubmitSearch = dataSearch => {
    setParamFilter(dataSearch);
    getRevenuesByDate(dataSearch);
  };

  return (
    <MainLayout>
      <Container fluid className="home-main">
        {radioActive === 'day' && (
          <TitleHeader title="일자별 매출현황 – 일별매출" />
        )}
        {radioActive === 'month' && (
          <TitleHeader title="일자별 매출현황 – 월별매출" />
        )}
        {radioActive === 'year' && (
          <TitleHeader title="일자별 매출현황 – 연별매출" />
        )}
        <SixthSearch
          handleOnchangeRadio={handleOnchangeRadio}
          radioActive={radioActive}
          handleSubmitSearch={handleSubmitSearch}
          listYear={listYear ? Immutable.asMutable(listYear) : []}
        />
        <RevenueDay dataChart={dataChart} dataTable={formatDataTable()} />
      </Container>
    </MainLayout>
  );
};

export default RevenueDayMain;
