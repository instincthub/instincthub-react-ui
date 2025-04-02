/*
This function getPriceObjects calculates the price details based on user location and promo offers.
*/

import { formatNumberWithCommas } from "./helpFunction";
import { CURRENCY_SYMBOL } from "./utils";

interface PriceTier {
  [currency: string]: string;
}

interface ProductObject {
  price_tier?: PriceTier;
  [key: string]: any;
}

interface LocationState {
  ip_address?: string;
  currency?: string;
}

interface PromoState {
  id?: string | number;
  percentage?: string;
  [key: string]: any;
}

interface PriceObjectsResult {
  currency: string;
  price: string;
  formatted_price?: number;
  discounted_price?: string;
  promo: PromoState;
  symbol: string;
  is_promo_running: boolean;
  ip_address?: string;
}

interface GetPriceObjectsProps {
  selectCurrentPromo: () => PromoState;
  selectUserLocation: () => LocationState;
  useSelector: <T>(selector: () => T) => T;
}

/**
 * Calculates price details based on user location and promotional offers
 * @param objects - Product object containing pricing information
 * @param props - Functions for accessing Redux state
 * @returns Object with currency, price, formatted_price, symbol, and promo details
 */
const getPriceObjects = (
  objects: ProductObject,
  props: GetPriceObjectsProps
): PriceObjectsResult => {
  const { selectCurrentPromo, selectUserLocation, useSelector } = props;
  const location = useSelector(selectUserLocation);
  const promo = useSelector(selectCurrentPromo);

  // Support dollars and Naira
  let price: string = "FREE";
  let formatted_price: number | undefined;
  let discounted_price: string | undefined;
  let symbol: string = "";
  const ip_address = location?.ip_address;
  let currency: string = location?.currency === "NGN" ? "NGN" : "USD";

  // Temporarily accept Naira
  currency = "NGN";

  try {
    // Get currency, price, symbol
    if (objects.price_tier) {
      symbol = CURRENCY_SYMBOL[currency as keyof typeof CURRENCY_SYMBOL];
      price = symbol + objects.price_tier[currency];
      formatted_price = parseFloat(
        objects.price_tier[currency].replaceAll(",", "")
      );

      if (promo.percentage) {
        const discounts = (formatted_price * parseInt(promo.percentage)) / 100;
        formatted_price = Math.floor(formatted_price - discounts);
        price = `${symbol}${formatNumberWithCommas(formatted_price)}`;
        discounted_price = symbol + formatNumberWithCommas(discounts);
      }
    }
  } catch (e) {
    console.log("Couldn't getPriceObjects: ", e);
  }

  const is_promo_running = price !== "FREE" && Boolean(promo.id);

  return {
    currency,
    price,
    formatted_price,
    discounted_price,
    promo,
    symbol,
    is_promo_running,
    ip_address,
  };
};

export default getPriceObjects;
