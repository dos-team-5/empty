import {
  Accordion,
  Badge,
  Checkbox,
  Flex,
  InputLabel,
  List,
} from '@mantine/core';
import { AddonConfig } from '../types';

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
        <Flex align="center" gap={8}>
          <InputLabel
            fz={16}
            htmlFor={addon.id}
            className="cursor-pointer text-base font-medium"
          >
            {addon.label}
          </InputLabel>
          <Badge variant="outline">Same Pricing</Badge>
        </Flex>
      </Flex>
    </Accordion.Control>
    <Accordion.Panel>
      <List listStyleType="disc" spacing="xs" size="sm" withPadding>
        {addon.features.map((feature, index) => (
          <List.Item key={index}>{feature}</List.Item>
        ))}
      </List>
    </Accordion.Panel>
  </Accordion.Item>
);
