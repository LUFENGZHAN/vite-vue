import { useRouters } from '@/pinia/modules/pinia-router';
import { useToken } from '@/pinia/modules/pinia-token';
import { $apiData } from '@/api';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: {
            piniaRouters: ReturnType<typeof useRouters>;
            piniaToken: ReturnType<typeof useToken>;
        };
        $apis: typeof $apiData;
    }
}