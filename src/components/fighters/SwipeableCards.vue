<template>
    <div class="swipeable-cards">
        <vue2-interact-draggable
            class="card"
            :class="{ 'disabled' : key !== 0 }"
            v-for="(card, key) in cards"
            :key="cards.length - key"
            :id="key"
            :style="`z-index: ${cards.length - key}`"

            :interact-event-bus-events="interactEventBus"

            :interact-out-of-sight-x-coordinate="500"
            :interact-max-rotation="15"
            :interact-x-threshold="100"
            :interact-y-threshold="200"

            :interactBlockDragDown="true"

            @draggedRight="like($event)"
            @draggedLeft="ignore($event)"
            @draggedUp="ignore($event)"
        >
            <section class="detail-container">
                <img
                    class="fighter-img"
                    src="@/assets/img/test.jpg"
                    alt="fighter-image"
                >

                <section class="detail-name">
                    {{ card.name }}
                </section>

                <div>
                    {{ this }}
                </div>
            </section>
        </vue2-interact-draggable>
    </div >
</template>

<script>
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'

export default {
    data () {
		return {
			cards: [
				{ src: 'karina.jpg', name: 'Karina', age: 7 },
				{ src: 'alexander.jpg', name: 'Alexander', age: 5 },
				{ src: 'bona.jpg', name: 'Bona', age: 3 },
				{ src: 'ichi.jpg', name: 'Ichi', age: 7 },
				{ src: 'lloyd.jpg', name: 'Lloyd', age: 4 },
				{ src: 'luiza.jpg', name: 'Luiza', age: 9 },
				{ src: 'max.jpg', name: 'Max', age: 6 },
				{ src: 'mona.jpg', name: 'Mona', age: 3 },
				{ src: 'naru.jpg', name: 'Naru', age: 7 },
				{ src: 'ramdan.jpg', name: 'Ramdan', age: 8 },
				{ src: 'rikki-austin.jpg', name: 'Rikki Austin', age: 3 },
				{ src: 'tucker.jpg', name: 'Tucker', age: 9 },
				{ src: 'uriel.jpg', name: 'Uriel', age: 6 },
				{ src: 'zoe.jpg', name: 'Zoe', age: 2 },
            ],
            
            interactEventBus: {
                draggedRight: 'right',
                draggedLeft: 'left',
                draggedUp: 'up'
            },
		}
    },

    mounted () {
        const watcher = this.$watch('activeCardPosition', (val) => {
			console.log(val)
		}, { deep: true })
    },

    methods: {
        like (e) {
            // InteractEventBus.$emit('right')
            setTimeout(() => this.cards.shift(), 300)
        },

        ignore (e) {
            // InteractEventBus.$emit('left')
            setTimeout(() => this.cards.shift(), 300)
        },
    },
    
    components: {
        Vue2InteractDraggable: () => import('vue2-interact/src/components/Vue2InteractDraggable')
    }
}
</script>

<style lang="scss" scoped>
.swipeable-cards {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    overflow: hidden;
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

        &.disabled {
            pointer-events: none;
        }

        @include mobile {
            width: 95%;
            height: 83%;
            top: 15px;
        }

        .detail-container {
            position: relative;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;

            .fighter-img {
                height: 100%;
                margin-left: 50%;
                transform: translateX(-50%);
            }
            
            .detail-name {
                position: absolute;
                bottom: 0;
                padding: 15px;
                background: rgba(0,0,0,.5);
                color: #fff;
                width: 100%;
            }
        }
    }
}
</style>