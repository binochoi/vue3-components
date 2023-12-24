<!--
  # Improved Ant Vue Menu
  ## Features
  - auto fold & spread navigate if closed all
-->
<script lang="ts" setup>
import { Menu } from 'ant-design-vue';
import { type MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { watch } from 'vue';
import type { MenuItem, Props } from './types';
import { useTreeMenu } from './useTreeMenu';

const props = withDefaults(
  defineProps<Props>(),
  {
    mode: 'inline',
  },
);
defineEmits<{
  'click:item': [param: MenuInfo];
}>();
const selectedKeys = defineModel<string[]>('selectedKeys', { required: true });
const openKeys = defineModel<string[]>('spreadedFolderKeys', { required: true });
// eslint-disable-next-line vue/no-setup-props-destructure
const searchedItems = defineModel<MenuItem[]>('searchedItems');

const getParentFolderKey = (selected: string) => props.items.filter(({ children }) => children?.some(({ key }) => key === selected)).at(0)?.key;
watch(selectedKeys, () => {
  selectedKeys.value.forEach((selectedKey) => {
    const parentKey = getParentFolderKey(selectedKey);
    if (!parentKey || openKeys.value.includes(parentKey)) {
      return;
    }
    openKeys.value.push(parentKey);
  });
}, {
  immediate: true,
});

const { useFiltering } = useTreeMenu();
const { getSearchedItems } = useFiltering();
watch(() => props.searchText, (searchText) => searchedItems.value = searchText ? getSearchedItems(props.items, searchText) : []);
</script>
<template>
  <Menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    v-bind="{
      ...props,
      items: searchText ? searchedItems : items,
    }"
    @click="$emit('click:item', $event)"
  />
</template>
<style lang="scss" scoped>
</style>
