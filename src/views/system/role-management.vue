<template>
	<CommonLayout
		:api-date="apis"
		:params="params"
		:data-table-props="{
			columns: columns,
		}"
	>
		
	</CommonLayout>
</template>

<script lang="ts" setup>
import { NButton,NSpace } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
const params = ref({ page: 1, pageSize: 10 });
const columns: DataTableColumns = [
	{
		title: '角色名称',
		key: 'name',
	},
    {
        title: '角色描述',
        key: 'desc',
    },
    {
        title: '创建时间',
        key: 'createTime',
    },
	{
		title: '操作',
		key: 'controls',
        width:200,
        render(rowData, rowIndex) {
            return h(NSpace, { }, [
                h(
                    NButton,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => {
                            console.log(rowData);
                        },
                    },
                    { default: () => '编辑' }
                ),
                h(
                    NButton,
                    {
                        type: 'error',
                        size: 'small',
                        onClick: () => {
                            console.log(rowData);
                        },
                    },
                    { default: () => '删除' }
                ),
            ]);
        },
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
