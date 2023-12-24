import { type MenuMode } from 'ant-design-vue/es/menu/src/interface';
import { VNode } from 'vue';

export interface MenuItem {
  key: string;
  icon?: VNode;
  label?: string | VNode;
  children?: MenuItem[];
}
export interface Props {
  items: MenuItem[];
  mode?: MenuMode;
  /** filter only searched items */
  searchText?: string;
}
