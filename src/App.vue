<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<div class="app-container">
			<div class="loading" v-if="store.loading">
				<div class="box"></div>
				<div class="box"></div>
				<div class="box"></div>
			</div>
			<router-view />
		</div>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import useStore from '@/pinia/modules/pinia-token'
const store = useStore()
if (navigator.onLine) {
  console.log('网络连接正常');
} else {
  console.log('当前处于离线状态');
}
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
}
</script>

<style lang="less" scoped>
.app-container {
	position: relative;
	height: 100%;
	width: 100%;
	.loading {
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		/*设置动画盒子的整体样式*/
		width: 100vw; /*设置整体大小*/
		height: 100vh;
		text-align: center; /*设置对齐方式*/
		color: #fff; /*设置文字颜色*/
		background: rgba(0, 0, 0, 0.3);
		& > .box {
			/*设置动画中三个小球的样式*/
			width: 18px; /*设置大小*/
			height: 18px;
			background: #1abc9c;
			border-radius: 100%;
			animation: move 1.4s infinite ease-in-out both;
			&:nth-of-type(1) {
				/*设置第一个小球的动画延迟*/
				animation-delay: 0.16s;
			}
			&:nth-of-type(2) {
				/*设置第二个小球的动画延迟*/
				animation-delay: 0.32s;
			}
			&:nth-of-type(3) {
				/*设置第三个小球的动画延迟*/
				animation-delay: 0.48s;
			}
		}
	}
	/*设置动画效果*/
	@keyframes move {
		/*创建动画*/
		0% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
}
</style>
