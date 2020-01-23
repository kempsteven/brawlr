<template>
    <section class="match-container">
        <section class="see-all-container" v-if="parsedMatchList.length">
            <span class="see-all" @click="$router.push('/profile/matches')">
                See More
            </span>
        </section>

        <section class="match-list scroll-visible" v-if="parsedMatchList.length">
            <section
                class="list-item"
                :key="key"
                v-for="(match, key) in parsedMatchList"
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
        </section>
    </section>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    created () {
        this.getMatchList()
    },

    destroyed () {
        this.resetMessageView()
    },

    computed: {
        ...mapFields('match', [
			'matchList',
            'matchListLoading',
            'matchListPagination.page',
            'matchListPagination.hasNextPage',

            'viewDetailsObject',
        ]),

        ...mapFields('message', [
            'messageView',

            'conversationList'
        ]),

        parsedMatchList () {
            return this.matchList.reduce((result, item) => {
                if (!this.conversationList.find(x => x.userOneId === item._id || x.userTwoId === item._id)) {
                    result.push(item)
                }

                return result
            }, [])
        }
    },

    methods: {
        /* Created Lifecycle Methods */
        getMatchList () {
            this.$store.dispatch('match/getMatchList')
        },

        /* View Message */
        viewMessage (userInfo) {
            this.messageView = userInfo
            
            this.viewDetailsObject = userInfo

            if (this.$route.name === 'message-view') return

            this.$router.push('/messages/view')
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
        }
    },
}
</script>

<style lang="scss" scoped>
.match-container {
    width: 100%;

    .see-all-container {
        margin-top: 15px;
        padding-top: 5px;
        border-top: 1px solid #ddd;
        margin-bottom: 5px;

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
    }
}
</style>