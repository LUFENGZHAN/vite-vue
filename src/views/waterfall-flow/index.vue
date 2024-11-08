<template>
	<div class="three"></div>
</template>

<script lang="ts" setup>
let image: any[] = [];
let width = 200;
const getColumns = () => {
	const threeWidth = document.querySelector('.three')?.clientWidth || 0;

	const columns = Math.floor(threeWidth / width);
	return {
		columns,
		gap: (threeWidth - columns * width) / (columns + 1),
	};
};

const init = () => {
	const { columns, gap } = getColumns();
	let three = document.querySelector('.three');
	if (!three) return;
	three.innerHTML = '';
	const col = Array(columns).fill(0);

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < image.length; i++) {
		const img = new Image();
		img.src = image[i].url;
		img.onload = () => {
			const height = width * (img.height / img.width);

			const min = Math.min(...col);
			const index = col.indexOf(min);

			const left = index * (width + gap) + gap;
			const top = col[index];

			const div = document.createElement('img');
			div.src = image[i].url;
			div.style.width = `${width}px`;
			div.style.height = `${height}px`;
			div.style.left = `${left}px`;
			div.style.top = `${top}px`;
			div.style.position = 'absolute';
			fragment.appendChild(div);
			col[index] += height + gap;
			if (i === image.length - 1) {
				three?.appendChild(fragment);
			}
		};
	}
};
onMounted(async () => {
	image = Array.from({ length: 28 }).map((_, i) => {
		return {
			name: 'image' + i,
			url: '/src/assets/images/image/' + (i + 1) + '.jpeg',
		};
	});
	init();
});
let timer: any = null;
window.onresize = () => {
	clearTimeout(timer);
	timer = setTimeout(() => {
		init();
	}, 300);
};
</script>

<style lang="less" scoped>
.three {
	position: relative; // 设置父容器为相对定位
	height: 100vh;
	overflow: auto;
	margin: auto 15%;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
