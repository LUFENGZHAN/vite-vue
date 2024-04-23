<template>
	<div class="header">
		<n-breadcrumb>
			<n-breadcrumb-item>北京总行</n-breadcrumb-item>
			<n-breadcrumb-item> 天津分行</n-breadcrumb-item>
			<n-breadcrumb-item> 平山道支行</n-breadcrumb-item>
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
const router = useRouter();
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
	console.log(e);
	switch (e) {
		case 1:
			break;
		case 2:
			router.replace('/login');
			break;
	}
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
