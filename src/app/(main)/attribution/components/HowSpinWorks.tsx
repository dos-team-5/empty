import { Image, Stack } from '@mantine/core';

const HowSpinWorks = () => {
  const newImages = [
    {
      id: 1,
      img: '/attribution/HowSpinWorks/img1.png',
    },
    {
      id: 2,
      img: '/attribution/HowSpinWorks/img2.png',
    },
    {
      id: 3,
      img: '/attribution/HowSpinWorks/img3.png',
    },
    {
      id: 4,
      img: '/attribution/HowSpinWorks/img4.png',
    },
    {
      id: 5,
      img: '/attribution/HowSpinWorks/img5.png',
    },
  ];
  return (
    <Stack>
      {newImages.map((item) => (
        <Image
          key={item.id}
          src={item.img}
          w={{ base: '100%', md: '70%' }}
          mx="auto"
          mb={{ base: 60, md: 140 }}
        />
      ))}
    </Stack>
  );
};

export default HowSpinWorks;
