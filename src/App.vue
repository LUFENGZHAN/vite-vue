<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<router-view></router-view>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
const themeOverrides = {
	common: {
		primaryColor: '#fff',
		primaryColorHover: '#fff',
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
				textColor: '#FF0000',
			},
		},
	},
};
</script>

<style lang="less" scoped></style>
