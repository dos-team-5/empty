import FrenchTerms from '@/components/TermsAndConditions/frenchTerms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

const TermsAndConditionsPage = () => {
  return <FrenchTerms />;
};

export default TermsAndConditionsPage;
