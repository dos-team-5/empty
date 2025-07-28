import { Box, Card, Flex, TextInput, Button, Stack, Title, Group, Text, Modal, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Icon } from '@/components/FileManager/lib/Icon';
import { useLanguage } from '@/providers/languageToggleContext';
import { driverSignUpFormContent } from '@/contents/drive/DriverSignUpFormContent';
import SuccessMessage from './SuccessMessage';


interface FormValues {
  name: string;
  email: string;
  phone: string;
  hours: string;
  city: string;
  referralCode?: string;
}

const DriverSignUpForm = () => {
  const { language } = useLanguage();
  const content = driverSignUpFormContent[language];
  const [videoModalOpened, setVideoModalOpened] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      hours: '',
      city: '',
      referralCode: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? content.validation.nameRequired : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : content.validation.emailInvalid),
      phone: (value) => (value.length < 10 ? content.validation.phoneRequired : null),
      hours: (value) => (value.length === 0 ? content.validation.hoursRequired : null),
      city: (value) => (value.length < 2 ? content.validation.cityRequired : null),
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted with values:', values);
    setIsSubmitted(true);
  };

 

  return (
    <>
        <Card radius='lg' w='80%' mx='auto' className="!border !border-[#B6346B]" p={{base:0, sm:'xl'}}>
        <Flex gap={15} justify="space-between" direction={{base:'column', md:'row'}}>

          <Card radius='lg' hiddenFrom="md" className='!bg-primary'>
             <Group hiddenFrom='md'  wrap='nowrap'>
              <ActionIcon  size={28} onClick={() => setVideoModalOpened(true)} variant="transparent">
               <Icon className='text-6xl text-white' icon='icon-park-solid:play'/>
              </ActionIcon>
              
            <Box>
              <Text c="white">
                  {content.videoPlayText}
                </Text>
                <Text c='white' fz={12}>
                 {content.videoSubtext}
                </Text>
            </Box>
            
                
              
            </Group>
          </Card>
           {/* Video/Button card - shows video on desktop, button on mobile */}
           <Card radius='lg' w={{base:'100%', md:"30%"}} bg="#FFD7E8" p="md" visibleFrom='md'>
            {/* Video - only visible on desktop */}
            <Group hiddenFrom='md'>
              <ActionIcon  size={40} onClick={() => setVideoModalOpened(true)} variant="transparent">
               <Icon className='text-8xl' icon='icon-park-solid:play'/>
              </ActionIcon>
              
              <Stack>
                <Text c="white">
                  {content.videoPlayTextDesktop}
                </Text>
                <Text c='white' fz={13}>
                 {content.videoSubtextDesktop}
                </Text>
              </Stack>
            </Group>
            <Box visibleFrom="md" h="100%">
              <iframe
                width="100%"
                height="100%"
                src={`${content.videoUrl.replace('youtube.com/shorts/', 'www.youtube.com/embed/').split('?')[0]}?autoplay=0&loop=1&mute=0&playlist=${content.videoUrl.split('/').pop()?.split('?')[0]}&controls=1&modestbranding=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
            {/* Play button - only visible on mobile */}
           
           </Card>
            <Box w={{base:'100%', md:"65%"}} pt={25} >
                {isSubmitted ? (
                  <SuccessMessage />
                ) : (
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap={25} >
                      <Box>
                          <Title order={3}>{content.title}</Title>
                      <Text fz={13} c="dimmed">{content.subtitle}</Text>
                      </Box>
                    

                      <Flex gap={{base:15, md:10}} direction={{base:'column', md:'row'}} wrap='nowrap'  w='100%' justify='center' >
                               <TextInput w={{base:'100%', md:"48%"}}
                               
                               radius='md'
                               styles={{
                                 input: {
                                   border: 'none',
                                   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                 }
                               }}
                        label={content.form.fullName.label}
                        placeholder={content.form.fullName.placeholder}
                        required
                        {...form.getInputProps('name')}
                      />
                      
                      <TextInput
                       
                      radius='md'
                      styles={{
                         input: {
                           border: 'none',
                           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                         }
                       }}
                     w={{base:'100%', md:"48%"}}
                        label={content.form.email.label}
                        placeholder={content.form.email.placeholder}
                        required
                        {...form.getInputProps('email')}
                      />
                      </Flex>
                      
                      <Flex  gap={{base:15, sm:10}} direction={{base:'column', sm:'row'}}  wrap='nowrap'  w='100%' justify='center' >
                               <TextInput   w={{base:'100%', md:"48%"}}
                               
                               radius='md'
                               styles={{
                                 input: {
                                   border: 'none',
                                   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                 }
                               }}
                        label={content.form.phone.label}
                        placeholder={content.form.phone.placeholder}
                        required
                        {...form.getInputProps('phone')}
                      />
                      
                      <TextInput   w={{base:'100%', md:"48%"}}
                      
                      radius='md'
                      styles={{
                         input: {
                           border: 'none',
                           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                         }
                       }}
                        label={content.form.hours.label}
                        placeholder={content.form.hours.placeholder}
                        required
                        {...form.getInputProps('hours')}
                      />
                      </Flex>
                      
                       <Flex  gap={{base:15, md:10}} direction={{base:'column', md:'row'}} wrap='nowrap'  w='100%' justify='center' >
                          <TextInput   w={{base:'100%', md:"48%"}}
                          
                          radius='md'
                          styles={{
                             input: {
                               border: 'none',
                               boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                             }
                           }}
                        label={content.form.city.label}
                        placeholder={content.form.city.placeholder}
                        required
                        {...form.getInputProps('city')}
                      />
                      
                      <TextInput
                       
                       w={{base:'100%', md:"48%"}}
                      radius='md'
                      styles={{
                         input: {
                           border: 'none',
                           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                         }
                       }}
                        label={content.form.referralCode.label}
                        placeholder={content.form.referralCode.placeholder}
                        {...form.getInputProps('referralCode')}
                      />
                       </Flex>
                      
                      
                      <Group  justify='flex-end' align='center'>
                          <Button className='!text-[#D481B5] !border !border-[#D481B5]' variant='default'>
                              {content.buttons.back}
                          </Button>
                              <Button bg="#D481B5" type="submit" >
                        {content.buttons.submit}
                      </Button>
                      </Group>
                      
                    </Stack>
                  </form>
                )}
            </Box>
        </Flex>
    </Card>
    
    {/* Video Modal */}
    <Modal 
      opened={videoModalOpened} 
      onClose={() => setVideoModalOpened(false)}
      p={0}
      size="lg"
      centered
      withCloseButton={false}

    >
      <Box style={{ aspectRatio: '9/16' }}>
        <iframe
          width="100%"
          height="100%"
          src={`${content.videoUrl.replace('youtube.com/shorts/', 'www.youtube.com/embed/').split('?')[0]}?autoplay=0&loop=1&mute=0&playlist=${content.videoUrl.split('/').pop()?.split('?')[0]}&controls=1&modestbranding=1&rel=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Box>
    </Modal>
    </>
  )
}

export default DriverSignUpForm