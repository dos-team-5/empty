import { ReactLenis, theme } from '@/lib';
import { MantineProvider } from '@mantine/core';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ReactLenis
        root
        options={{
          duration: 0.3,
          wheelMultiplier: 0.7,
          syncTouch: false,
          overscroll: false,
        }}
      >
        {children}
      </ReactLenis>
    </MantineProvider>
  );
};

export default Providers;
