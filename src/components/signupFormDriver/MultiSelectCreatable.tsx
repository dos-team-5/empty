'use client';

import {
    Box,
    CheckIcon,
    Combobox,
    Group,
    Pill,
    PillsInput,
    useCombobox,
} from '@mantine/core';
import { useEffect, useState } from 'react';


interface MultiSelectCreatableProps {
  label?: string;
  placeholder?: string;
  data: { value: string; label: string }[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  error?: string;
  searchable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

export function MultiSelectCreatable({
  label,
  placeholder = 'Search values',
  data,
  value,
  onChange,
  error,
  searchable = true,
  disabled = false,
  multiple = false,
  ...props
}: MultiSelectCreatableProps & any) {
  // Handle Mantine form integration - check for form props
  const [internalValue, setInternalValue] = useState(() => {
    const initialValue = props.defaultValue || value;
    if (multiple) {
      return Array.isArray(initialValue) ? initialValue : [];
    } else {
      return typeof initialValue === 'string' ? initialValue : '';
    }
  });

  const actualValue = (() => {
    if (props.value !== undefined) {
      return props.value;
    }
    return internalValue;
  })();

  // Create a unified onChange handler that works with both direct usage and form integration
  const actualOnChange = (newValue: string | string[]) => {
    setInternalValue(newValue);
    // Call the provided onChange if available
    if (props.onChange) {
      props.onChange(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
    // Also call onBlur if it exists (for form integration)
    if (props.onBlur) {
      props.onBlur({ target: { value: newValue } } as any);
    }
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [internalData, setInternalData] = useState(data);

  // Update internal data when prop data changes
  useEffect(() => {
    setInternalData(data);
  }, [data]);

  const exactOptionMatch = internalData.some(
    (item: { value: string; label: string }) =>
      item.label.toLowerCase() === search.toLowerCase()
  );

  const handleValueSelect = (val: string) => {
    setSearch('');
    
    if (val === '$create') {
      const newOption = {
        value: search.toLowerCase().replace(/\s+/g, '-'),
        label: search,
      };
      setInternalData((current: { value: string; label: string }[]) => [
        ...current,
        newOption,
      ]);

      if (multiple) {
        const currentValues = Array.isArray(actualValue) ? actualValue : [];
        actualOnChange([...currentValues, newOption.value]);
      } else {
        actualOnChange(newOption.value);
        combobox.closeDropdown();
      }
    } else {
      if (multiple) {
        const currentValues = Array.isArray(actualValue) ? actualValue : [];
        if (currentValues.includes(val)) {
          // Remove if already selected
          actualOnChange(currentValues.filter(v => v !== val));
        } else {
          // Add to selection
          actualOnChange([...currentValues, val]);
        }
      } else {
        // For single select, if the same value is selected, clear it, otherwise set the new value
        const currentValue = typeof actualValue === 'string' ? actualValue : '';
        const newValue = currentValue === val ? '' : val;
        actualOnChange(newValue);
        combobox.closeDropdown();
      }
    }
  };

  const handleValueRemove = (valueToRemove?: string) => {
    if (multiple) {
      const currentValues = Array.isArray(actualValue) ? actualValue : [];
      if (valueToRemove) {
        actualOnChange(currentValues.filter(v => v !== valueToRemove));
      } else {
        actualOnChange([]);
      }
    } else {
      actualOnChange('');
    }
  };

  const getDisplayLabel = (val: string) => {
    const option = internalData.find(
      (item: { value: string; label: string }) => item.value === val
    );
    return option ? option.label : val;
  };

  // Generate pills based on multiple prop
  const values = (() => {
    if (multiple) {
      const currentValues = Array.isArray(actualValue) ? actualValue : [];
      return currentValues.map((val) => (
        <Pill
          key={val}
          withRemoveButton
          onRemove={() => handleValueRemove(val)}
          disabled={disabled}
        >
          {getDisplayLabel(val)}
        </Pill>
      ));
    } else {
      const currentValue = typeof actualValue === 'string' ? actualValue : '';
      return currentValue ? (
        <Pill
          key={currentValue}
          withRemoveButton
          onRemove={() => handleValueRemove()}
          disabled={disabled}
        >
          {getDisplayLabel(currentValue)}
        </Pill>
      ) : null;
    }
  })();

  const filteredData =
    searchable && search.trim().length > 0
      ? internalData.filter((item: { value: string; label: string }) =>
          item.label.toLowerCase().includes(search.trim().toLowerCase())
        )
      : internalData;

  // Check if option is selected based on multiple prop
  const isOptionSelected = (itemValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(actualValue) ? actualValue : [];
      return currentValues.includes(itemValue);
    } else {
      return actualValue === itemValue;
    }
  };

  const options = filteredData.map((item: { value: string; label: string }) => {
    const isSelected = isOptionSelected(item.value);
    return (
      <Combobox.Option
        value={item.value}
        key={item.value}
        active={isSelected}
      >
        <Group gap="sm">
          {isSelected ? <CheckIcon size={12} /> : null}
          <span style={{ color: isSelected ? '#868e96' : undefined }}>
            {item.label}
          </span>
        </Group>
      </Combobox.Option>
    );
  });

  return (
    <Box  w={{ base: '100%', md: '48%' }} >
      {label && (
        <label
          style={{
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '4px',
            display: 'block',
          }}
        >
          {label}
        </label>
      )}
      <Combobox
      radius='md'
      
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={true}
        disabled={disabled}
   
      >
        <Combobox.DropdownTarget>
          <PillsInput
          radius="md"
            onClick={() => !disabled && combobox.openDropdown()}
            error={error}
            disabled={disabled}
            styles={{
    input: {
      border: 'none',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
  }}
          >
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => !disabled && combobox.openDropdown()}
                  onBlur={() => !multiple && combobox.closeDropdown()}
                  value={search}
                  placeholder={placeholder}
                  onChange={(event) => {
                    if (!disabled) {
                      combobox.updateSelectedOptionIndex();
                      setSearch(event.currentTarget.value);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (!disabled && event.key === 'Backspace' && search.length === 0) {
                      event.preventDefault();
                      if (multiple) {
                        const currentValues = Array.isArray(actualValue) ? actualValue : [];
                        if (currentValues.length > 0) {
                          // Remove the last selected value
                          handleValueRemove(currentValues[currentValues.length - 1]);
                        }
                      } else {
                        const currentValue = typeof actualValue === 'string' ? actualValue : '';
                        if (currentValue) {
                          handleValueRemove();
                        }
                      }
                    }
                  }}
                  disabled={disabled}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {options}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}

            {search.trim().length > 0 && options.length === 0 && (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}

            {search.trim().length === 0 && options.length === 0 && (
              <Combobox.Empty>No options available</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
}