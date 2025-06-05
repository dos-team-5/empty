import { ReactLenis, theme } from '@/lib';
import { MantineProvider } from '@mantine/core';
import AnimatedGradient from './AnimatedGradient';
import LoadingProvider from './LoadingProvider';
import { FormSubmissionProvider } from '@/contexts/FormSubmissionContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <FormSubmissionProvider>
        <ReactLenis
          root
          options={{
            duration: 1.2, // Smooth and natural scroll duration
            wheelMultiplier: 0.8, // Slightly slower scroll for better control
            syncTouch: false, // Sync touch for better mobile experience
            overscroll: false, // Disable overscroll for a cleaner feel
          }}
        >
          <LoadingProvider>{children}</LoadingProvider>
        </ReactLenis>
        <AnimatedGradient />
      </FormSubmissionProvider>
    </MantineProvider>
  );
};

export default Providers;
