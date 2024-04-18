<template>
	<div class="menusider">
		<n-menu :options="menuOptions" @update:value="handleUpdateValue" />
	</div>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
const menuOptions = ref([
	{
		key: 'divider-1',
		type: 'divider',
		label: '1973年的弹珠玩具',
		props: {
			style: {
				marginLeft: '32px',
			},
		},
	},
]);
const handleUpdateValue = (key: string, item: MenuOption) => {};
</script>

<style lang="less" scoped></style>
