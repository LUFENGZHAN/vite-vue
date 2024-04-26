<template>
	<CommonLayout
		:api-date="apis"
		:params="params"
		:data-table-props="{
			columns: columns,
		}"
	>
		<template #table_name> 123 </template>
	</CommonLayout>
</template>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui';
const params = ref({ page: 1, pageSize: 10 });
const columns: DataTableColumns = [
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
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				code: 200,
				data: {
					list: Array.from({ length: 40 }).map((_, index) => ({
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
