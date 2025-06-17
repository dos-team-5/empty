import { cn } from '@/lib/utils';

export function PricingFeature() {
  const features = [
    {
      title: '2–5x Better CPM Than Billboards',
      description:
        'Turn one car into 200,000+ impressions a month. Our door-side ads crush billboards on cost, reach, and visibility.',
    },
    {
      title: 'Complete Month-to-Month Flexibility',
      description:
        'Add and remove cars, update creatives, or expand cities at no extra cost. ',
    },
    {
      title: 'Go Live in 7 Days',
      description: 'Upload your creativity and go live in just one week.',
    },
    {
      title: 'Full Transparency, No Guesswork',
      description:
        'Weekly reports with impressions, CPM, and photo proof keep you in control.',
    },
    {
      title: 'Mobile Reach, Driven Full-Time',
      description:
        'Your message moves through high-traffic areas all day, every day. Our driving partners are full-time. ',
    },
    {
      title: 'Start with a Single Car, Completely Scalable',
      description:
        'Get results with a single car. Not only do we offer better CPM than all competition, we offer no barrier to entry. See the results, then scale as slow or as fast as you want. ',
    },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature border-primary relative flex flex-col py-4 lg:border-r',
        (index === 0 || index === 4) && 'lg:border-l',
        index < 4 && 'lg:border-b'
      )}
    >
      {index < 4 && (
        <div className="from-primary-100 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="from-primary-100 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}

      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="group-hover/feature:bg-primary bg-primary-200 absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full transition-all duration-200 group-hover/feature:h-8" />
        <span className="inline-block text-lg font-medium text-[#333333] transition duration-200 group-hover/feature:translate-x-2 xl:text-xl 2xl:text-2xl">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
        {description}
      </p>
    </div>
  );
};
