<template>
	<n-space vertical class="home">
		<n-space justify="space-between" :wrap="false">
			<n-space>
				<slot name="search">
					<n-input placeholder="请输入关键字" v-model:value="apiParams.search" />
				</slot>
				<n-button type="primary" @click="search">查询</n-button>
				<n-button type="default" @click="reset">重置</n-button>
			</n-space>
			<n-space :wrap="false">
				<slot name="add">
					<n-button type="primary" @click="add">新增</n-button>
				</slot>
			</n-space>
		</n-space>
            
		<n-data-table :data="columnsData" :max-height="height" :single-line="false"  striped v-bind="dataTableProps">
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
const props = withDefaults(defineProps<propsType>(), {
	height: 600,
	dataField: 'list',
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
	showQuickJumper: true,
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
	},
});

const search = () => {
	emits('search');
	initDate();
};
const reset = () => {
	// 重置参数
	apiParams.value.search = '';
	const oldparams = props.params as any;
	Object.keys(oldparams).forEach(key => {
		oldparams[key] = null;
	});
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
	if (typeof data === 'function') return;
	columnsData.value = data.data[props.dataField] ? data.data[props.dataField] : data.data;
	pagination.pageSize = data.data[props.dataField] ? data.data.pageSize : (data.data.length as any);
	if (!data.data[props.dataField]) pagination.pageSizes.push(data.data.length as any);
	pagination.page = data.data[props.dataField] ? data.data.page : 1;
	pagination.itemCount = data.data[props.dataField] ? data.data.total : (data.data.length as any);
};

// 暴露方法
defineExpose({
	initDate,
});
onMounted(async () => {
	Object.assign(apiParams.value, props.params);
	await Object.assign(pagination, props.pagination);
	await initDate();
});

interface propsType {
	height?: number;
	apiDate?: (data: any) => Promise<any>;
	dataTableProps: DataTableProps;
	dataField?: string;
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
</script>

<style lang="less" scoped>
.home {
	background-color: #fff;
	padding: 20px;
}
</style>
```
