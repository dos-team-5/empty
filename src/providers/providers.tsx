import { FormSubmissionProvider } from '@/contexts/FormSubmissionContext';
import { theme } from '@/lib';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { LanguageProvider } from './languageToggleContext';
import LoadingProvider from './LoadingProvider';
import { StripeProvider } from './StripeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <ModalsProvider>
        <FormSubmissionProvider>
          <StripeProvider>
            {/* <ReactLenis
              root
              options={{
                duration: 1.2, // Smooth and natural scroll duration
                wheelMultiplier: 0.8, // Slightly slower scroll for better control
                syncTouch: false, // Sync touch for better mobile experience
                overscroll: false, // Disable overscroll for a cleaner feel
              }}
            > */}
            <Notifications position="bottom-right" />
            <LoadingProvider>
              <LanguageProvider>{children}</LanguageProvider>
            </LoadingProvider>
            {/* </ReactLenis> */}
          </StripeProvider>
        </FormSubmissionProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;
