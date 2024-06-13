<template>
<div ref="rendererRef" v-largeScreen style="width: 100%;height: 100%;">
</div>
</template>

<script lang='ts' setup>

import renderer from './index'
const rendererRef = ref()
onMounted(() => {
  rendererRef.value.appendChild(renderer)
})

</script>

<style lang='less' scoped>
</style>
