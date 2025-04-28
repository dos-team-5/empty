export type Navigation = NavigationItem[];

export interface NavigationItem {
  label: string;
  dropdown: DropdownItem;
  isDropdown?: boolean;
}

export interface DropdownItem {
  content1?: ContentItem[]; // First column/section
  content2?: ContentItem[]; // Second column/section
  content3?: ContentItem[]; // Third column/section
  content4?: ContentItem[]; // Fourth column/section
  image?: string; // Optional image for the dropdown
}

interface ContentItem {
  itemName?: string;
  href?: string;
}
