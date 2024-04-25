<template>
	<div class="menusider">
		<n-scrollbar>
			<n-menu v-model:value="selectedKeyRef" :options="menuOptions" @update:value="handleUpdateValue" accordion />
		</n-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const selectedKeyRef = computed(()=>$store.piniaRouters.active);
const menuOptions: MenuOption[] = $store.piniaRouters.getMenuSiderList();
const handleUpdateValue = (key: string) => {
	$store.piniaRouters.setActive(key as string);
	router.push(key);
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
