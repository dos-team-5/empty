'use client';
import { Box, Text, Timeline } from '@mantine/core';

const TimeLineComponent = ({
  data,
}: {
  data: {
    title: string | React.ReactNode;
    desc: string | React.ReactNode;
    icon?: React.ReactNode;
  }[];
}) => {
  return (
    <Box className="mt-8 xl:mt-12">
      <Timeline
        radius="xs"
        active={data.length + 1}
        lineWidth={1}
        bulletSize={data[0].icon ? 32 : 16}
      >
        {data.map((item, idx) => (
          <Timeline.Item
            bullet={item.icon? item.icon: <></>}
            key={idx}
            title={item.title}
            className={`font-poppins ${item.icon?'pt-1.5':''} text-lg font-medium !text-[#333333] xl:text-xl 2xl:text-2xl`}
          >
            <Text
              ff={'var(--font-poppins)'}
              fw={400}
              c="#333333"
              className="!text-base xl:!text-lg 2xl:!text-xl"
            >
              {item.desc}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Box>
  );
};

export default TimeLineComponent;
