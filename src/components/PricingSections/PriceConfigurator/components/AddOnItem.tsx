import {
  Accordion,
  Badge,
  Checkbox,
  Flex,
  InputLabel,
  List,
  Text,
} from '@mantine/core';
import { AddonConfig } from '../types';
import React from 'react';

export const AddonItem = ({
  addon,
  checked,
  onChange,
}: {
  addon: AddonConfig;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <Accordion.Item
    className="!rounded-[10px] !border-pink-100 !bg-white"
    value={addon.id}
  >
    <Accordion.Control>
      <Flex align="start" gap={12}>
        <Checkbox
          id={addon.id}
          checked={checked}
          onChange={(event) => onChange(event.currentTarget.checked)}
        />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
          gap={8}
        >
          <InputLabel
            fz={16}
            htmlFor={addon.id}
            className="cursor-pointer text-base font-medium"
          >
            {addon.label}
            {addon.subLabel && (
              <Text fz={12} my={4} c={'dimmed'}>
                {addon.subLabel}
              </Text>
            )}
          </InputLabel>

          {addon.samePrice && <Badge variant="outline">Same Pricing</Badge>}
        </Flex>
      </Flex>
    </Accordion.Control>
    <Accordion.Panel>
      <>
        {/* Main feature list */}
        <List listStyleType="disc" spacing="xs" size="sm" withPadding>
          {addon.features.map((feature, index) => {
            if (typeof feature === 'string') {
              return <List.Item key={index}>{feature}</List.Item>;
            }
            return null; // We'll handle pricing list separately
          })}
        </List>

        {/* Separate pricing list (if exists) */}
        {addon.features.map((feature, index) => {
          if (typeof feature === 'object' && 'pricing' in feature) {
            return (
              <React.Fragment key={index}>
                <Text px={16} mt={'sm'} fw={600} fz={14}>
                  Pricing
                </Text>
                <List
                  key={`pricing-${index}`}
                  listStyleType="disc"
                  spacing="xs"
                  size="sm"
                  withPadding
                  mt="sm"
                >
                  {feature.pricing.map(
                    (priceText: string, subIndex: number) => (
                      <List.Item key={`price-${index}-${subIndex}`}>
                        {priceText}
                      </List.Item>
                    )
                  )}
                </List>
              </React.Fragment>
            );
          }
          return null;
        })}
      </>
    </Accordion.Panel>
  </Accordion.Item>
);
