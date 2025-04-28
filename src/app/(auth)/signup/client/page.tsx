import { Box, ScrollArea, Space } from '@mantine/core';
import SignupForm from '../components/SignupForm';

const SignupClientPage = () => {
  return (
    <Box className="">
      <ScrollArea>
        <Space h={100} />
        <SignupForm type="client" />
        <Space h={40} />
      </ScrollArea>
    </Box>
  );
};

export default SignupClientPage;
