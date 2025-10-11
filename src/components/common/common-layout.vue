<template>
    <n-space vertical class="home">
        <n-space justify="space-between" :wrap="false">
            <n-space>
                <slot name="search">
                    <n-input :placeholder="queryHeader.placeholder" v-model:value="apiParams[searchField]" />
                </slot>
                <n-button type="primary" @click="search" v-if="queryHeader.search">查询</n-button>
                <n-button type="default" @click="reset" v-if="queryHeader.reset">重置</n-button>
            </n-space>
            <n-space :wrap="false">
                <slot name="add">
                    <n-button type="primary" @click="add" v-if="queryHeader.showAdd">{{ queryHeader.addText
                        }}</n-button>
                </slot>
            </n-space>
        </n-space>
        <n-space justify="space-between" :wrap="false">
            <slot name="head"></slot>
        </n-space>

        <n-data-table :data="columnsData" :max-height="height" :single-line="false" striped v-bind="dataTableProps">
        </n-data-table>
        <slot name="footer"></slot>
        <slot name="pagination" v-if="pagination.pageSizes[pagination.pageSizes.length - 1] !== pagination.itemCount">
            <n-space justify="end">
                <n-pagination v-bind="pagination" />
            </n-space>
        </slot>
    </n-space>
</template>

<script lang="ts" setup>
import type { PaginationProps, DataTableProps } from 'naive-ui';

const queryHeader = ref({
    addText: '新增',
    showAdd: true,
    search: true,
    reset: true,
    placeholder: '请输入搜索内容',
});

const props = withDefaults(defineProps<propsType>(), {
    height: 600,
    dataField: 'list',
    searchField: 'search',
});
watchEffect(() => {
    if (props.searchConfig) {
        Object.assign(queryHeader.value, props.searchConfig);
    }
});
const emits = defineEmits(['update:params', 'search', 'reset', 'add']);

const columnsData = ref<any>([]);
const apiParams = ref<any>({
    page: 1,
    pageSize: 10,
});
const pagination = reactive({
    page: 1,
    itemCount: 0,
    pageSize: 10,
    prefix({ itemCount }: any) {
        return `共 ${itemCount} 条`;
    },
    showSizePicker: true,
    showQuickJumper: false,
    pageSizes: [5, 10, 15, 20],
    'on-update:page': (page: number) => {
        pagination.page = page;
        apiParams.value.page = page;
        initDate();
    },
    'on-update:page-size': (pageSize: number) => {
        pagination.pageSize = pageSize;

        apiParams.value.pageSize = pageSize;
        pagination.page = 1;
        apiParams.value.page = 1;

        initDate();

    },
});

const search = () => {
    emits('search');
    initDate();
};
const reset = () => {
    // 重置参数
    delete apiParams.value[props.searchField];
    const oldparams = props.params as any;

    if (oldparams) {
        Object.keys(oldparams).forEach(key => {
            oldparams[key] = null;
        });
    };
    emits('update:params', oldparams);
    emits('reset');
    initDate();
};
const add = () => {
    emits('add');
};
const initDate = async () => {
    if (props.dataTableProps?.data && props.dataTableProps?.data.length > 0) return;
    const data: dataType = props.apiDate && (await props.apiDate({ ...props.params, ...apiParams.value }));
    if (typeof data === 'function' || !data) return;
    const resp = data.data || {};
    const list = resp[props.dataField] || resp.list || (Array.isArray(resp) ? resp : []);
    columnsData.value = list;

    pagination.page = resp.page || 1;
    pagination.itemCount = resp.total || list.length || 0;
};

// 暴露方法
defineExpose({
    initDate,
});
onBeforeMount(async () => {
    Object.assign(apiParams.value, props.params);
    Object.assign(pagination, props.pagination);
    await initDate();
});

interface propsType {
    height?: number;
    apiDate?: (data: any) => Promise<any>;
    dataTableProps: DataTableProps;
    searchConfig?: searchConfig;
    dataField?: string;
    searchField?: string;
    params?: {
        [key: string]: any;
    };
    pagination?: PaginationProps;
}
interface dataType {
    [key: string]: any;
    code: number;
    data: {
        [key: string]: any;
        list: any[];
        page: number;
        pageSize: number;
        total: number;
    };
    message: string;
    msg?: string;
}

interface searchConfig {
    [key: string]: any;
    addText?: string;
    showAdd?: boolean;
    search?: boolean;
    reset?: boolean;
    placeholder?: string;
}
</script>

<style lang="less" scoped>
.home {
    background-color: #fff;
    padding: 20px;
}
</style>
