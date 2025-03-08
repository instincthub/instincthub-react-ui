/*
This function getPriceObjects calculates the price details (currency, price, formatted_price, symbol, and promo status) based on the user's location and current promotional offers.

Reference:
const { currency, price, formatted_price, promo, symbol, is_promo_running } =
		getPriceObjects(objects);
*/

import {
	selectCurrentPromo,
	selectUserLocation,
	useSelector,
} from "@/lib/redux";
import { CURRENCY_SYMBOL } from "@/assets/js/utils";
import { formatNumberWithCommas } from "./helpFunction";

const getPriceObjects = (objects) => {
	const location = useSelector(selectUserLocation);
	const promo = useSelector(selectCurrentPromo);

	// Support dollars and Naira.
	let price = "FREE",
		formatted_price,
		discounted_price,
		symbol = "",
		ip_address = location?.ip_address,
		currency = location?.currency === "NGN" ? "NGN" : "USD";

        // Temporarily accept Naira
        currency = "NGN"
	try {
		// Get currency, currency, price, symbol
		if (objects.price_tier) {
			symbol = CURRENCY_SYMBOL[currency];
			price = symbol + objects.price_tier[currency];
			formatted_price = parseFloat(
				objects.price_tier[currency].replaceAll(",", "")
			);
			if (promo.percentage) {
				const discounts = (formatted_price * parseInt(promo.percentage)) / 100;
				formatted_price = Math.floor(formatted_price - discounts);
				price = `${symbol}${formatNumberWithCommas(formatted_price)}`;

				discounted_price =
					symbol + Math.floor(formatNumberWithCommas(discounts));
			}
		}
	} catch (e) {
		console.log("Couldn't getPriceObjects: ", e);
	}

	const is_promo_running = price !== "FREE" && promo.id;

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
