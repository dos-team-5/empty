import { Box, Button, Title } from '@mantine/core';
import AnimatedTitle from './AnimatedTitle';
import FeatureCarousel from './FeatureCarousel';
import { IconUpload } from '@tabler/icons-react';
import Canvas3D from './Canvas3D';

const CarouselFeature = () => {
  return (
    <Box className="relative h-screen">
      <Box
        maw={1800}
        mx={'auto'}
        className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 2xl:py-16"
        mt={180}
      >
        <div className="relative flex h-[78vh] w-[90%] flex-col items-start justify-between rounded-[40px] bg-[#FFD0EF] lg:flex-row">
          {/* Title and Carousel */}
          <div className="w-full p-6 md:p-8 lg:w-1/2 xl:p-10">
            <AnimatedTitle />
            <FeatureCarousel />
          </div>
          {/* Upload and Canvas */}
          <div className="relative flex h-full w-full items-start justify-end lg:w-1/2">
            {/* SVG Shape */}
            <svg
              width="974"
              height="1043"
              viewBox="0 0 974 1043"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-2 -right-4 z-0 h-full w-auto origin-right scale-100 lg:scale-115"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M436.377 30.2794C441.284 19.3175 443.738 13.8365 447.602 9.81837C451.018 6.26652 455.208 3.55158 459.846 1.88517C465.092 0 471.097 0 483.108 0H922.8C940.722 0 949.682 0 956.528 3.48779C962.549 6.55574 967.444 11.4511 970.512 17.4723C974 24.3175 974 33.2783 974 51.2V991.8C974 1009.72 974 1018.68 970.512 1025.53C967.444 1031.55 962.549 1036.44 956.528 1039.51C949.682 1043 940.722 1043 922.8 1043H62.0179C35.6933 1043 22.531 1043 14.3833 1037.46C7.26328 1032.61 2.3968 1025.1 0.883852 1016.62C-0.847469 1006.92 4.53071 994.906 15.2871 970.879L436.377 30.2794Z"
                fill="#D381B5"
              />
            </svg>
            {/* Content on top of SVG */}
            <div className="relative z-20 !mr-12 max-w-xs">
              <Title
                order={2}
                fw={700}
                ff={'var(--font-poppins)'}
                className="!mt-2 text-start !text-base text-white capitalize"
              >
                Check how your Ad looks
              </Title>
              <p className="font-inter my-4 text-start text-xs font-normal text-white">
                upload your Advertise banner here to see exactly how its gonna
                look in real time on our 3D vechile models
              </p>
              <Button
                variant="white"
                radius={6}
                fullWidth
                leftSection={<IconUpload size={14} />}
                className="!font-semibold !text-[#FF83D5]"
              >
                Upload Ad
              </Button>
              {/* Canvas */}
              <Canvas3D />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CarouselFeature;
