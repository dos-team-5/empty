import TermsAndConditions from '@/components/TermsAndConditions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

const TermsAndConditionsPage = () => {
  return <TermsAndConditions />;
};

export default TermsAndConditionsPage;
