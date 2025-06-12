'use client';
import { Anchor, Box, Flex, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import TimeLineComponent from '../TimeLineComponent';
import {
  Calendar1,
  CalendarCheck,
  CircleCheck,
  CirclePlus,
  Cog,
  FilePenLine,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const handleSignUpClick = () => {
  const target = document.querySelector('#signUpDriver');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const data = [
  {
    title: 'Sign up online',
    desc: (
      <>
        Register on our platform.
        <br />
        <Anchor
          variant="text"
          size="md"
          className="underline"
          onClick={handleSignUpClick}
        >
          Sign up now
        </Anchor>
      </>
    ),
    icon: <FilePenLine size={24} />,
  },
  {
    title: 'Verification',
    desc: 'Provide proof of your rideshare status: screenshot of your driver profile, upload your driver’s license along with your banking details.',
    icon: <ShieldCheck size={24} />,
  },
  {
    title: 'Get Listed',
    desc: 'Once your payment information and identity are verified, you’ll be added to our network of drivers.',
    icon: <CircleCheck size={24} />,
  },
  {
    title: 'Accept Campaigns',
    desc: 'When a campaign matches your profile, you will be notified through email with the ability to accept or decline the role.',
    icon: <CirclePlus size={24} />,
  },
  {
    title: 'Receive Decal',
    desc: 'Visit the local installation center listed in your email to have your decal professionally installed.',
    icon: <Tag size={24} />,
  },
  {
    title: 'Install & Drive',
    desc: 'Once your decal is installed, go to the Driver Sign-In page on our website and log in using your driver’s license number. Upload a clear photo of the decal, then download the Evertrack app to enable GPS tracking. After that, you’re all set to drive as usual.',
    icon: <Cog size={24} />,
  },
  {
    title: 'Weekly Updates',
    desc: 'Throughout the campaign, you must keep the Evertrack app running to allow us to track your driving hours. Once a week, log in to the Driver Sign-In page and upload clear photos of both decals to help us monitor campaign performance.',
    icon: <CalendarCheck size={24} />,
  },
  {
    title: 'Monthly Payment',
    desc: 'Get paid up to $200 at the end of each month during your campaign.',
    icon: <Calendar1 size={24} />,
  },
];

const TimelineSectionDrive = () => {
  return (
    <Box className="relative my-2 mt-16 overflow-hidden">
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          c="#333333"
          className="capitalize"
          ta={'center'}
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            once
          >
            Get Started
          </TextAnimate>
        </Title>

        <TimeLineComponent data={data} />

        {/* <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          c="#5E5E5E"
          className="capitalize"
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="!my-8 text-lg md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            once
          >
            Earn more with no extra work—just drive!
          </TextAnimate>
        </Title> */}
      </Flex>
    </Box>
  );
};

export default TimelineSectionDrive;
