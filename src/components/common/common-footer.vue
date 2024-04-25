<template>
	<n-space class="footer" 			
            :size="size"
			:justify="justify"
			:reverse="reverse"
			:wrap="wrap"
			:vertical="vertical"
			:itemClass="itemClass"
			:itemStyle="itemStyle"
			:inline="inline"
			:wrapItem="wrapItem"
			:align="align">
		<n-space
			:size="size"
			:justify="justify"
			:reverse="reverse"
			:wrap="wrap"
			:vertical="vertical"
			:itemClass="itemClass"
			:itemStyle="itemStyle"
			:inline="inline"
			:wrapItem="wrapItem"
			:align="align"
		>
			<slot />
		</n-space>
	</n-space>
</template>

<script lang="ts" setup>
interface Props {
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	inline?: boolean;
	wrapItem?: boolean;
	itemClass?: string;
	itemStyle?: string;
	justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
	size?: 'small' | 'medium' | 'large' | number | [number, number];
	reverse?: boolean;
	wrap?: boolean;
	vertical?: boolean;
}
withDefaults(defineProps<Props>(), {
	size: 'medium',
	justify: 'start',
	reverse: false,
	wrap: false,
	vertical: false,
	itemClass: '',
	itemStyle: '',
	inline: false,
	wrapItem: true,
	align: 'start',
});
</script>

<style lang="less" scoped>
.footer {
	position: absolute;
	bottom: 8px;
	width: calc(100% - 28px *2);
}
</style>
