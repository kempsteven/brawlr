<template>
    <section class="message-navigation">
        <section class="navigation-header">
            <h2 class="header-title">
                Chats
            </h2>

            <input-field
                class="input-field"
                placeholder="Search Messages"
                type="text"
            />
        </section>

        <section class="list-container">
            <loading v-if="isMessageListLoading"/>

            <empty-state
                text="No message available yet"
                v-else-if="isConversationEmpty"
            />

            <section class="message-list" v-else>
                <match-list/>
                
                <section
                    class="message-item"
                    :class="{ 'active' : activeMessageId === conversation._id }"
                    :key="key"
                    v-for="(conversation, key) in conversationList"
                    @click="viewMessage(conversation, conversation._id)"
                >
                    <section class="img-container">
                        <img
                            class="item-img"
                            :src="setUserPicture(conversation)"
                            alt="user-message-image"
                        >
                    </section>

                    <section class="item-message">
                        <h4 class="message-name">
                            {{ setUserName(conversation) }}
                        </h4>

                        <section class="message-details">
                            <h4 class="detail-message">
                                {{ `${conversation.lastMessage.senderName}: ${conversation.lastMessage.message}` }}
                            </h4>

                            <section class="message-time">
                                {{ setMessageDate(conversation.updatedAt) }}
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import InputField from '@/components/global/InputField'
import { mapFields } from 'vuex-map-fields'
import moment from 'moment'

export default {
    data() {
        return {
            activeMessage: null
        }
    },

    computed: {
        ...mapFields('message', {
            conversationList: 'conversationList',
            conversationListLoading: 'conversationListLoading',
            conversationListPagination: 'conversationListPagination',

            userInfoLoading: 'userInfoLoading',

            activeMessageId: 'activeMessageId',

            messageView: 'messageView',

            messageList: 'messageList',
            messageListPage: 'messageListPagination.page',
            messageListHasNextPage: 'messageListPagination.hasNextPage'
        }),

        ...mapFields('match', [
            'matchList',
            'viewDetailsObject'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        isMessageListLoading () {
            return !this.conversationList.length && this.conversationListLoading
        },

        isConversationEmpty () {
            return !this.conversationList.length && !this.conversationListLoading
        }
    },

    methods: {
        async viewMessage ({ userOneId, userTwoId }, id) {
            if (this.userInfoLoading || this.activeMessageId === id) return

            const currentUserId = this.user._id

            /* Set which id is not yours in the conversation object */
            const userId = userOneId === currentUserId
                                                ? userTwoId
                                                : userOneId
            
            await this.$store.commit('message/resetUserMessageList')

            await this.getUserInfo(userId)

            this.activeMessageId = id

            this.viewDetailsObject = this.messageView

            if (this.$route.name === 'message-view') return

            this.$router.push('/messages/view')
        },

        async getUserInfo (userId) {
            await this.$store.dispatch('message/getUserInfo', userId)
        },

        /* Template Functions */
        setUserPicture (conversation) {
            const currentUser = conversation.userOneId !== this.user._id 
                                    ? 'userOne'
                                    : 'userTwo'

            return conversation[`${currentUser}Picture`] || require('@/assets/img/avatar-default.png')
        },

        setUserName (conversation) {
            const currentUser = conversation.userOneId === this.user._id 
                                    ? 'userTwo'
                                    : 'userOne'

            return conversation[`${currentUser}Name`] || '-'
        },

        setMessageDate (date) {
            return date ? moment(new Date(date)).format('MMM DD') : '-'
        }
    },

    components: {
        InputField,
        MatchList: () => import('@/components/messages/MatchList'),
        EmptyState: () => import('@/components/global/EmptyState'),
        Loading: () => import('@/components/global/Loading')
    }
}
</script>

<style lang="scss" scoped>
.message-navigation {
    width: 35%;
    height: 100%;
    min-width: 370px;
    max-width: 430px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 5px #d1d1d1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #ddd;

    @include mobile {
        min-width: unset;
        max-width: unset;
        width: 100%;
    }

    .navigation-header {
        padding: 15px 20px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        z-index: 2;

        @include mobile {
            padding: 10px 10px;
        }

        .header-title {
            width: 100%;
            margin-bottom: 10px;

            @include mobile {
                font-size: 16px;
            }
        }

        .input-field {
            /deep/ .input-box {
                border-radius: 15px;
                padding: 8px 15px;
                background-color: #fcfcfc;
            }
        } 
    }

    .list-container {
        position: relative;
        flex: 1 1 auto;
        overflow: auto;

        /deep/.loading-container {
            border-radius: 0;
            background-color: #f9f9f9;

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

        /deep/.empty-state {
            border-radius: 0;
            background-color: #f9f9f9;

            .empty-icon {
                width: 90px;
            }

            .state-label {
                font-size: 18px;
                color: #949494;
            }
        }

        .message-list {
            display: flex;
            flex-direction: column;

            .message-item {
                display: flex;
                padding: 15px 20px;
                transition: 0.2s;
                cursor: pointer;

                @include mobile {
                    padding: 10px 15px;
                }

                &.active {
                    border-radius: 15px;
                    background: rgba(0, 0, 0, .05);
                }

                .img-container {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 12px;
                    position: relative;
                    flex-shrink: 0;

                    .item-img {
                        width: 100%;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translateY(-50%) translateX(-50%);
                    }      
                }

                .item-message {
                    flex: 1 1 auto;

                    .message-name {
                        margin-bottom: 5px;
                    }

                    .message-details {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;

                        .detail-message {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 240px;
                            flex-shrink: 1;

                            @include mobile {
                                width: 180px;
                                min-width: unset;
                            }
                        }

                        .message-time {
                            color: #999999;
                            font-size: 13px;
                            line-height: 23px;
                            flex-shrink: 0;
                            padding-left: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>