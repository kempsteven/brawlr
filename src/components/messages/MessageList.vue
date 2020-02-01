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
                v-model="conversationListKeyword"
                @input="searchConversationList()"
            />
        </section>

        <section class="list-container" ref="conversationList" @scroll="getConversationNextPage()">
            <match-list/>
            
            <loading v-if="isMessageListLoading"/>

            <empty-state
                text="No message available yet"
                v-else-if="isConversationEmpty"
            />

            <section class="message-list" v-else>
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

                <transition name="_transition-anim">
                    <loading v-if="isMessageListGettingNextPage"/>
                </transition>
            </section>
        </section>
    </section>
</template>

<script>
import InputField from '@/components/global/InputField'
import { mapFields } from 'vuex-map-fields'
import moment from 'moment'

export default {
    created () {
        if (!this.online) return

        this.setSocketListeners()
    },

    beforeDestroy () {
        this.clearConversationList()
        this.clearMatchList()

        if (!this.online) return
        
        this.clearSocketListeners()
    },

    computed: {
        ...mapFields('message', {
            conversationList: 'conversationList',
            conversationListKeyword: 'conversationListKeyword',
            conversationListLoading: 'conversationListLoading',
            conversationListPage: 'conversationListPagination.page',
            conversationListHasNextPage: 'conversationListPagination.hasNextPage',

            userInfoLoading: 'userInfoLoading',

            activeMessageId: 'activeMessageId',

            messageView: 'messageView',

            messageList: 'messageList',
            messageListPage: 'messageListPagination.page',
            messageListHasNextPage: 'messageListPagination.hasNextPage',

            matchList: 'matchList',

            userInfo: 'userInfo'
        }),

        ...mapFields('match', [
            'viewDetailsObject'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('socket', [
            'socket'
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),

        isMessageListGettingNextPage () {
            return this.conversationList.length && this.conversationListLoading
        },

        isMessageListLoading () {
            return !this.conversationList.length && this.conversationListLoading
        },

        isConversationEmpty () {
            return !this.conversationList.length && !this.conversationListLoading
        }
    },

    methods: {
        /* Created Lifecycle Methods */
        setSocketListeners () {
            this.socket.on(`${this.user._id}_update_conversation`, async ({ updatedConversation, isNewConversation }) => {
                const conversationIndexToBeUpdated = this.conversationList
                                                        .findIndex(x => x._id === updatedConversation._id)

                const doesConversationExist = conversationIndexToBeUpdated > - 1

                if (doesConversationExist) {
                    this.conversationList.splice(conversationIndexToBeUpdated, 1)
                }

                this.conversationList.unshift(updatedConversation)

                if (isNewConversation) {
                    await this.resetMatchList()
                    this.setActiveMessageId(updatedConversation)
                }
            })
        },

        /* Update Conversation Socket Listener Methods */
        async resetMatchList () {
            await this.$store.commit('message/resetUserMatchListPagination')
            await this.$store.dispatch('message/getMatchList', true)
        },

        setActiveMessageId ({ _id, userOneId, userTwoId }) {
            const currentUserId = this.user._id

            /* Set which id is not yours in the conversation object */
            const userId = userOneId === currentUserId
                                                ? userTwoId
                                                : userOneId
            
            const isOpenenedMessageViewUpdated = userId === this.messageView._id
            
            if (isOpenenedMessageViewUpdated) this.activeMessageId = _id
        },

        /* Get Conversation List Next Page */
        getConversationNextPage () {
            const { scrollTop, scrollHeight, clientHeight } = this.$refs.conversationList
            const isScrolledToBottom = scrollTop === scrollHeight - clientHeight

            if (
                isScrolledToBottom
                && this.conversationListHasNextPage
                && !this.conversationListLoading
            ) {
                this.conversationListPage++
                
                this.$store.dispatch('message/getConversationList')
            }
        },

        /* Search Conversation List */
        searchConversationList () {
            clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
                this.conversationList = []
                this.conversationListLoading = false
                this.conversationListPage = 1
                this.conversationListHasNextPage = false

                this.$store.dispatch('message/getConversationList')
			}, 500)
        },

        /* View Message Methods */
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

            this.messageView = this.userInfo

            this.viewDetailsObject = this.userInfo

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
            if (!date) return '-'

            const messageDateSent = moment(new Date(date), moment.ISO_8601).format('MM-DD-YYYY')
            const dateToday = moment(new Date(), moment.ISO_8601).format('MM-DD-YYYY')
            const isMessageNotToday = moment(new Date(dateToday), moment.ISO_8601).isBefore(new Date(messageDateSent))
            // const isMessageNotToday = false

            const dateFormat = isMessageNotToday
                                ? moment(new Date(date), moment.ISO_8601).format('MMM DD')
                                : moment(new Date(date), moment.ISO_8601).format('HH:mm')


            return dateFormat
        },

        /* Before Destroy Lifecycle Methods */
        clearConversationList () {
            this.$store.commit('message/resetConversationList')
        },

        clearMatchList () {
            this.$store.commit('message/resetUserMatchList')
        },

        clearSocketListeners () {
            if (this.user._id) {
				this.socket.removeListener(`${this.user._id}_update_conversation`)
			}
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
                    width: calc(100% - 50px);
                    overflow: hidden;

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
                            width: calc(100% - 52px);

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
                            margin-left: 12px;
                            width: 40px;
                            text-align: right;
                        }
                    }
                }
            }

            /deep/.loading-container {
                position: initial;
                min-height: unset;
                padding: 25px 0 25px 0;
                height: 25px;
                background: #fff;

                .lds-dual-ring {
                    width: 30px;
                    height: 30px;

                    &:after {
                        width: 20px;
                        height: 20px;
                        border: 4px solid #949494;
                        border-color: #949494 transparent #949494 transparent;
                    }
                }
            }
        }
    }
}
</style>