<template>
    <div class="message-view">
        <section class="view-header">
            <section class="header-left">
                <section
                    class="back-navigation"
                    v-if="isMobileViewPort"
                    @click="goBackToMessages()"
                >
                    <img
                        :src="require('@/assets/img/icon/back-icon.png')"
                        class="back-icon"
                        alt="back-icon"
                    >
                </section>
                
                <section class="img-container">
                    <img
                        src="@/assets/img/sample-picture.jpg"
                        class="user-img"
                        alt="user-message-image"
                    >
                </section>

                <h3 class="header-name">
                    Manny Pacquiaouaoai
                </h3>
            </section>

            <img
                :src="require('@/assets/img/icon/about.png')"
                class="info-icon"
                alt="info-icon"
                v-if="isMobileViewPort"
                @click="showInfo = !showInfo"
            >
        </section>

        <section class="view-content">
            <message-area />
            
            <message-view-details :class="{ 'show-info' : showInfo }"/>
        </section>
    </div>
</template>

<script>
import MessageArea from '@/components/messages/MessageArea'
import MessageViewDetails from '@/components/messages/MessageViewDetails'
import isMobileMixins from '@/mixins/isMobileMixins'

export default {
    data() {
        return {
            showInfo: false
        }
    },
    
    methods: {
        goBackToMessages () {
            this.$router.push('/messages')
        }
    },

    components: {
        MessageArea,
        MessageViewDetails
    },

    mixins: [isMobileMixins]
}
</script>

<style lang="scss" scoped>
.message-view {
    background: #fff;
    box-shadow: 3px 1px 5px #d1d1d1;
    height: 94.5%;
    width: 100%;

    .view-header {
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);

        @include mobile {
            padding: 10px 15px;
        }

        .header-left {
            display: flex;
            align-items: center;

            .back-navigation {
                margin-right: 15px;
                cursor: pointer;

                @include mobile {
                    margin-right: 10px;
                }

                .back-icon {
                    width: 20px;
                    height: 20px;
                }
            }

            .img-container {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 12px;
                position: relative;
                flex-shrink: 0;

                @include mobile {
                    width: 38px;
                    height: 38px;
                    margin-right: 8px;
                }

                .user-img {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateY(-50%) translateX(-50%);
                }      
            }

            .header-name {
                @include mobile {
                    font-size: 15px;
                }
            }
        }

        .info-icon {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }

    .view-content {
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
        position: relative;

        @include mobile {
            height: calc(100% - 58px);
        }

        .show-info {
            left: 0;
        }
    }
}
</style>