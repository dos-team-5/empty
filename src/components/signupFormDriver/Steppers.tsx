'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import { Button, Divider, Space, Stack, Stepper, Text } from '@mantine/core';
import { useState, useEffect, JSX } from 'react';
import Step1_DriverInformation from './Step1_DriverInformation';
import Step2_IdentityConfirmation from './Step2_IdentityConfirmation';
import Step3_BankingInformation from './Step3_BankingInformation';
import { CheckCircle } from 'lucide-react';
import { steppingForm } from '@/contents/drive/steppingForm';
import { useLanguage } from '@/providers/languageToggleContext';

const Steppers = () => {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const {
    isDriverInfoSubmitted,
    isIdentityConfirmationSubmitted,
    isBankingInfoSubmitted,
  } = useFormSubmission();

  // Load active step from local storage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedActive = localStorage.getItem('formActiveStep');
      if (savedActive) {
        setActive(parseInt(savedActive, 10));
      }
    }
  }, []);

  // Save active step to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formActiveStep', active.toString());
    }
  }, [active]);

  function insertBreakAfterFirstWord(text: string): JSX.Element {
    const words = text.split(' ');
    if (words.length <= 1) return <span className="text-xs">{text}</span>;
    return (
      <span className="text-xs">
        {words.slice(0, 1).join(' ')}
        <br />
        {words.slice(1).join(' ')}
      </span>
    );
  }

  const submissionStates = [
    isDriverInfoSubmitted,
    isIdentityConfirmationSubmitted,
    isBankingInfoSubmitted,
  ];

  const steppers = [
    {
      id: 1,
      title: (
        <>
          {insertBreakAfterFirstWord(
            steppingForm.step1Form1Labels.title[language]
          )}
        </>
      ),
      content: (
        <Step1_DriverInformation
          onNext={() => nextStep()}
          onPrev={() => prevStep()}
          step1FormLabel={steppingForm.step1Form1Labels}
        />
      ),
    },
    {
      id: 2,
      title: (
        <>
          {insertBreakAfterFirstWord(
            steppingForm.step2FormLabel.title[language]
          )}
        </>
      ),
      content: (
        <Step2_IdentityConfirmation
          onNext={() => nextStep()}
          onPrev={() => prevStep()}
          step2FormLabel={steppingForm.step2FormLabel}
        />
      ),
    },
    {
      id: 3,
      title: (
        <>
          {insertBreakAfterFirstWord(
            steppingForm.step3FormLabel.title[language]
          )}
        </>
      ),
      content: (
        <Step3_BankingInformation
          onNext={() => nextStep()}
          onPrev={() => prevStep()}
          step3FormLabel={steppingForm.step3FormLabel}
        />
      ),
    },
  ];

  const nextStep = () =>
    setActive((current) => (current < steppers.length ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      className="flex w-full flex-col"
    >
      {steppers.map((stepper, index) => {
        let stepColor = '#E2E6F9';
        if (submissionStates[index]) {
          stepColor = 'green';
        } else if (active === index) {
          stepColor = 'var(--mantine-primary-color-5)';
        }
        return (
          <Stepper.Step
            w="25%"
            allowStepSelect={
              submissionStates[index] || stepper.id <= active + 1
            }
            key={stepper.id}
            withIcon={false}
            label={
              <Text
                fw={500}
                c={'#2B2F32'}
                className={`font-inter flex h-14 items-center justify-center !text-[10px] !duration-300 !ease-in lg:!text-xs ${
                  submissionStates[index] || active === index ? '' : 'opacity-0'
                }`}
              >
                {stepper.title}
              </Text>
            }
            description={
              <Divider
                size={7}
                color={stepColor}
                className="w-16 !rounded-sm !duration-300 !ease-in lg:w-20"
              />
            }
          >
            {stepper.content}
          </Stepper.Step>
        );
      })}
      <Stepper.Step
        withIcon={false}
        label={
          <Text
            fw={500}
            c={'#2B2F32'}
            className="font-inter flex h-14 items-center justify-start !text-[10px] lg:!text-xs"
          >
            <span className="text-primary mr-1">
              {language === 'fr' ? 'Etape ' : 'Step'}{' '}
              {active === 3 ? 3 : active + 1}
            </span>
            of 3
          </Text>
        }
        description={
          <Divider
            size={'xl'}
            color={'transparent'}
            className="w-16 !rounded-sm !duration-300 !ease-in lg:w-20"
          />
        }
        disabled
        className="ml-4 !cursor-default"
      >
        <Space className="h-4 md:h-8 lg:h-12" />
        {language === 'fr' ? (
          <Stack align="center" gap="md">
            <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
            <Text fw={600} size="lg" className="font-inter text-center">
              Félicitations ! Vous avez complété toutes les étapes !
            </Text>
            <Text size="sm" c="dimmed" className="font-inter text-center">
              Votre profil est maintenant complet. Vous pouvez revoir les étapes
              précédentes à l’aide du bouton Retour ou finaliser votre
              soumission.
            </Text>
            <Button
              variant="filled"
              size="md"
              radius={12}
              className="!font-inter !bg-[var(--mantine-primary-color-5)] !px-16 !text-sm !font-normal !text-white"
              onClick={() => setActive(0)}
            >
              Revoir le profil
            </Button>
          </Stack>
        ) : (
          <Stack align="center" gap="md">
            <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
            <Text fw={600} size="lg" className="font-inter text-center">
              Congratulations! You have Completed All Steps!
            </Text>
            <Text size="sm" c="dimmed" className="font-inter text-center">
              Your profile is now complete. You can review previous steps using
              the Back button or finalize your submission.
            </Text>
            <Button
              variant="filled"
              size="md"
              radius={12}
              className="!font-inter !bg-[var(--mantine-primary-color-5)] !px-16 !text-sm !font-normal !text-white"
              onClick={() => setActive(0)}
            >
              Review Profile
            </Button>
          </Stack>
        )}
      </Stepper.Step>
    </Stepper>
  );
};

export default Steppers;
