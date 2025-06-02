'use client';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const Advertisement = () => {
  const checkItemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // <Box className="relative min-h-dvh">
    //   <motion.div
    //     initial={{ x: '-32%', scale: 0.7, y: '-8%' }}
    //     whileInView={{ x: 0, scale: 1, y: 0 }}
    //     transition={{ duration: 1, ease: 'easeOut' }}
    //     viewport={{ once: true }}
    //     className="absolute top-auto bottom-0 left-0 z-20 md:bottom-4 lg:top-[20dvh] xl:top-[24dvh] 2xl:top-[32dvh]"
    //   >
    //     <Image
    //       src={'/R22.png'}
    //       alt=""
    //       width={1000}
    //       height={1000}
    //       className="w-full sm:origin-bottom-left sm:scale-75 md:origin-bottom-left md:scale-100 lg:scale-60 xl:scale-72 2xl:scale-100"
    //       priority
    //     />
    //   </motion.div>
    //   <Box
    //     maw={1800}
    //     mx={'auto'}
    //     className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    //   >
    //     <Box className="flex h-full flex-col items-start justify-start">
    //       <Box className="pt-16 md:pt-20">
    //         <Title
    //           order={1}
    //           fw={700}
    //           ff={'var(--font-poppins)'}
    //           className="text-start capitalize"
    //         >
    //           <TextAnimate
    //             animation="blurInUp"
    //             by="word"
    //             startOnView
    //             duration={0.5}
    //             className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
    //             once
    //           >
    //             Why Advertisers Choose EMPTY
    //           </TextAnimate>
    //         </Title>
    //         <div className="right-20 mt-4 flex flex-col gap-4 md:absolute md:mt-6 lg:mt-8 xl:right-[16dvw]">
    //           {[
    //             {
    //               title: 'Budget-friendly, Brand-ready.',
    //               des: 'Launch flexible, scalable campaigns. Perfect for startups or global brands. ',
    //             },
    //             {
    //               title: 'High Impact, Low CPM.',
    //               des: 'Fast and simple setup. Premium visibility. Industry-leading ROI',
    //             },
    //             {
    //               title: 'Your Ad, All Over the City.',
    //               des: 'Whether you own a fleet or a single car, your ad will be seen across the entire city.',
    //             },
    //           ].map((item, index) => (
    //             <motion.div
    //               key={index}
    //               variants={checkItemVariants}
    //               initial="hidden"
    //               whileInView="visible"
    //               viewport={{ once: true }}
    //               transition={{ delay: (index + 1) * 0.6 }}
    //               className="flex items-start justify-start gap-x-4 py-2 lg:min-w-auto"
    //             >
    //               <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
    //               <Title
    //                 order={2}
    //                 ff={'var(--font-poppins)'}
    //                 className="!max-w-xs text-start capitalize xl:!max-w-sm 2xl:!max-w-md"
    //               >
    //                 <div className="mb-0.5 text-lg font-bold opacity-75 lg:text-xl xl:text-2xl 2xl:text-3xl">
    //                   {item.title}
    //                 </div>
    //                 <div className="text-base font-bold opacity-55 lg:text-xl xl:text-2xl 2xl:text-3xl">
    //                   {item.des}
    //                 </div>
    //               </Title>
    //             </motion.div>
    //           ))}
    //         </div>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
    <Box className="relative mt-16">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          className="text-start capitalize"
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
            once
          >
            Why Advertisers Choose EMPTY
          </TextAnimate>
        </Title>
        <Box className="flex h-full flex-col-reverse items-start justify-start lg:mt-8 lg:flex-row lg:items-end lg:justify-between 2xl:mt-16">
          <motion.div
            initial={{ x: '-32%', scale: 0.7, y: '-8%' }}
            whileInView={{ x: 0, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-8 w-full lg:mt-16 lg:w-[70%]"
          >
            <Image
              src={'/R23.png'}
              alt=""
              width={1000}
              height={1000}
              className="w-full"
              priority
            />

 

          </motion.div>
          <div className="mt-4 flex flex-col gap-4 md:mt-6">
            {[
              {
                title: '4x Cheaper Than a Billboard',
                des: 'Get eye-level exposure for a fraction of the price. For the cost of one billboard, deploy a fleet of a dozen drivers generating hundreds of thousands more impressions.',
              },
              {
                title: 'Full-Time Mobile Visibility',
                des: 'Your ads move with full-time rideshare drivers through key high-traffic areas: downtown, events, residential, and commercial areas. ',
              },
              {
                title: 'No Minimums, Scale on Your Terms',
                des: 'Test and optimize at any scale with no long-term contracts or commitments. Easily add or remove cars, update creatives, or expand to new cities whenever you want.',
              },
              {
                title: 'Get Clear, Measurable Results',
                des: 'Launch in 7 days and receive weekly reports with impressions, CPM, and photo verification that keep you fully informed on your campaign’s performance.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={checkItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.6 }}
                className="flex items-start justify-start gap-x-4 py-2 lg:min-w-auto"
              >
                <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
                <Title
                  order={2}
                  ff={'var(--font-poppins)'}
                  c="#333333"
                  className="text-start capitalize lg:!max-w-xs xl:!max-w-sm 2xl:!max-w-md"
                >
                  <div className="mb-0.5 text-lg font-medium xl:text-xl 2xl:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
                    {item.des}
                  </div>
                </Title>
              </motion.div>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Advertisement;
