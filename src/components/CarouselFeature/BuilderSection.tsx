'use client';

import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';
import { useLanguage } from '@/providers/languageToggleContext';
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  FileInput,
  Flex,
  Menu,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import AnimatedTitle from './AnimatedTitle';
import FeatureCarousel from './FeatureCarousel';
import { Icon } from '@iconify/react/dist/iconify.js';
import { IconUpload } from '@tabler/icons-react';
import Canvas3D from './Canvas3D';

const BuilderSection = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  const [file, setFile] = useState<File | null>(null);
  const [applyImage, setApplyImage] = useState(false);

  useEffect(() => {
    setApplyImage(false);
  }, [file]);

  const md = useMediaQuery('(min-width: 768px)');

  return (
    <div className="relative mt-40 min-h-dvh overflow-hidden md:mt-50 md:min-h-[50dvh] lg:mt-40 lg:min-h-dvh">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <BackgroundImage
          src={md ? '/builder/bgComputer.png' : '/builder/bgMobile.png'}
          className="!relative mx-auto !h-[958px] !w-[349px] !bg-top bg-no-repeat md:!h-[50dvh] md:!w-full md:!max-w-[110dvh] md:!bg-contain md:!bg-center lg:!h-dvh"
        >
          <div className="mx-auto flex h-full w-full flex-col items-center justify-center px-[8%] md:flex-row md:items-center md:justify-between md:gap-0 md:px-0 xl:px-4 2xl:px-12">
            {/* Title and Carousel */}
            <div
              className={`relative w-full px-4 md:mt-4 md:w-1/2 md:pt-0 ${language === 'fr' ? 'mt-20 md:scale-95 2xl:scale-100' : 'mt-16 md:scale-100'}`}
            >
              <AnimatedTitle />
              <FeatureCarousel />
            </div>

            {/* Upload and Canvas */}
            <div className="relative flex h-full w-full flex-col items-center justify-center md:w-[40%] md:items-end md:justify-start md:px-4 xl:w-1/3">
              <div
                className={`${language === 'fr' ? 'mt-[32%] origin-top scale-90 xl:scale-100' : 'mt-[48%] scale-100'} md:mt-[24%] lg:mt-[40%]`}
              >
                <Flex pos={'relative'} align={'center'} className="">
                  <Title
                    order={2}
                    fw={700}
                    ff={'var(--font-poppins)'}
                    className="text-start !text-sm text-white capitalize 2xl:!text-lg"
                  >
                    {content.featureCarouselSection.canvasSection.title}
                  </Title>
                  <Menu width={300} position="right">
                    <Menu.Target>
                      <ActionIcon ml={3} variant="subtle" size="sm">
                        <Icon
                          icon="ix:question-filled"
                          className="text-white"
                        />
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
                <p className="font-inter my-4 text-start text-[10px] font-normal text-white capitalize 2xl:text-sm">
                  {content.featureCarouselSection.canvasSection.content}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <FileInput
                    size="xs"
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
                    size="xs"
                    disabled={!file}
                    variant="white"
                    radius={6}
                    className="!font-semibold"
                    onClick={() => setApplyImage(true)}
                  >
                    {content.featureCarouselSection.canvasSection.applyBtn}
                  </Button>
                </div>
              </div>
              <Canvas3D file={file} applyImage={applyImage} />
            </div>
          </div>
        </BackgroundImage>
      </Box>
    </div>
  );
};

export default BuilderSection;
