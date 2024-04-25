<template>
	<div class="info">
		<n-upload
			v-model:file-list="FileList"
			:action="'/api/upload'"
			class="upload"
			:default-upload="false"
			@before-upload="beforeUpload"
			list-type="image-card"
			:max="1"
		/>
		<n-form ref="formRef" :model="formDate" label-placement="left">
			<n-form-item label="昵称:">
				<n-input v-model:value="formDate.name" placeholder="请输入昵称" />
			</n-form-item>
			<n-form-item label="性别:">
				<n-radio-group v-model:value="formDate.sex" name="radiogroup1">
					<n-space>
						<n-radio :value="0"> 女 </n-radio>
						<n-radio :value="1">男 </n-radio>
					</n-space>
				</n-radio-group>
			</n-form-item>
			<n-form-item label="注册时间:">
				<n-date-picker type="datetime" v-model:formatted-value="formDate.creation_time"  placeholder="选择时间" />
			</n-form-item>
		</n-form>
		<common-footer justify="center">
			<n-button round type="default" @click="destroy"> 关闭 </n-button>
			<n-button round type="primary" @click="handleValidateButtonClick"> 保存 </n-button>
		</common-footer>
	</div>
</template>
<script lang="ts" setup>
import { FormInst, UploadFileInfo } from 'naive-ui';
const formRef = ref<FormInst | null>(null);
const formDate = ref<any>({});

const FileList = ref([]);

const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
	if (data.file?.type !== 'image/png') {
		$message.error('只能上传png格式的图片文件,请重新上传');
		return false;
	}
	return true;
};
const destroy = () => {
	$alert.close();
};
const handleValidateButtonClick = (e: MouseEvent) => {
	e.preventDefault();
	formRef.value?.validate(errors => {
		if (!errors) {
            console.log(formDate.value);
			$message.success('验证成功');
			$alert.close();
		}
	});
};
onMounted(() => {});
</script>

<style lang="less" scoped>
.info {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.upload {
	width: 200px;
	margin-right: 20px;
}
</style>
