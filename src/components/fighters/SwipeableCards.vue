<template>
    <div class="swipeable-cards">
        <transition name="_transition-anim">
            <loading key="0" v-if="isFightersLoading"/>
            
            <section class="empty-state" key="1" v-else-if="isFightersNotAvailable">
                <img 
                    class="empty-icon" 
                    :src="require('@/assets/img/icon/empty-icon.png')" 
                    alt="Brawlr Empty Icon"
                >

                <h2 class="state-label">
                    No fighters available yet.
                </h2>
            </section>

            <section class="card-wrapper" key="2" v-else>
                <vue2-interact-draggable
                    class="card"
                    :class="{ 'disabled' : key !== 0 }"
                    v-for="(card, key) in userList"
                    :key="userList.length - key"
                    :style="`z-index: ${userList.length - key}`"

                    :interact-out-of-sight-x-coordinate="500"
                    :interact-max-rotation="15"
                    :interact-x-threshold="100"
                    :interact-y-threshold="200"

                    :interactBlockDragDown="true"

                    :interact-event-bus-events="isCurrentCard(key)"

                    @draggedRight="emitAndNext(card, 'fight')"
                    @draggedLeft="emitAndNext(card, 'back-out')"
                    @draggedUp="emitAndNext(card, 'brawlr')"
                >
                    <section class="detail-container" @click="viewDetails(card)">
                        <img
                            class="fighter-img"
                            :src="getImage(card.profilePictures)"
                            alt="fighter-image"
                            v-if="card.profilePictures"
                        >

                        <section class="detail-name">
                            {{ `${card.firstName} | ${card.age} | ${card.gender.value}` | capitalize }}
                        </section>
                    </section>
                </vue2-interact-draggable>
            </section>
        </transition>

        <section class="control-container">
			<button class="back-out" @click="backOutButton()"/>

			<button class="brawl" @click="brawlButton()"/>

			<button class="fight" @click="fightButton()"/>
		</section>
    </div >
</template>

<script>
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
import { mapFields } from 'vuex-map-fields'

export default {
    data () {
		return {
            interactEventBus: {
                draggedRight: 'fight',
                draggedLeft: 'back-out',
                draggedUp: 'brawl'
            }
		}
    },

    created () {
        if (!this.online) return

        this.getUserList()
    },

    computed: {
		...mapFields('match', [
            'userList',
            'userListLoading',
            'userListPagination.page',
            'userListPagination.hasNextPage',

            'viewDetailsObject',
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),

        isFightersLoading () {
            return this.userList && !this.userList.length && this.userListLoading
        },
        
        isFightersNotAvailable () {
            return this.userList && !this.userList.length && !this.userListLoading
        }
	},

    methods: {
        /* Created Lifecycle Methods */
        async getUserList () {
			await this.$store.dispatch('match/getUserList')
        },

        /* Get User List Next Page Handler */
        async getUserListNextPage () {
            if (!this.hasNextPage || this.userList.length > 0 || this.userListLoading) return

            this.page++

            await this.getUserList()
        },
        
        /* View Details */
        viewDetails (userDetails) {
            this.$store.commit('modal/toggleModal', {
                modalName: 'view-details-modal',
            })

            this.viewDetailsObject = userDetails
        },

        /* Swipeable Event Methods */
        backOutButton () {
            if (this.isFightersNotAvailable) return

            InteractEventBus.$emit('back-out')
        },

        async brawlButton () {
            if (this.isFightersNotAvailable) return

            const user = this.userList[0]

            InteractEventBus.$emit('brawl', {user, swipeType: 'brawl'})
        },

        async fightButton () {
            if (this.isFightersNotAvailable) return

            const user = this.userList[0]

            InteractEventBus.$emit('fight', { user, swipeType: 'fight' })
        },

        async emitAndNext (user, swipeType) {
            setTimeout(async () => {
                const removedUser = this.userList.shift()

                await this.getUserListNextPage()

                if (swipeType === 'back-out' || !removedUser) return

                switch (swipeType) {
                    case 'brawlr':
                        this.challengeUser(removedUser, 1)
                        break;
                
                    case 'fight':
                        this.challengeUser(removedUser, 0)
                        break;
                }
            }, 300)
        },

        async challengeUser (user, challengeType) {
            const form = new FormData()

            form.append('challengedId', user._id)
            form.append('challengeType', challengeType)

            this.$store.dispatch('match/challengeUser', form)
        },

        isCurrentCard (position) {
            return position === 0
                    ? this.interactEventBus
                    : {}
        },

        /* Get Image */
        getImage(imageList) {
            if (!imageList.length) return require('@/assets/img/avatar-default.png')

            const userImage = imageList.find(image => image.image !== null)

            if (!userImage) return require('@/assets/img/avatar-default.png')

            return userImage.image.url
        }
    },
    
    components: {
        Vue2InteractDraggable,
        Loading: () => import('@/components/global/Loading')
    }
}
</script>

<style lang="scss" scoped>
.swipeable-cards {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;

    .empty-state {
        background-color: #d6d6d6;
        border-radius: 15px;
        width: 600px;
        height: 800px;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 30px;

        @include flex-box(center, center, column);

        @include mobile {
            width: 95%;
            height: 83%;
            top: 10px;
        }

        .empty-icon {
            flex-shrink: 0;
            width: 150px;
            margin-bottom: 35px;

            @include mobile {
                width: 80px;
            }
        }

        .state-label {
            color: #fff;

            @include mobile {
                font-size: 18px;
            }
        }
    }


    .card-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;

        .card {
            border-radius: 15px;
            width: 600px;
            height: 800px;
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            overflow: hidden;
            top: 30px;
            touch-action: none;
            background-color: #ddd;

            &.disabled {
                pointer-events: none;
            }

            @include mobile {
                width: 95%;
                height: 83%;
                top: 10px;
            }

            .detail-container {
                position: relative;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                background-color: #ddd;

                .fighter-img {
                    height: 100%;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    transition: 1s;
                }
                
                .detail-name {
                    position: absolute;
                    bottom: 0;
                    padding: 15px;
                    background: rgba(0,0,0,.5);
                    color: #fff;
                    width: 100%;
                    font-size: 24px;
                    pointer-events: all;
                    cursor: pointer;

                    @include mobile {
                        font-size: 15px;
                    }
                }
            }
        }
    }

    .control-container {
		position: absolute;
		right: 30px;
		display: flex;
		flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
		z-index: 99;
		top: 50%;
		transform: translateY(-50%);

        @include mobile {
            top: unset;
            flex-direction: row;
            justify-content: space-around;
            transform: unset;
            bottom: 12px;
            width: 100%;
            right: 0;
        }

		button {
            background-repeat: no-repeat;
            background-size: cover;
            min-width: unset;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid darken($red, 5%);
            box-shadow: 0 1px 5px #414141;
            opacity: 1;

			&:not(:last-child) {
				margin-bottom: 75px;
			}

            &.brawl {
                background-image: url('~@/assets/img/icon/brawl-icon.png');
            }

            &.fight {
                background-image: url('~@/assets/img/icon/fight-icon.png');
            }

            &.back-out {
                background-image: url('~@/assets/img/icon/back-out-icon.png');
            }

            @include mobile {
                width: 55px;
                height: 55px;

                &:not(:last-child) {
                    margin-bottom: 0;
                }
            }
		}
	}
}
</style>