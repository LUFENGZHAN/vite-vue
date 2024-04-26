<template>
	<CommonLayout
		:api-date="apis"
		:params="params"
		:data-table-props="{
			columns: columns,
		}"
		:width="600"
	></CommonLayout>
</template>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui';
const params = ref({});
const columns: DataTableColumns = [
	{
		type: 'selection',
	},
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Age',
		key: 'age',
	},
	{
		title: '操作',
		key: 'controls',
	},
];
const apis = (data?: any) => {
	console.log(data);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				code: 200,
				data: {
					list: Array.from({ length: 10 }).map((_, index) => ({
						key: index,
						name: `Edward King ${index}-${data.page}`,
						age: 32 + index,
						controls: `London, Park Lane no. ${index}-${data.page}`,
					})),
					page: data.page,
					pageSize: data.pageSize,
					total: 40,
				},
			});
		}, 1000);
	});
};
</script>

<style lang="less" scoped>
.home {
	background-color: #fff;
}
</style>
