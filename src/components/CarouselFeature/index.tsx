'use client';
import {
  ActionIcon,
  Box,
  Button,
  FileInput,
  Flex,
  Paper,
  Stack,
  Title,
  Menu,
} from '@mantine/core';
import AnimatedTitle from './AnimatedTitle';
import FeatureCarousel from './FeatureCarousel';
import { IconUpload } from '@tabler/icons-react';
import Canvas3D from './Canvas3D';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const CarouselFeature = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  const [file, setFile] = useState<File | null>(null);
  const [applyImage, setApplyImage] = useState(false);

  // Reset applyImage when file changes
  useEffect(() => {
    setApplyImage(false);
  }, [file]);

  return (
    <Box
      mt={200}
      className="relative mb-148 sm:mb-120 md:mb-88 lg:mb-auto lg:h-screen lg:scale-86 xl:scale-100"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 2xl:py-16"
        mt={180}
      >
        <div className="relative flex h-[88vh] w-full flex-col items-center justify-start rounded-[40px] bg-[#FFD0EF] md:w-[78%] lg:w-full lg:flex-row lg:items-start lg:justify-between xl:h-[78vh] xl:w-[80%] 2xl:w-[80%]">
          {/* Title and Carousel */}
          <div className="flex w-full items-start justify-center p-6 md:p-8 lg:w-1/2 lg:justify-start xl:p-10">
            <div className="">
              <AnimatedTitle />
              <FeatureCarousel />
            </div>
          </div>
          {/* Upload and Canvas */}
          <div className="relative flex h-full w-full items-start justify-center lg:w-1/2 lg:justify-end">
            {/* SVG Shape for lg and above */}
            <svg
              width="974"
              height="1043"
              viewBox="0 0 974 1043"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-2 -right-2 z-0 hidden h-full w-auto origin-right scale-100 lg:block lg:scale-115 xl:-right-4"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M436.377 30.2794C441.284 19.3175 443.738 13.8365 447.602 9.81837C451.018 6.26652 455.208 3.55158 459.846 1.88517C465.092 0 471.097 0 483.108 0H922.8C940.722 0 949.682 0 956.528 3.48779C962.549 6.55574 967.444 11.4511 970.512 17.4723C974 24.3175 974 33.2783 974 51.2V991.8C974 1009.72 974 1018.68 970.512 1025.53C967.444 1031.55 962.549 1036.44 956.528 1039.51C949.682 1043 940.722 1043 922.8 1043H62.0179C35.6933 1043 22.531 1043 14.3833 1037.46C7.26328 1032.61 2.3968 1025.1 0.883852 1016.62C-0.847469 1006.92 4.53071 994.906 15.2871 970.879L436.377 30.2794Z"
                fill="#D381B5"
              />
            </svg>
            {/* SVG Shape for below lg */}
            <svg
              width="349"
              height="769"
              viewBox="0 0 349 769"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md absolute -top-12 z-0 block w-auto scale-x-116 sm:scale-x-196 md:scale-x-170 md:scale-y-110 lg:hidden"
            >
              <path
                className=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="M214.867 8.77645C218.809 5.52534 220.78 3.89978 222.987 2.743C224.944 1.7168 227.035 0.965995 229.198 0.511888C231.637 0 234.191 0 239.301 0L310.6 0C324.041 0 330.762 0 335.896 2.61584C340.412 4.9168 344.083 8.58834 346.384 13.1042C349 18.2381 349 24.9587 349 38.4V730.6C349 744.041 349 750.762 346.384 755.896C344.083 760.412 340.412 764.083 335.896 766.384C330.762 769 324.041 769 310.6 769H38.4C24.9587 769 18.2381 769 13.1042 766.384C8.58834 764.083 4.9168 760.412 2.61584 755.896C0 750.762 0 744.041 0 730.6V204.104C0 197.451 0 194.124 0.833596 191.045C1.57216 188.316 2.787 185.739 4.42209 183.433C6.26757 180.83 8.83382 178.714 13.9663 174.48L214.867 8.77645Z"
                fill="#D381B5"
              />
            </svg>
            {/* Content on top of SVG */}
            <div className="2xl relative z-20 mx-auto h-screen max-w-xs lg:mx-0 lg:!mr-12 lg:h-auto lg:max-w-3xs xl:!mr-8 xl:max-w-xs 2xl:!mr-16">
              <Flex
                pos={'relative'}
                align={'center'}
                className="!mt-32 lg:!mt-4"
              >
                <Title
                  order={2}
                  fw={700}
                  ff={'var(--font-poppins)'}
                  className="text-start !text-base text-white capitalize xl:!ml-8 2xl:!ml-0 2xl:!text-lg"
                >
                  {content.featureCarouselSection.canvasSection.title}
                </Title>
                <Menu width={300} position="right" offset={-35}>
                  <Menu.Target>
                    <ActionIcon ml={3} variant="subtle" size="sm">
                      <Icon icon="ix:question-filled" className="text-white" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown className="scale-75">
                    <Paper
                      p="md"
                      radius="md"
                      withBorder
                      className={'!border-black'}
                    >
                      <Stack gap="md">
                        <Title fz={16} order={3} fw={400}>
                          {
                            content.featureCarouselSection.canvasSection
                              .menuDDInfo
                          }
                        </Title>
                      </Stack>
                    </Paper>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <p className="font-inter my-4 text-start text-xs font-normal text-white capitalize xl:!ml-8 2xl:!ml-0 2xl:text-sm">
                {content.featureCarouselSection.canvasSection.content}
              </p>
              <div className="flex flex-wrap items-center gap-2 xl:!ml-8 2xl:!ml-0">
                <FileInput
                  radius={6}
                  value={file}
                  onChange={setFile}
                  variant="filled"
                  placeholder={
                    <div className="flex items-center gap-2 text-black">
                      <IconUpload size={14} />
                      {
                        content.featureCarouselSection.canvasSection
                          .inputPlaceholder
                      }
                    </div>
                  }
                  accept="image/png,image/jpeg"
                />
                <Button
                  disabled={!file}
                  variant="white"
                  radius={6}
                  className="!font-semibold"
                  onClick={() => setApplyImage(true)}
                >
                  {content.featureCarouselSection.canvasSection.applyBtn}
                </Button>
              </div>
              <Canvas3D file={file} applyImage={applyImage} />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CarouselFeature;
