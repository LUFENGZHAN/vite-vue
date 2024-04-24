<template>
	<div class="menusider">
		<n-scrollbar>
			<n-menu v-model:value="selectedKeyRef" :options="menuOptions" @update:value="handleUpdateValue" accordion />
		</n-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
const router = useRouter()
console.log($store.piniaRouters.getMenuSiderList,'getMenuSiderList');
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
];
const handleUpdateValue = (key: string, item: MenuOption) => {
    router.push(key)
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