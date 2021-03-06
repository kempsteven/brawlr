<template>
    <div class="message-view">
        <transition name="_transition-anim">
            <loading v-if="userInfoLoading"/>
        </transition>

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
                        :src="userViewImage"
                        class="user-img"
                        alt="user-message-image"
                    >
                </section>

                <h3 class="header-name">
                    {{ userName }}
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
            <message-area :key="activeMessageId" />

            <view-details
                class="view-details"
                :class="{ 'show-info' : showInfo }"
            >
                <button class="_primary" slot="close" @click="unMatch()">
                    Unmatch
                </button>
            </view-details>
        </section>
    </div>
</template>

<script>
import MessageArea from '@/components/messages/MessageArea'
import isMobileMixins from '@/mixins/isMobileMixins'
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            showInfo: false
        }
    },

    mounted () {
        this.checkMessageView()
    },
    
    beforeDestroy () {
        this.messageView = {}

        this.activeMessageId = null
    },

    computed: {
        ...mapFields('message', [
            'messageView',

            'activeMessageId',

            'userInfoLoading',
            'messageListLoading',

            'conversationList'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('socket', [
            'socket'
        ]),

        userName () {
            return Object.keys(this.messageView).length ? `${this.messageView.firstName} ${this.messageView.lastName}` : ''
        },

        userViewImage () {
            if (!Object.keys(this.messageView).length || (this.messageView.profilePictures && this.messageView.profilePictures.every(x => x.image === null))) {
                return require('@/assets/img/avatar-default.png')
            }

            return this.messageView.profilePictures.find(x => x.image !== null).image.url
        }
    },
    
    methods: {
        checkMessageView () {
            if (!Object.keys(this.messageView).length) {
                this.goBackToMessages()
            }
        },

        async goBackToMessages () {
            await this.removeSocketConnection()
            
            this.activeMessageId = null
            
            this.$router.push('/messages')
        },

        async unMatch () {
            const form = new FormData()
            
            // form.append('userOneId', this.user._id)
            form.append('userId', this.messageView._id)

            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to unmatch this user?',
                storeAction: 'match/unMatch',
                storePayload: {
                    form
                }
            })
        },

        async removeSocketConnection () {
            await this.socket.removeListener(`${this.activeMessageId}_new_message`)
        }
    },

    components: {
        MessageArea,
        ViewDetails: () => import('@/components/profile/matches/ViewDetails'),
        Loading: () => import('@/components/global/Loading')
    },

    mixins: [isMobileMixins]
}
</script>

<style lang="scss" scoped>
.message-view {
    height: 100%;
    width: 100%;
    background: #fff;

    /deep/.loading-container {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0;

        .lds-dual-ring {
            &:after {
                border: 5px solid #949494;
                border-color: #949494 transparent #949494 transparent;
            }
        }

        @include mobile {
            min-height: unset;
        }
    }

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

        .view-details {
            width: 30%;
            height: 100%;
            min-width: 300px;
            border-left: 1px solid #ddd;
            overflow-y: auto;
            background: #fff;
            opacity: 1;
            animation: unset;
            border-radius: 0;
            overflow-x: hidden;
            position: relative;

            ._primary {
                position: absolute;
                z-index: 2;
                right: 7px;
                top: 10px;
                min-width: unset;
                padding: 10px 15px;
            }

            @include mobile {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 100%;
                top: 0;
                transition: 0.1s;
            }

            /deep/.image-slider {
                height: 330px;

                @include mobile {
                    height: 300px;
                }
            }

            &.show-info {
                left: 0;
            }
        }
    }
}
</style>