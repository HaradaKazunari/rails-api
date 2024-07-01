import { showPrice } from "@/utils/format";

export const getAmountPrice = (watchValue: any) => {
  const calc = watchValue.amount * watchValue.unit_price;
  if (isNaN(calc)) {
    return showPrice(0);
  }
  return showPrice(calc);
};
