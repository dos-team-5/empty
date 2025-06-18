import { Currency } from '../PriceConfigurator/types';

export const formatPrice = (amount: number, currency: Currency = 'cad') =>
  `${currency === 'cad' ? 'C$' : '$'}${amount.toFixed(2)}`;
