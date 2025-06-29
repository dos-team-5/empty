import { Language } from '../PriceConfigurator/data';
import { Currency } from '../PriceConfigurator/types';

export const formatPrice = (
  amount: number,
  language: Language,
  currency: Currency = 'cad'
) => {
  if (language === 'fr') {
    return `${amount.toFixed(2)}${currency === 'cad' ? '$ CA' : '$'}`;
  } else {
    return `${currency === 'cad' ? 'C$' : '$'}${amount.toFixed(2)}`;
  }
};

export default formatPrice;
