import { Card, Title, Stack, Image, Text, Box, Button } from '@mantine/core';
import { useLanguage } from '@/providers/languageToggleContext';
import Link from 'next/link';

const SuccessMessage = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "You have successfully signed up",
      message: "Check your email for further information",
      loginNow: 'Login Now'
    },
    fr: {
      title: "Vous vous êtes inscrit avec succès",
      message: "Vérifiez votre email pour plus d'informations"
    }
  };

  return (
    <Card radius='lg' w='80%' mx='auto' p={{base:'sm', md:"xl"}} className="h-full">
      <Stack align="center" gap={30} >
        <Title order={2} ta="center">
          {content[language].title}
        </Title>
        <Box>
          <Image src='/auth/successLogo.png' w={100}/>
        </Box>
        <Text ta='center' fz={13}>{content[language].message}</Text>
        <Stack align="center" gap={15}>
        </Stack>
       
          <Button component={Link} href="https://dashboard.emptyad.com/driver-login"  bg="#D481B5" type="submit" >
           Login Now
          </Button>
      </Stack>
    </Card>
  );
};

export default SuccessMessage;