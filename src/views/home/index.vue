<template>
    <div class="home-container">
        <!-- 顶部问候语卡片 -->
        <n-card class="greeting-card" :bordered="false">
            <div class="greeting-content">
                <img class="avatar" src="@/assets/images/avatar.png" alt="avatar" />
                <div class="greeting-text">
                    <h1>{{ greeting }}</h1>
                    <p class="subtitle">欢迎回来，{{ $store.piniaToken.userInfo?.name }}</p>
                </div>
            </div>
        </n-card>

        <div class="content-wrapper">
            <!-- 左侧个人信息 -->
            <n-card class="info-card" :bordered="false">
                <template #header>
                    <div class="card-header">
                        <n-icon size="20">
                            <PersonOutline />
                        </n-icon>
                        <span>个人信息</span>
                    </div>
                </template>
                <n-descriptions :column="1" label-placement="left">
                    <n-descriptions-item label="性别">
                        <n-tag :bordered="false" type="info">
                            {{ $store.piniaToken.userInfo?.sex === 0 ? '男' : '女' }}
                        </n-tag>
                    </n-descriptions-item>
                    <n-descriptions-item label="个人简介">
                        {{ $store.piniaToken.userInfo?.introduction }}
                    </n-descriptions-item>
                </n-descriptions>
            </n-card>

            <!-- 右侧在线用户列表 -->
            <n-card class="online-card" :bordered="false">
                <template #header>
                    <div class="card-header">
                        <n-icon size="20">
                            <PeopleOutline />
                        </n-icon>
                        <span>在线用户 ({{ onlineUsers.length }})</span>
                    </div>
                </template>
                <n-scrollbar style="max-height: 400px">
                    <div class="online-users-list">
                        <div v-for="user in onlineUsers" :key="user.id" class="online-user-item">
                            <n-avatar round :size="40" :src="avatar" />
                            <div class="user-info">
                                <span class="username">{{ user.account }}</span>
                                <span class="status">
                                    <n-badge dot processing type="success" />
                                    在线
                                </span>
                            </div>
                        </div>
                    </div>
                </n-scrollbar>
            </n-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { PersonOutline, PeopleOutline } from '@vicons/ionicons5'
import { computed, ref } from 'vue'
import avatar from '@/assets/images/avatar.png'

const onlineUsers = ref<any[]>([])

// 根据时间生成问候语
const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 6) return '夜深了'
    if (hour < 9) return '早上好'
    if (hour < 12) return '上午好'
    if (hour < 14) return '中午好'
    if (hour < 17) return '下午好'
    if (hour < 19) return '傍晚好'
    return '晚上好'
})
onBeforeMount(() => {
    $apis.online.list().then(res => {
        onlineUsers.value = res.data || []
    })
})
</script>

<style lang='less' scoped>
.home-container {
    padding: 24px;
    background: #f5f7fa;

    .greeting-card {
        margin-bottom: 24px;
        background: linear-gradient(135deg, #00bcd4 0%, #8bc34a 100%);

        .greeting-content {
            display: flex;
            align-items: center;
            gap: 20px;

            .avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 4px solid rgba(255, 255, 255, 0.3);
            }

            .greeting-text {
                color: #fff;

                h1 {
                    font-size: 2rem;
                    margin: 0;
                    margin-bottom: 8px;
                }

                .subtitle {
                    margin: 0;
                    font-size: 1.1rem;
                    opacity: 0.9;
                }
            }
        }
    }

    .content-wrapper {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #666;
            font-size: 16px;
            font-weight: 500;
        }

        .info-card,
        .online-card {
            height: fit-content;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }

        .online-users-list {
            .online-user-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border-bottom: 1px solid #f0f0f0;
                transition: background-color 0.3s ease;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background-color: #f9f9f9;
                }

                .user-info {
                    margin-left: 12px;
                    display: flex;
                    flex-direction: column;

                    .username {
                        font-weight: 500;
                        color: #333;
                    }

                    .status {
                        font-size: 0.9rem;
                        color: #666;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        margin-top: 4px;
                    }
                }
            }
        }
    }
}
</style>
