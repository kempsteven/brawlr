<template>
    <div class="swipeable-cards">
        <section class="card-container">
            <vue2-interact-draggable
                class="card"
                v-for="(card, key) in cards"
                :key="cards.length - key"
                :interact-out-of-sight-x-coordinate="500"
                :interact-max-rotation="15"
                :interact-x-threshold="200"
                :interact-y-threshold="200"

                :interactBlockDragDown="true"
                @draggedRight="like()"
                @draggedLeft="ignore()"
                @draggedUp="ignore()"
            >
                <section class="detail-container">
                    <img
                        class="fighter-img"
                        src="@/assets/img/sample-picture.jpg"
                        alt="fighter-image"
                    >

                    <section class="detail-name">
                        {{ card.name }}
                    </section>
                </section>
            </vue2-interact-draggable>
        </section>
    </div>
</template>

<script>
import { Vue2InteractDraggable } from 'vue2-interact'

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
			]
		}
    },

    methods: {
        like () {
            setTimeout(() => this.cards.shift(), 300)
        },

        ignore () {
            setTimeout(() => this.cards.shift(), 300)
        },
    },
    
    components: { Vue2InteractDraggable }
}
</script>

<style lang="scss" scoped>
.swipeable-cards {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .card-container {
        width: 600px;
        height: 800px;
        position: relative;

        @include mobile {
            width: 70%;
            height: 70%;
        }

        .card {
            position: absolute;
            border-radius: 15px;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: hidden;

            &:nth-child(1) {
                z-index: 10;
                background-color: #555;
            }

            &:nth-child(2) {
                z-index: 9;
                background-color: $red;
            }

            &:nth-child(3) {
                z-index: 8;
                background-color: blue;
            }

            .detail-container {
                position: relative;
                width: 100%;
                height: 100%;

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
}
</style>