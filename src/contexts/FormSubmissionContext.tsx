'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

interface FormSubmissionContextType {
  isDriverInfoSubmitted: boolean;
  setIsDriverInfoSubmitted: (value: boolean) => void;
  isIdentityConfirmationSubmitted: boolean;
  setIsIdentityConfirmationSubmitted: (value: boolean) => void;
  isBankingInfoSubmitted: boolean;
  setIsBankingInfoSubmitted: (value: boolean) => void;
}

const FormSubmissionContext = createContext<
  FormSubmissionContextType | undefined
>(undefined);

export const FormSubmissionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDriverInfoSubmitted, setIsDriverInfoSubmitted] =
    useState<boolean>(false);
  const [isIdentityConfirmationSubmitted, setIsIdentityConfirmationSubmitted] =
    useState<boolean>(false);
  const [isBankingInfoSubmitted, setIsBankingInfoSubmitted] =
    useState<boolean>(false);

  // Load submission states from local storage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDriverInfoSubmitted(
        localStorage.getItem('isDriverInfoSubmitted') === 'true'
      );
      setIsIdentityConfirmationSubmitted(
        localStorage.getItem('isIdentityConfirmationSubmitted') === 'true'
      );
      setIsBankingInfoSubmitted(
        localStorage.getItem('isBankingInfoSubmitted') === 'true'
      );
    }
  }, []);

  // Save submission states to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'isDriverInfoSubmitted',
        isDriverInfoSubmitted.toString()
      );
      localStorage.setItem(
        'isIdentityConfirmationSubmitted',
        isIdentityConfirmationSubmitted.toString()
      );
      localStorage.setItem(
        'isBankingInfoSubmitted',
        isBankingInfoSubmitted.toString()
      );
    }
  }, [
    isDriverInfoSubmitted,
    isIdentityConfirmationSubmitted,
    isBankingInfoSubmitted,
  ]);

  const value: FormSubmissionContextType = {
    isDriverInfoSubmitted,
    setIsDriverInfoSubmitted,
    isIdentityConfirmationSubmitted,
    setIsIdentityConfirmationSubmitted,
    isBankingInfoSubmitted,
    setIsBankingInfoSubmitted,
  };

  return (
    <FormSubmissionContext.Provider value={value}>
      {children}
    </FormSubmissionContext.Provider>
  );
};

export const useFormSubmission = (): FormSubmissionContextType => {
  const context = useContext(FormSubmissionContext);
  if (!context) {
    throw new Error(
      'useFormSubmission must be used within a FormSubmissionProvider'
    );
  }
  return context;
};
