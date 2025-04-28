import { Box, ScrollArea, Space } from '@mantine/core';
import SignupForm from '../components/SignupForm';

const SignupDriverPage = () => {
  return (
    <Box className="">
      <ScrollArea>
        <Space h={100} />
        <SignupForm type="driver" />
        <Space h={40} />
      </ScrollArea>
    </Box>
  );
};

export default SignupDriverPage;
