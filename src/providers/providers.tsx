import { theme } from '@/lib';
import { MantineProvider } from '@mantine/core';
import LoadingProvider from './LoadingProvider';
import { FormSubmissionProvider } from '@/contexts/FormSubmissionContext';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { ModalsProvider } from '@mantine/modals';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <ModalsProvider>
        <FormSubmissionProvider>
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
          <LoadingProvider>{children}</LoadingProvider>
          {/* </ReactLenis> */}
        </FormSubmissionProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;
