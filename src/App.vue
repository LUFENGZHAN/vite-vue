<template>
    <router-view></router-view>
</template>

<script lang='ts' setup>
fetch('http://192.168.110.198:3000/api/users', {
    method: 'POST',
})
</script>

<style lang='less' scoped></style>
