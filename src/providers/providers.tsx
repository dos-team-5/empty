import { ReactLenis, theme } from '@/lib';
import { MantineProvider } from '@mantine/core';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <ReactLenis
        root
        options={{
          duration: 1.2, // Smooth and natural scroll duration
          wheelMultiplier: 0.8, // Slightly slower scroll for better control
          syncTouch: true, // Sync touch for better mobile experience
          overscroll: false, // Disable overscroll for a cleaner feel
        }}
      >
        {children}
      </ReactLenis>
    </MantineProvider>
  );
};

export default Providers;
