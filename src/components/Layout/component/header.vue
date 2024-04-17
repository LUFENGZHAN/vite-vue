<template>
    <div class="header">
        <n-breadcrumb>
            <n-breadcrumb-item>北京总行</n-breadcrumb-item>
            <n-breadcrumb-item> 天津分行</n-breadcrumb-item>
            <n-breadcrumb-item> 平山道支行</n-breadcrumb-item>
        </n-breadcrumb>
        <n-space align="center">
            <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        </n-space>
    </div>
</template>

<script lang='ts' setup>
</script>

<style lang='less' scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .n-space {
        cursor: pointer;
    }
}
</style>
