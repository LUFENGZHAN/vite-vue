<template>
	<n-form ref="formRef" :model="formDate" :rules="rules" label-placement="top">
		<n-grid :cols="24" :x-gap="24">
			<n-form-item-gi :span="12" label="Input" path="inputValue">
				<n-input v-model:value="formDate.inputValue" placeholder="Input" />
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Textarea" path="textareaValue">
				<n-input
					v-model:value="formDate.textareaValue"
					placeholder="Textarea"
					type="textarea"
					:autosize="{
						minRows: 3,
						maxRows: 5,
					}"
				/>
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Checkbox Group" path="checkboxGroupValue">
				<n-checkbox-group v-model:value="formDate.checkboxGroupValue">
					<n-space>
						<n-checkbox value="Option 1"> Option 1 </n-checkbox>
						<n-checkbox value="Option 2"> Option 2 </n-checkbox>
						<n-checkbox value="Option 3"> Option 3 </n-checkbox>
					</n-space>
				</n-checkbox-group>
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Radio Group" path="radioGroupValue">
				<n-radio-group v-model:value="formDate.radioGroupValue" name="radiogroup1">
					<n-space>
						<n-radio value="Radio 1"> Radio 1 </n-radio>
						<n-radio value="Radio 2"> Radio 2 </n-radio>
						<n-radio value="Radio 3"> Radio 3 </n-radio>
					</n-space>
				</n-radio-group>
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Radio Button Group" path="radioGroupValue">
				<n-radio-group v-model:value="formDate.radioGroupValue" name="radiogroup2">
					<n-radio-button value="Radio 1"> Radio 1 </n-radio-button>
					<n-radio-button value="Radio 2"> Radio 2 </n-radio-button>
					<n-radio-button value="Radio 3"> Radio 3 </n-radio-button>
				</n-radio-group>
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Input Number" path="inputNumberValue">
				<n-input-number v-model:value="formDate.inputNumberValue" />
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Time Picker" path="timePickerValue">
				<n-time-picker v-model:value="formDate.timePickerValue" />
			</n-form-item-gi>
			<n-form-item-gi :span="12" label="Slider" path="sliderValue">
				<n-slider v-model:value="formDate.sliderValue" :step="5" />
			</n-form-item-gi>
			<n-gi :span="24">
				<div style="display: flex; justify-content: flex-end">
					<n-button round type="default" @click="destroy"> 关闭 </n-button>
					<n-button round type="primary" @click="handleValidateButtonClick"> 验证 </n-button>
				</div>
			</n-gi>
		</n-grid>
	</n-form>
</template>
<script lang="ts" setup>
import { FormInst } from 'naive-ui';
const props =defineProps({
	id:{
		type:Object,
		default:()=>({})
	}
})
const formRef = ref<FormInst | null>(null);
const formDate = ref<any>({});
const rules = ref({
	inputValue: {
		required: true,
		trigger: ['blur', 'input'],
		message: '请输入 inputValue',
	},
});
const destroy = ()=>{
    $alert.close()
}
const handleValidateButtonClick = (e: MouseEvent) => {
	e.preventDefault();
	formRef.value?.validate(errors => {
		if (!errors) {
			$message.success('验证成功');
		}
	});
};
onMounted(() => {
  console.log(props);  
})
</script>

<style lang="less" scoped></style>
