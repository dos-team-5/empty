import { Icon } from '@iconify/react/dist/iconify.js';
import { Flex, List } from '@mantine/core';

type FeatureItem = string | { [key: string]: string[] };

interface FeatureListProps {
  features: FeatureItem[];
}

const FeatureList = ({ features }: FeatureListProps) => (
  <List fz={14} mt={4}>
    {features.map((feature, index) => {
      if (typeof feature === 'string') {
        return (
          <List.Item mt={4} key={index}>
            <Flex align="center" gap={12}>
              <Icon
                icon="tabler:check"
                width={12}
                height={12}
                color="var(--color-primary)"
              />
              <span>{feature}</span>
            </Flex>
          </List.Item>
        );
      } else {
        // Only one key expected per object
        const [title, subFeatures] = Object.entries(feature)[0];
        return (
          <List.Item fz={14} mt={4} key={index}>
            <Flex align="center" gap={12}>
              <Icon
                icon="tabler:check"
                width={12}
                height={12}
                color="var(--color-primary)"
              />
              <span className="!text-[14px]">{title}</span>
            </Flex>
            <List fz={14} ml={16} mt={4}>
              {subFeatures.map((sub, subIndex) => (
                <List.Item key={subIndex}>
                  <Flex align="center" gap={8}>
                    <Icon
                      icon="pepicons-print:square-filled"
                      width={12}
                      height={12}
                      color="var(--color-primary)"
                    />
                    <span>{sub}</span>
                  </Flex>
                </List.Item>
              ))}
            </List>
          </List.Item>
        );
      }
    })}
  </List>
);

export default FeatureList;
