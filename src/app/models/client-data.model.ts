export interface User {
  select: boolean;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface SelectionInfo {
  isIndeterminate: boolean;
  isAllSelected: boolean;
}
