import { PrimaryBtn } from '@/components';
import { Group } from '@mantine/core';
import Link from 'next/link';

const AdTracker = () => {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary-400 mb-12 text-7xl font-bold">
            COMING <br />
            SOON
          </h1>

          <Group justify="center">
            <Link href={'/'}>
              <PrimaryBtn btnText="Back to Home" />
            </Link>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default AdTracker;
