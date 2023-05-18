const formatprice = (amount: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount / 100);
};

export default formatprice;
