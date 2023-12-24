import { type MenuMode } from 'ant-design-vue/es/menu/src/interface';

export interface Item {
  key: string;
  label?: string;
  children?: Item[];
}
export interface Props {
  items: Item[];
  mode?: MenuMode;
  /** filter only searched items */
  searchText?: string;
}
