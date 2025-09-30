<template>
    <div class="login">
        <div class="container">
            <div class="login-left">
                <img src="@/assets/images/avatar.png" alt="logo" class="login-logo" />
                <h2 class="welcome-title">欢迎登录</h2>
                <p class="welcome-desc">请使用您的账号和密码登录系统</p>
            </div>
            <div class="login-box">
                <h1>登录</h1>
                <n-form ref="formRef" :model="model" label-placement="left" label-width="auto"
                    require-mark-placement="right" :rules="rules">
                    <n-form-item path="username" label="账号">
                        <n-input v-model:value="model.username" @keydown.enter.prevent placeholder="请输入账号" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="model.password" type="password" show-password-on="mousedown"
                            @keydown.enter.prevent placeholder="请输入密码" />
                    </n-form-item>
                </n-form>
                <p class="login-btn" @click="handleLogin">登录</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FormInst, FormItemRule } from 'naive-ui'
const router = useRouter()
const model = ref({
    username: '12321313123213',
    password: '31232131232',
})
const formRef = ref<FormInst | null>(null)
const rules = {
    username: {
        required: true,
        message: '账号不能为空',
        trigger: ['input', 'blur'],
        validator: (rule: FormItemRule, value: string) => {
            if (/^[a-z0-9_-]{6,16}$/.test(value)) {
                return true
            } else if (value !== '') {
                rule.message = '账号格式由字母数字-_组成,长度为6-16位'
            }
            return false
        },
    },
    password: {
        required: true,
        trigger: ['input', 'blur'],
        message: '密码不能为空',
        validator: (rule: FormItemRule, value: string) => {
            if (/^[a-z0-9_-]{6,18}$/.test(value)) {
                return true
            } else if (value !== '') {
                rule.message = '账号格式由字母数字-_组成,长度为6-18位'
            }
            return false
        },
    },
}

console.log($apis);
const handleLogin = async () => {
    // 表单校验
    await formRef.value?.validate()
    try {
        
        const data = await $apis.auth.login(model.value)
    } catch (error) {

        $store.piniaToken.setToken(model.value.username)
        router.replace('/')
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/login.jpeg') no-repeat center center;
    background-size: cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 0;
    }

    .container {

        width: 900px;
        max-width: 98vw;
        height: 480px;
        min-height: 340px;
        position: relative;
        z-index: 1;
        background: #ffffff3a;
        display: flex;
        align-items: stretch;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        border-radius: 18px;
        overflow: hidden;
        animation: fadeIn 0.8s;

        @media (max-width: 700px) {
            flex-direction: column;
            width: 98vw;
            height: auto;
            min-height: 0;
        }

        .login-left {
            background: rgba(255, 255, 255, 0.18);
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            border-right: 1px solid #e0e0e0;

            @media (max-width: 700px) {
                border-right: none;
                border-bottom: 1px solid #e0e0e0;
            }

            .login-logo {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin-bottom: 18px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }

            .welcome-title {
                font-size: 2rem;
                color: #fff;
                margin-bottom: 10px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
            }

            .welcome-desc {
                color: #e0e0e0;
                font-size: 1rem;
                text-align: center;
            }
        }

        .login-box {
            background-color: #fff;
            padding: 0 50px;
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 0 18px 18px 0;

            @media (max-width: 700px) {
                border-radius: 0 0 18px 18px;
                padding: 30px 10px;
            }

            h1 {
                margin: 24px auto 16px auto;
                text-align: center;
                font-size: 2rem;
                color: #00bcd4;
                font-weight: 700;
            }

            .n-form-item {
                margin-bottom: 18px;
            }
        }

        .login-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50px;
            margin-top: 20px;
            background: linear-gradient(90deg, #00bcd4 0%, #8bc34a 100%);
            border-radius: 8px;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 188, 212, 0.18);
            transition: all 0.3s ease-in-out;
            border: none;

            &:hover {
                background: linear-gradient(90deg, #00bcd480 0%, #8bc34a80 100%);
                transform: scale(1.03);
            }
        }
    }
}
</style>
