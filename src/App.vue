<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<div class="app-container">
			<div class="ball" v-if="store.loading">
				<div class="ball1"></div>
				<div class="ball2"></div>
				<div class="ball3"></div>
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
	.ball {
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
		background: rgba(0, 0, 0, 0.5); /*设置背景颜色*/
		margin: 0px auto;
	}

	.ball > p {
		/*设置加载的提示文字的样式*/
		padding: 20px 0;
	}

	.ball > div {
		/*设置动画中三个小球的样式*/
		width: 18px; /*设置大小*/
		height: 18px;
		background: #1abc9c; /*设置背景颜色*/
		border-radius: 100%; /*设置圆角边框*/
		display: inline-block; /*设置其显示方式*/
		animation: move 1.4s infinite ease-in-out both; /*添加动画*/
	}

	.ball .ball1 {
		/*设置第一个小球的动画延迟*/
		animation-delay: 0.16s;
	}

	.ball .ball2 {
		/*设置第二个小球的动画延迟*/
		animation-delay: 0.32s;
	}

	.ball .ball3 {
		/*设置第二个小球的动画延迟*/
		animation-delay: 0.48s;
	}

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
