<template>
    <CommonLayout :api-data="$apis.auth.profile"  :search-props="{
        addText: '新增用户',
        placeholder: '请输入用户名称11',
    }" :data-table-props="{
        columns: columns,
    }" @add="add()">
<template #table-sex>111</template>
    </CommonLayout>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
const params = ref({ page: 1, pageSize: 10 });
const columns: DataTableColumns = [
    {
        title: '用户名称',
        key: 'name',
    },
    {
        title: '用户性别',
        key: 'sex',
    },
    {
        title: '用户状态',
        key: 'status',
    },
    {
        title: '创建时间',
        key: 'createTime',
    },
    {
        title: '操作',
        key: 'controls',
        width: 200,
        render(rowData, rowIndex) {
            return h(NSpace, {}, () => [
                h(
                    NButton,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => {
                            console.log(rowData);

                        },
                    },
                    {
                        default: () => '编辑',
                    }
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
                    {
                        default: () => '删除',
                    }
                ),
            ]);
        },
    },
];


const add = (row?: any) => {
    $alert.open({
        title: '新增用户',
        content: import('./add.vue'),
        closable: true,
        maskClosable: false,
        positiveText: '确认',
    })
}
</script>

<style lang="less" scoped>
.home {
    background-color: #fff;
}
</style>
