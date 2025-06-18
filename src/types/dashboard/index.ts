export type SideNavItem = {
  id: number;
  label: string;
  path?: string;
  icon: string;
  children: SideNavItem[];
};

export type paginationType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
