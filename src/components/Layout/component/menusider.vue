<template>
	<div class="menusider">
		<n-scrollbar>
			<n-menu v-model:value="selectedKeyRef" :options="menuOptions" @update:value="handleUpdateValue" accordion />
		</n-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import useRouters from '@/pinia/modules/set-router';
const getRouters = useRouters();
const selectedKeyRef = ref('');
const menuOptions: MenuOption[] = [
	{
		label: '1973年的弹珠玩具',
		key: 'pinball-1973',
		children: [
			{
				label: '鼠',
				key: 'rat',
			},
		],
	},
	{
		label: '寻羊冒险记',
		key: 'a-wild-sheep-chase',
	},
	{
		label: '舞，舞，舞',
		key: 'dance-dance-dance',
		children: [
			{
				label: '饮品',
				key: 'beverage',
				children: [
					{
						label: '威士忌',
						key: 'whisky',
					},
				],
			},
			{
				label: '食物',
				key: 'food',
				children: [
					{
						label: '三明治',
						key: 'sandwich',
					},
				],
			},
			{
				label: '过去增多，未来减少',
				key: 'the-past-increases-the-future-recedes',
			},
		],
	},
];
const handleUpdateValue = (key: string, item: MenuOption) => {
	console.log(key, item);
};
</script>

<style lang="less" scoped>
.menusider {
	height: calc(100vh - var(--header-height));
	:deep(.n-base-icon svg) {
		color: #fff;
	}
}
</style>
