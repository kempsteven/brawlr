<template>
    <section class="match-container" v-if="matchList.length">
        <section class="see-all-container">
            <span class="see-all" @click="$router.push('/profile/matches')">
                See More
            </span>
        </section>

        <section class="match-list scroll-visible" ref="matchList" @scroll="getMatchListNextPage($event)">
            <section
                class="list-item"
                :key="key"
                v-for="(match, key) in matchList"
                @click="viewMessage(match)"
            >
                <section class="img-container">
                    <img
                        class="item-img"
                        :src="setUserImage(match.profilePictures)"
                        alt="user-message-image"
                    >
                </section>

                <span class="item-name">
                    {{ match.firstName }}
                </span>
            </section>

            <loading width="69px" v-if="isMatchListLoading"/>
        </section>
    </section>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    created () {
        this.getMatchList()
        this.setSocketListeners()
    },

    // mounted () {
        
    // },

    destroyed () {
        this.resetMessageView()
        this.removeSocketListeners()
    },

    computed: {
        ...mapFields('match', [
            'viewDetailsObject',
        ]),

        ...mapFields('message', [
            'messageView',
            'activeMessageId',

            'conversationList',

            'matchList',
            'matchListLoading',
            'matchListPagination.page',
            'matchListPagination.hasNextPage',
        ]),

        ...mapFields('socket', [
            'socket'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        isMatchListLoading () {
            return this.matchList.length && this.matchListLoading
        }
    },

    methods: {
        /* Created Lifecycle Methods */
        getMatchList () {
            this.$store.dispatch('message/getMatchList')
        },

        setSocketListeners () {
            this.socket.on(`${this.user._id}_new_match`, ({ matchedUser }) => {
				this.matchList.unshift(matchedUser)
            })
            
            this.socket.on(`${this.user._id}_unmatch` , ({ conversationId, unMatchedUserId }) => {
                if (conversationId) this.$store.dispatch('message/removeConversationById', conversationId)

                this.$store.dispatch('message/removeMatchById', unMatchedUserId, { root: true })

                this.$store.commit('message/resetMessageView', null, { root: true })
                
                if (this.$route.name !== 'messages') this.$router.push('/messages')
            })
        },

        /* View Message */
        async viewMessage (userInfo) {
            this.activeMessageId = null

            this.messageView = userInfo
            
            this.viewDetailsObject = userInfo

            await this.$store.commit('message/resetUserMessageList')

            if (this.$route.name === 'message-view') return

            this.$router.push('/messages/view')
        },

        /* Get Match List Next Page */
        getMatchListNextPage () {
            const matchList = this.$refs.matchList
            const matchListScrollLeft = matchList.scrollLeft
            const matchListMaxScroll = matchList.scrollWidth - matchList.clientWidth
            const shouldGetNextPage = matchListMaxScroll === matchListScrollLeft

            if (!shouldGetNextPage || !this.hasNextPage || this.matchListLoading) return

            this.page++

            this.getMatchList()
        },

        /* Template Methods */
        setUserImage (pictures) {
            if (!pictures.length) return require('@/assets/img/avatar-default.png')

            const userPicture = pictures.find(x => x.image !== null)

            if (!userPicture) return require('@/assets/img/avatar-default.png')

            return userPicture.image.url
        },

        /* Destroyed Lifecycle Methods */
        resetMessageView () {
            this.messageView = {}
        },

        removeSocketListeners () {
            this.socket.removeListener(`${this.user._id}_new_match`)
            this.socket.removeListener(`${this.user._id}_unmatch`)
        }
    },

    components: {
        Loading: () => import('@/components/global/Loading'),
    },
}
</script>

<style lang="scss" scoped>
.match-container {
    width: 100%;
    background: #fff;

    .see-all-container {
        padding-top: 5px;
        margin-bottom: 10px;
        padding-right: 10px;

        @include flex-box(flex-end, '', '');

        .see-all {
            color: $blue;
            cursor: pointer;
        }
    }

    .match-list {
        display: flex;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        position: relative;
        padding-bottom: 5px;

        &::-webkit-scrollbar {  
            height: 5px;
        }

        @include mobile {
            padding-bottom: 0px;

            &::-webkit-scrollbar {  
                width: 0px;
                height: 0px;
            }
        }

        .list-item {
            flex-shrink: 0;
            cursor: pointer;

            @include flex-box ('', center, column);

            &:first-child {
                padding-left: 15px;
            }

            &:last-child {
                padding-right: 15px;
            }

            &:not(:last-child) {
                margin-right: 10px;
            }

            .img-container {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                flex-shrink: 0;

                @include mobile {
                    width: 40px;
                    height: 40px;
                }

                .item-img {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateY(-50%) translateX(-50%);
                }      
            }

            .item-name {
                max-width: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                @include mobile {
                    font-size: 13spx;
                }
            }
        }

        /deep/.loading-container {
            position: initial;
            min-height: unset;
            padding: 0;
            height: 69px;
            background: transparent;
            flex-shrink: 0;

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
</style>