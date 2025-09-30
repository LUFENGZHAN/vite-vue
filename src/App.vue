<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
        <div class="app-container">
            <div class="loading" v-if="store.loading">
                <div class="loader"></div> 
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
        primaryColor: '#00c8d4',
        primaryColorHover: '#32b3d6',
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
        width: 100vw;
        /*设置整体大小*/
        height: 100vh;
        text-align: center;
        /*设置对齐方式*/
        color: #fff;
        /*设置文字颜色*/
        background: rgba(0, 0, 0, 0.3);
    }

    .loader {
        width: 50px;
        padding: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #25b09b;
        --_m:
            conic-gradient(#0000 10%, #000),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
        mask: var(--_m);
        -webkit-mask-composite: source-out;
        mask-composite: subtract;
        animation: l3 1s infinite linear;
    }

    @keyframes l3 {
        to {
            transform: rotate(1turn)
        }
    }
}
</style>
