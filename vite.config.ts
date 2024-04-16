import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';
import apiAuto from 'api-auto-import/vite';
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
		apiAuto({
			resolveAliasName: '@/api',
			outFile: 'index',
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
	build: {
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
});
