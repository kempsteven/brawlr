<template>
    <section class="countdown-modal">
        <div class="bg-overlay" />
        
        <div class="close" @click="closeModal()"/>

        <h2 class="no-remaining-label">
            {{ noRemainingLabel }}
        </h2>

        <section class="timer-container">
            <h2 class="timer-label">
                {{ timerLabel }}
            </h2>

            <section class="timer">
                {{ countdown }}
            </section>
        </section>

        <button class="close-btn" @click="closeModal()">
            Close
        </button>
    </section>
</template>

<script>
import * as workerTimers from 'worker-timers'
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            now: null,
            dateNow: null
        }
    },

    mounted () {
		const current = new Date(this.currentDate)

		this.countDownWorker = workerTimers.setInterval(() => {
			const currentTime = new Date(current.setSeconds(current.getSeconds() + 1))
            const now = Math.floor(currentTime.getTime() / 1000)

			this.now = now
			this.dateNow = currentTime
		}, 1000)
    },

    computed: {
        dateInMilliseconds () {
			return Math.trunc(Date.parse(new Date(this.resetDate)) / 1000)
		},

		seconds () {
			return this.convertToTwoDigits((this.dateInMilliseconds - this.now) % 60)
		},

		minutes () {
			return this.convertToTwoDigits(Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60)
		},

		hours () {
			return this.convertToTwoDigits(Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24)
		},

		days () {
			return this.convertToTwoDigits(Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24))
        },
        
        countdown () {
            if (this.now === null) return `00 : 00 : 00`

            return `${this.hours} : ${this.minutes} : ${this.seconds}`
        },

        noRemainingLabel () {
            return this.challengeType
                    ? 'No brawls remaining'
                    : 'No fights remaining'
        },

        timerLabel () {
            return this.challengeType
                    ? 'Brawls will reset in'
                    : 'Fights will reset in'
        },

        ...mapFields('match', [
            'resetDate',
            'currentDate',
            'challengeType'
        ]),
    },
    
    methods: {
        convertToTwoDigits (number) {
            if (number < 0) {
                return '00'
            }
            
            if (number.toString().length <= 1) {
                return `0${number}`
            }

            return number
        },

        async closeModal () {
            await this.$store.commit('match/clearCountdownState')

            this.$store.dispatch('modal/closeModal', {})
        }
    },
}
</script>

<style lang="scss" scoped>
.countdown-modal {
    width: 450px;
    min-height: 638px;
    padding: 25px;
    position: relative;
    border-radius: 5px;
    user-select: none;
    background-position: -500px center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('~@/assets/img/profile-cover.jpeg');
    background-color: #2c3e50;
    opacity: 0;
    border: 1px solid #8a8a8a;

    @include flex-box(center, '', '');

    @include fadeinfromtop(0.2s, 0.1s);

    @include mobile {
        width: 100%;
        height: 100%;
        min-height: unset;
        border-radius: 0;
        border: 0;
    }

    .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: rgba(0, 0, 0, 0.4);
    }
    
    .close {
        height: 28px;
        width: 28px;
        position: absolute;
        right: 9px;
        top: 10px;
        cursor: pointer;
        z-index: 2;

        &:after {
            pointer-events: none;
            position: absolute;
            top: -6px;
            right: 1.5px;
            font-size: 28px;
            content: '\2716';
            color: #fff;
        }
    }

    .no-remaining-label {
        z-index: 2;
        position: absolute;
        color: #fff;
        top: 10%;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
    }

    .timer-container {
        z-index: 2;
        margin-top: 35%;

        @include mobile {
            margin-top: 60%;
        }

        .timer-label, .timer {
            color: #fff;
            width: 100%;
            text-align: center;
        }

        .timer-label {
            margin-bottom: 10px;
        }

        .timer {
            font-size: 45px;
        }
    }

    .close-btn {
        z-index: 2;
        position: absolute;
        bottom: 25px;
        width: 86%;
        padding: 13px 0;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #fff;
        background: transparent;
        border-radius: 15px;
        color: #fff;
        font-size: 16px;
        transition: 0.3s;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }
}
</style>