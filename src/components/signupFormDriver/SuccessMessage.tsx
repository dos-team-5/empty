import { useLanguage } from '@/providers/languageToggleContext';
import { Box, Button, Card, Image, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

const SuccessMessage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'You have successfully signed up',
      message: 'You will now start to receive campaign offers.',
      message2:
        'Want to complete your profile now? You will have to finish this step before accepting your first campaign.',
      loginNow: ' Complete My Profile',
      loginMessage: '*Takes 4–5 minutes',
    },
    fr: {
      title: 'Vous vous êtes inscrit avec succès',
      message: 'Vous pouvez maintenant recevoir des offres de campagnes.',
      message2:
        'Voulez-vous compléter votre profil maintenant? Vous devrez finir cette étape avant de pouvoir accepter votre première campagne.',
      loginNow: 'Complétez mon profil',
      loginMessage:
        'Ceci est une opération en ligne et prendra environ 4-5 minutes.',
    },
  };

  return (
    <Card
      radius="lg"
      w="100%"
      mx="auto"
      p={{ base: 'sm', md: 'xl' }}
      className="h-full"
    >
      <Stack align="center" gap={30}>
        <Title order={2} ta="center">
          {content[language].title}
        </Title>
        <Box>
          <Image src="/auth/successLogo.png" w={100} />
        </Box>
        <Text ta="center" fz={13}>
          {content[language].message}
        </Text>
        <Text ta="center" fz={13}>
          {content[language].message2}
        </Text>
        <Stack align="center" gap={4}>
          <Button
            component={Link}
            href="https://dashboard.emptyad.com/driver-login"
            bg="#D481B5"
            type="submit"
          >
            {content[language].loginNow}
          </Button>
          <Text ta="center" fz={13}>
            {content[language].loginMessage}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SuccessMessage;
