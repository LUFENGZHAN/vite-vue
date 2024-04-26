<template>
	<n-space vertical class="home">
		<n-space>
			<slot name="header"></slot>
		</n-space>
		<n-data-table :columns="dataTableProps.columns" :data="columnsData" :max-height="height" @update:checked-row-keys="handleCheck" />
		<n-space justify="end">
			<n-pagination
				:item-count="pagination.itemCount"
				:page-sizes="pagination.pageSizes"
				:show-size-picker="pagination.showSizePicker"
				:show-quick-jumper="pagination.showQuickJumper"
				:page="pagination.page"
				:page-size="pagination.pageSize"
				:on-update:page="pagination.onChange"
				:on-update:page-size="pagination.onUpdatePageSize"
				:prefix="pagination.prefix"
			/>
		</n-space>
	</n-space>
</template>

<script lang="ts" setup>
import type { DataTableRowKey,DataTableColumns } from 'naive-ui';
const props = withDefaults(defineProps<propsType>(), {
	height: 600,
	dataField: 'list',
});

const emits = defineEmits(['update:params', 'update:checkedRowKeys']);
watch(
	() => props.params,
	newVal => {
		emits('update:params', newVal);
	},
	{ deep: true }
);
const handleCheck = (rowKeys: DataTableRowKey[]) => {
	emits('update:checkedRowKeys', rowKeys);
};

const columnsData = ref<any>([]);
const apiParams = reactive({
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
	showQuickJumper: true,
	pageSizes: [5, 10, 15, 20],
	onChange: (page: number) => {
		pagination.page = page;
		apiParams.page = page;
		initDate();
	},
	onUpdatePageSize: (pageSize: number) => {
		pagination.pageSize = pageSize;
		apiParams.pageSize = pageSize;
		pagination.page = 1;
		apiParams.page = 1;
	},
});

const initDate = async () => {
	if (props.dataTableProps?.columnsData && props.dataTableProps?.columnsData.length > 0) return;
	const data: dataType = props.apiDate && (await props.apiDate(apiParams));
	if (typeof data === 'function') return;
	columnsData.value = data.data[props.dataField] ? data.data[props.dataField] : data.data;
	pagination.pageSize = data.data[props.dataField] ? data.data.pageSize : (data.data.length as any);
	pagination.page = data.data[props.dataField] ? data.data.page : 1;
	pagination.itemCount = data.data[props.dataField] ? data.data.total : 0;
};

// 暴露方法
defineExpose({
	initDate,
});
onMounted(async () => {
	await initDate();
	Object.assign(apiParams, props.params);
	Object.assign(pagination, props.pagination);
});

interface propsType {
	height?: number;
	apiDate?: (data: any) => Promise<any>;
	dataTableProps: dataTablePropsType;
	dataField?: string;
	params?: {
        [key: string]:any;
    };
    pagination?:any
}
interface dataTablePropsType{
	[key: string]: any;
    columnsData?:any[],
    columns:DataTableColumns
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
</script>

<style lang="less" scoped>
.home {
	background-color: #fff;
	padding: 20px;
}
</style>
```
