<template>
	<div class="header">
		<n-breadcrumb>
			<n-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i">{{ item }}</n-breadcrumb-item>
		</n-breadcrumb>

		<n-popselect :options="options" size="medium" :on-update:value="update">
			<n-space align="center">
				<n-avatar round size="small" :src="avatar" />
				<i class="iconfont color-#4a4b43b0">&#xe676;</i>
			</n-space>
		</n-popselect>
	</div>
</template>

<script lang="ts" setup>
import avatar from '@/assets/images/avatar.png';
import { useRouters } from '@/pinia/modules/pinia-router';
const router = useRouter();
const store = useRouters();
const breadcrumbList = computed(() => {
    const obj:any = store.flatten.find((e: any)=>e.path === store.active)
    if(!obj) return []
    return obj.breadcrumb.split('/').filter(Boolean)
});
const options = ref([
	{
		label: '个人中心',
		value: 1,
	},
	{
		label: '退出登录',
		value: 2,
	},
]);
const update = (e: any) => {
	switch (e) {
		case 1:
			openinfo();
			break;
		case 2:
            $apis.auth.logout();
			router.replace('/login');
			break;
	}
};
const openinfo = () => {
	$alert.open({
		title: '个人中心',
        maskClosable:false,
		content: import('@/components/Layout/component/info.vue'),
        width: '800px',
	})
};
</script>

<style lang="less" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.n-space {
		cursor: pointer;
		gap: 3px 5px !important;
	}
}
</style>
