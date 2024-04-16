<template>
    <div class="login">
        <div class="container">
            <div class="dajianshi">
                <span style="--tt:1;"></span>
                <span style="--tt:2;"></span>
                <span style="--tt:3;"></span>
                <span style="--tt:4;"></span>
                <span style="--tt:5;"></span>
                <span style="--tt:6;"></span>
                <span style="--tt:7;"></span>
                <span style="--tt:8;"></span>
                <span style="--tt:9;"></span>
                <span style="--tt:10;"></span>
                <span style="--tt:11;"></span>
                <span style="--tt:12;"></span>
                <span style="--tt:13;"></span>
                <span style="--tt:14;"></span>
                <span style="--tt:15;"></span>
            </div>
            <div class="login-box">
                <h1>登录</h1>
                <n-form ref="formRef" :model="model" label-placement="left" label-width="auto"
                    require-mark-placement="right" :rules="rules">
                    <n-form-item path="username" label="账号">
                        <n-input v-model:value="model.username" @keydown.enter.prevent />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="model.password" type="password" show-password-on="mousedown"
                            @keydown.enter.prevent />
                    </n-form-item>
                </n-form>
                <p class="login-btn" @click="handleLogin">登录</p>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { FormInst, FormItemRule } from 'naive-ui'
const router = useRouter()
const model = ref({
    username: '',
    password: '',
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
        }
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
        }
    },
}

const handleLogin = async () => {
    // 表单校验
    await formRef.value?.validate()
    $store.setToken(model.value.username)
    router.replace('/')
}

</script>

<style lang='less' scoped>
.login {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/login.jpeg') no-repeat center center;
    background-size: cover;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .container {
        width: 800px;
        height: 400px;
        position: relative;
        z-index: 1;
        left: 50%;
        top: 50%;
        background: #ffffff3a;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;

        .login-box {
            background-color: #bfd4000e;
            padding: 0 50px;
            flex: 1;
            height: 100%;

            h1 {
                margin: 24px auto;
                text-align: center;
            }
        }

        .login-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50px;
            margin-top: 20px;
            background: #00bcd4;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
                background: #00bcd480;
            }
        }

        .dajianshi {
            position: relative;
            margin: 0 0 0;
            flex: 1;
            height: 100%;
            transform-style: preserve-3d;
            transform: rotateY(60deg) translateZ(100px);
        }

        .dajianshi span {
            width: 50px;
            height: 10px;
            position: absolute;
            top: calc(20px * var(--tt));
            left: calc(15px * var(--tt));
            bottom: calc(15px * var(--tt));
            right: calc(20px * var(--tt));
            border: 7px solid rgba(0, 120, 124, 0.8);
            border-radius: 50%;
            animation: move 1.5s ease-in-out infinite alternate;
            animation-delay: calc(var(--tt) * 0.1s);
        }

        @keyframes move {

            0%,
            100% {
                transform: translateZ(0px);
            }

            50% {
                transform: translateZ(-100px);
            }
        }
    }
}
</style>