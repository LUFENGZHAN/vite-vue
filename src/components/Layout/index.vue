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
                <router-view v-slot="{ Component, route }">
                    <transition name="bounce" mode="out-in">
                        <component  :is="Component" :key="route.fullPath" />
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import menuSider from './component/menusider.vue';
import layoutHeader from './component/header.vue';

</script>

<style lang="less" scoped>
.layout {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #f0f2f5;

    .menu {
        width: var(--menu-width);
        height: 100%;
        background-color: #22282ace;
        float: left;

        .menu-logo {
            padding: 10px 20px;
            box-sizing: border-box;
            border-bottom: 1px dashed #333;
            text-align: center;
            height: var(--header-height);

            p {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: 700;
                color: #000;
            }
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        width: calc(100% - var(--menu-width));
    }

    .header {
        width: 100%;
        height: var(--header-height);
        padding: 20px 20px;
        box-sizing: border-box;
        background-color: #fff;
    }

    .main {
        position: relative;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
        width: 100%;
        height: calc(100vh - var(--header-height));

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            background-color: #b3b3b333;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #979d9e36;
            border-radius: 5px;
        }
    }
}

.bounce-enter-active, .bounce-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.bounce-enter-from, .bounce-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
.bounce-enter-to, .bounce-leave-from {
  transform: scale(1);
  opacity: 1;
}

</style>
