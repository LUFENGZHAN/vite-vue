import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';
import path from 'path';
export default defineConfig({
	plugins: [
		vue(),
		vuejsx(),
		legacy({
			targets: ['defaults', 'not IE 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			modernPolyfills: ['es.promise.finally'],
		}),
		AutoImport({
			imports: [
				{
					'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
				},
				'vue',
				'vue-router',
				'pinia',
			],
		}),
		Components({
			resolvers: [NaiveUiResolver()],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		host: true,
		hmr: {
			overlay: false,
		},
	},
});
