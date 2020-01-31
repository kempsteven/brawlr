<template>
    <div class="messages">
        <section class="message-section">
            <message-list />

            <section class="view-container">
                <transition :name="transitionAnim">
                    <router-view class="message-view"/>
                </transition>

                <transition :name="transitionAnim">
                    <empty-state
                        text="No message selected"
                        v-if="isThereNoSelectedMessage"
                    />
                </transition>
            </section>
        </section>
    </div>
</template>

<script>
import MessageList from '@/components/messages/MessageList'
import isMobileMixins from '@/mixins/isMobileMixins'
import * as message from '@/store/message/'
import * as match from '@/store/match/'
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            routeNameWatcher: null
        }
    },

    beforeCreate () {
        if (!this.$store._modulesNamespaceMap['message/']) {
            this.$store.registerModule('message', message.default)
        }
        
        if (!this.$store._modulesNamespaceMap['match/']) {
            this.$store.registerModule('match', match.default)
		}
    },

    async created () {
        await this.getConversationList()

        this.setRouteNameWatcher()
        
        this.isMobileViewWidth()
    },

    destroyed () {
        this.removeWatcher()
    },

    computed: {
        ...mapFields('message', [
            'conversationList',
            'conversationListLoading',

            'activeMessageId',

            'messageView',

            'userInfo'
        ]),

        ...mapFields('match', [
            'viewDetailsObject'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        isThereNoSelectedMessage () {
            return !Object.keys(this.messageView).length && !this.isMobileViewPort && !this.conversationListLoading
        },

        isConversationEmpty () {
            return !this.conversationList.length && !this.conversationListLoading
        }
    },

    methods: {
        /* Created Lifecycle Methods */
        async getConversationList () {
            await this.$store.dispatch('message/getConversationList')
        },

        setRouteNameWatcher () {
            this.routeNameWatcher = this.$watch('$route.name', (val) => {
                if (val === 'messages') {
                    this.isMobileViewWidth()
                }
            }, { immediate: true })
        },

        isMobileViewWidth () {
            if (
                this.windowWidth > 768
                && this.$route.name !== 'message-view'
            ) {
                this.setMessageView()
            }
        },

        async setMessageView () {
            if (this.isConversationEmpty) return

            if (this.conversationList.length) {
                const currentUserId = this.user._id
                const { userOneId, userTwoId, _id } = this.conversationList[0]

                this.activeMessageId = _id

                /* Set which id is not yours in the conversation object */
                const userId = userOneId === currentUserId
                                                    ? userTwoId
                                                    : userOneId
            

                await this.getUserInfo(userId)

                this.messageView = this.userInfo

                this.viewDetailsObject = this.userInfo
            }
            

            if (this.$route.name !== 'message-view') this.$router.push('/messages/view')
        },

        async getUserInfo (userId) {
            await this.$store.dispatch('message/getUserInfo', userId)
        },

        /* Destroyed Methods */
        removeWatcher () {
            if (this.routeNameWatcher) this.routeNameWatcher()
        }
    },

    components: {
        MessageList,
        EmptyState: () => import('@/components/global/EmptyState')
    },

    mixins: [isMobileMixins]
}
</script>

<style lang="scss" scoped>
.messages {
    padding: 15px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;

    @include mobile {
        padding: 0;
    }

    .message-section {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        .view-container {
            background: #fff;
            box-shadow: 3px 1px 5px #d1d1d1;
            height: 94.5%;
            width: 100%;
            position: relative;

            @include mobile {
                position: unset;
                width: 0;
            }

            /deep/.empty-state {
                border-radius: 0;
                // background-color: #fafafa;
                background-color: #f9f9f9;

                .empty-icon {
                    width: 90px;
                }

                .state-label {
                    font-size: 18px;
                    color: #949494;
                }
            }

            .message-view {
                @include mobile {
                    position: fixed;
                    width: 100vw;
                    height: 100vh;
                    z-index: 99;
                    top: 0;
                    left: 0;
                }
            }
        }
    }
}
</style>