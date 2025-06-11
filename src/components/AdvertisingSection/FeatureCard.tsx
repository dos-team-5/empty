import { PlusIcon } from 'lucide-react';

const FeatureCard = () => {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-y-16">
      <div className="hover:bg-primary-50 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-transparent p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-colors duration-150">
        <div className="flex w-full flex-col gap-4">
          <div>
            <img
              width={300}
              height={320}
              src={'https://placehold.co/600x400/EEE/31343C'}
              className="h-80 w-full rounded-lg object-cover object-top md:h-56 lg:h-72 2xl:h-112"
            />
          </div>
          <div className="relative flex h-20 items-center justify-between px-2">
            <h3 className="w-[85%] text-left text-lg font-medium text-[#333333] xl:text-xl 2xl:text-2xl">
              ramdom
            </h3>
            <div className="bg-primary-400 !text-default rounded-full p-1">
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
