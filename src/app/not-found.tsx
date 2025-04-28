import { PrimaryBtn } from '@/components';
import { Group } from '@mantine/core';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex h-[88dvh] flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1
            className="mb-2 text-6xl font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            404
          </h1>
          <h2 className="text-text/75 mb-4 text-2xl font-medium">
            Page Not Found
          </h2>
          <p className="text-text/75 mb-4">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
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

export default NotFoundPage;
