<template>
	<div class="layout">
		<div class="menu">
			<div class="menu-logo">
				<p>后台管理</p>
			</div>
			<menu-sider></menu-sider>
		</div>
		<div class="content">
			<layout-header />
			<div class="main">
				<transition name="fade">
					<KeepAlive v-if="route.meta.keepAlive">
						<router-view v-slot="{ Component, route }">
							<component :is="Component" :key="route.path" />
						</router-view>
					</KeepAlive>
					<router-view v-else v-slot="{ Component, route }">
						<component :is="Component" :key="route.path" />
					</router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import menuSider from './component/menusider.vue';
import layoutHeader from './component/header.vue';
const route = useRoute();
console.log(route);
</script>

<style lang="less" scoped>
.layout {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	background-color: #f0f2f5;

	.menu {
		width: 200px;
		height: 100%;
		background-color: #22282a;
		float: left;

		.menu-logo {
			padding: 10px 20px;
			box-sizing: border-box;
			border-bottom: 1px dashed #333;
			text-align: center;
			height: 60px;

			p {
				font-size: 20px;
				font-weight: 700;
				color: #000;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		width: calc(100% - 200px);
		height: 100%;
		float: left;
	}

	.header {
		width: 100%;
		height: 60px;
		padding: 20px 20px;
		box-sizing: border-box;
		background-color: #fff;
	}

	.main {
		width: calc(100% - 200px);
		height: 100%;
	}
}
</style>
