export const listValueStatusProduct = [
  { className: 'green', textLabe: '진열대기', status: 1 },
  { className: 'black', textLabe: '진열완료', status: 2 },
  { className: '', textLabe: '판매완료', status: 3 },
  { className: 'red', textLabe: '판매취소', status: 4 }
];
export const listValueStatusHome = [
  { className: 'black', textLabe: '유효기간 D+1', status: 1 },
  { className: 'black', textLabe: '유효기간 D-1', status: 2 },
  { className: 'black', textLabe: '유효기간 D-2', status: 3 },
  { className: 'black', textLabe: '유효기간 D-3', status: 4 }
];
export const listValueStatusDrive = [
  { className: '', textLabe: '사용중', status: 1 },
  { className: 'color-red', textLabe: '사용해지', status: 2 },
  { className: 'color-blue', textLabe: '사용대기', status: 3 }
];
export const listValueStatusAd = [
  { className: 'green', textLabe: '대기', status: 1 },
  { className: 'reject', textLabe: '반려', status: 2 },
  { className: '', textLabe: '승인', status: 3 }
];
export const listValueStatusPayment = [
  { className: '', textLabe: '결제완료', status: 1 },
  { className: 'color-red', textLabe: '결제취소', status: 2 }
];
export default {
  listValueStatusProduct,
  listValueStatusHome,
  listValueStatusDrive,
  listValueStatusAd,
  listValueStatusPayment
};
