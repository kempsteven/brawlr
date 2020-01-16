<template>
    <div class="swipeable-cards">
        <transition-group name="_transition-anim">
            <vue2-interact-draggable
                class="card"
                :class="{ 'disabled' : key !== 0 }"
                v-for="(card, key) in userList"
                :key="userList.length - key"
                :id="key"
                :style="`z-index: ${cards.length - key}`"

                :interact-out-of-sight-x-coordinate="500"
                :interact-max-rotation="15"
                :interact-x-threshold="100"
                :interact-y-threshold="200"

                :interactBlockDragDown="true"

                :interact-event-bus-events="isCurrentCard(key)"

                @draggedRight="emitAndNext($event)"
                @draggedLeft="emitAndNext($event)"
                @draggedUp="emitAndNext($event)"
            >
                <section class="detail-container">
                    <img
                        class="fighter-img"
                        :src="card.profilePictures[0].image.url"
                        alt="fighter-image"
                        v-if="card.profilePictures"
                    >

                    <section class="detail-name">
                        {{ `${card.firstName} | ${card.age} | ${card.gender.value}` | capitalize }}
                    </section>
                </section>
            </vue2-interact-draggable>
        </transition-group>

        <section class="control-container">
			<button class="back-out" @click="backButton()"/>

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
			cards: [
				{ src: 'karina.jpg', name: 'Karina', age: 7 },
            ],

            interactEventBus: {
                draggedRight: 'fight',
                draggedLeft: 'back-out',
                draggedUp: 'brawl'
            }
		}
    },

    created () {
        this.getUserList()
    },

    mounted () {
        // const watcher = this.$watch('activeCardPosition', (val) => {
		// 	console.log(val)
		// }, { deep: true })
    },

    computed: {
		...mapFields('match', [
			'userList'
		])
	},

    methods: {
        /* Created Lifecycle Methods */
        getUserList () {
			this.$store.dispatch('match/getUserList')
		},

        backButton () {
            InteractEventBus.$emit('back-out')
            // this.emitAndNext()
        },

        brawlButton () {
            InteractEventBus.$emit('brawl')
            // this.emitAndNext()
        },

        fightButton () {
            InteractEventBus.$emit('fight')
            // this.emitAndNext()
        },

        emitAndNext () {
            // InteractEventBus.$emit('left')
            setTimeout(() => this.userList.shift(), 300)
        },

        isCurrentCard (position) {
            return position === 0
                    ? this.interactEventBus
                    : {}
        }
    },
    
    components: {
        Vue2InteractDraggable
    }
}
</script>

<style lang="scss" scoped>
.swipeable-cards {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;

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

                @include mobile {
                    font-size: 15px;
                }
            }
        }
    }

    .control-container {
		position: absolute;
		right: 15px;
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