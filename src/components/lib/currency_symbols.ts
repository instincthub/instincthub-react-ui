/**
 * A comprehensive mapping of currency codes to their corresponding symbols
 */
interface CurrencySymbolMap {
	[key: string]: string;
  }
  
  const CurrencySymbols: CurrencySymbolMap = {
	NGN: "₦", // Nigerian Naira
	USD: "$", // US Dollar
	EUR: "€", // Euro
	GBP: "£", // British Pound
	JPY: "¥", // Japanese Yen
	CNY: "¥", // Chinese Yuan
	INR: "₹", // Indian Rupee
	RUB: "₽", // Russian Ruble
	KRW: "₩", // South Korean Won
	BRL: "R$", // Brazilian Real
	AUD: "A$", // Australian Dollar
	CAD: "C$", // Canadian Dollar
	CHF: "CHF", // Swiss Franc
	ZAR: "R", // South African Rand
	SGD: "S$", // Singapore Dollar
	NZD: "NZ$", // New Zealand Dollar
	MXN: "MX$", // Mexican Peso
	HKD: "HK$", // Hong Kong Dollar
	SEK: "kr", // Swedish Krona
	NOK: "kr", // Norwegian Krone
	DKK: "kr", // Danish Krone
	TRY: "₺", // Turkish Lira
	AED: "د.إ", // UAE Dirham
	SAR: "﷼", // Saudi Riyal
	EGP: "E£", // Egyptian Pound
	GHS: "GH₵", // Ghanaian Cedi
	KES: "KSh", // Kenyan Shilling
	ZMW: "ZK", // Zambian Kwacha
	UGX: "USh", // Ugandan Shilling
	TZS: "TSh", // Tanzanian Shilling
	ETB: "Br", // Ethiopian Birr
  };
  
  export default CurrencySymbols;