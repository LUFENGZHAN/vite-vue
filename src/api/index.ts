/*eslint-disable*/
// @ts-ignore 
// @ts-ignore
import auth_index from '@/api/auth/index'


export const $apiDate = {
    auth: {
        index: auth_index
    }
};

// @ts-ignore
export const import_auth_index = auth_index

declare global {
    const $apis:typeof $apiDate;
}
export default $apiDate
