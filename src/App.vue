<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<router-view></router-view>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import useStore  from '@/pinia/modules/pinia-token';
const store = useStore()
watch(() => store.loading, (newVal, oldVal) =>{
    console.log('newVal', newVal);
})
const themeOverrides = {
	common: {
		primaryColor: '#66c923',
		primaryColorHover: '#1d6',
		textColorPressed: '#fff',
	},
	Button: {
		textColorPressed: '#000',
		primaryColor: '#000',
		primaryColorHover: '#000',
	},
	Select: {
		peers: {
			InternalSelection: {
				textColor: '#000',
			},
		},
	},
};
</script>

<style lang="less" scoped></style>
