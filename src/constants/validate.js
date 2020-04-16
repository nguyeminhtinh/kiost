export function isNumberKey(e) {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
    return false;
  }
  return true;
}

export function isOnPasteNumber(e) {
  const pastedData = e.clipboardData.getData('text/plain');
  const regex = /[0-9]/;
  if (!regex.test(pastedData)) {
    e.preventDefault();
    return false;
  }

  return true;
}

export function getFormatBlock(str, $1, $2, $3, $unit) {
  const data = `${str.slice(0, $1)}${$unit}${str.slice(
    $1,
    $2
  )}${$unit}${str.slice($2, $3)}`;
  return data;
}

export default { isNumberKey, isOnPasteNumber, getFormatBlock };
