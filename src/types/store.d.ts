import { useRouters } from '@/pinia/modules/pinia-router';
import { useToken } from '@/pinia/modules/pinia-token';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: {
      piniaRouters: ReturnType<typeof useRouters>;
      piniaToken: ReturnType<typeof useToken>;
    };
  }
}