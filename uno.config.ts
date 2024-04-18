// uno.config.ts
import { defineConfig } from 'unocss';

export default defineConfig({
	rules: [[/^font-size-([\.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}px` })]],
});
