import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import apiAuto from 'api-auto-import/vite';
import UnoCSS from 'unocss/vite';
import path from 'path';
export default defineConfig({
	plugins: [
		vue(),
		vuejsx(),
		UnoCSS(),
		legacy({
			targets: ['defaults', 'not IE 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			modernPolyfills: ['es.promise.finally'],
		}),
		apiAuto({
			resolveAliasName: '@/api',
			outFile: 'index',
			isdefault: false,
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
    base: './', 
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	optimizeDeps: {
		exclude: ['electron'],
	},
	server: {
		host: true,
		port: 1111,
		hmr: {
			overlay: false,
		},
	},
	build: {
		chunkSizeWarningLimit: 1500,
	},
});
