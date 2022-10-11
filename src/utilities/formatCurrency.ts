// format currency to 0 decimal places and . as a thousands separator
export enum Currency {
  USD = "en-US",
  EUR = "de-DE",
  KN = "hr-HR",
}

const formatCurrency = (amount: number, toLocaleString: Currency) => {
  if (amount < 1000000) {
    return amount.toLocaleString(toLocaleString, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  //    if millions then add M
  return (
    (amount / 1000000).toLocaleString(toLocaleString, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " M"
  );
};

export default formatCurrency;
