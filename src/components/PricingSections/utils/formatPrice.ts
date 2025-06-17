import { Currency } from '../PriceConfigurator/types';

export const formatPrice = (amount: number, currency: Currency = 'usd') =>
  `${currency === 'cad' ? 'C$' : '$'}${amount.toFixed(2)}`;
