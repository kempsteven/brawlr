<template>
    <section class="match-modal">
        <section class="close-container">
            <div class="close" @click="closeModal()"/>
        </section>

        <section class="icon-container">
            <img
                class="has-matched-icon"
                :src="require('@/assets/img/icon/has-matched-icon.png')"
                alt="Has Matched Icon"
            >
        </section>

        <h1 class="match-label">
            It's a Match!
        </h1>

        <section class="matched-container">
            <section class="user-container">
                <section class="img-container">
                    <img
                        class="user-image"
                        :src="currentUserImage"
                        alt="User Image"
                    >
                </section>

                <h3 class="user-name">
                    {{ matchedObject.currentUserName | capitalize }}
                </h3>
            </section>

            <section class="user-container">
                <section class="img-container">
                    <img
                        class="user-image"
                        :src="currentUserImage"
                        alt="User Image"
                    >
                </section>

                <h3 class="user-name">
                    {{ matchedObject.matchedUserName | capitalize }}
                </h3>
            </section>
        </section>

        <section class="control-container">
            <button class="_primary">
                Message User
            </button>
        </section>
    </section>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
        ...mapFields('match', [
			'matchedObject'
        ]),
        
        currentUserImage () {
            return this.matchedObject.currentUserPicture || require('@/assets/img/avatar-default.png')
        },

        matchedUserImage () {
            return this.matchedObject.matchedUserPicture || require('@/assets/img/avatar-default.png')
        }
    },

    methods: {
        closeModal () {
            this.$store.dispatch('modal/closeModal', {})
        }
    },
}
</script>

<style lang="scss" scoped>
.match-modal {
    width: 595px;
    height: 638px;
    padding: 25px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;

    background-position: -500px center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('~@/assets/img/profile-cover.jpeg');
    background-color: #2c3e50;
    opacity: 0;

    @include fadeinfromtop(0.2s, 0.1s);

    @include mobile {
        width: 100%;
        height: 100%;
    }
    
    .close {
        height: 28px;
        width: 28px;
        position: absolute;
        right: 9px;
        top: 10px;
        cursor: pointer;

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

    .icon-container {
        margin: 15px 0;
        opacity: 0;

        @include fadeinfromtop(0.4s, 0.1s);

        .has-matched-icon {
            width: 150px;
            height: 150px;

            @include mobile {
                width: 120px;
                height: 120px;
            }
        }
    }

    .match-label {
        margin-bottom: 35px;
        font-size: 28px;
        color: #fff;
        opacity: 0;
        text-align: center;

        @include fadeinfromtop(0.4s, 0.1s);

        @include mobile {
            font-size: 22px;
        }
    }

    .matched-container {
        width: 100%;
        margin-bottom: 60px;
        opacity: 0;

        @include flex-box(center, space-between, '');
        @include fadeinfromtop(0.4s, 0.5s);

        @include mobile {
            flex: 1 1 auto;
        }

        .user-container {
            @include flex-box('', '', column);

            &:first-child {
                margin-right: 75px;
            }

            @include mobile {
                &:first-child {
                    margin-right: 40px;
                }
            }

            .img-container {
                width: 200px;
                height: 200px;
                background: #fff;
                border-radius: 50%;
                overflow: hidden;

                @include mobile {
                    width: 110px;
                    height: 110px;
                }

                .user-image {
                    width: 100%;
                    min-height: 100%;
                }
            }

            .user-name {
                text-align: center;
                margin-top: 15px;
                color: #fff;
            }
        }
    }

    .control-container {
        width: 100%;
        opacity: 0;

        @include fadeinfromtop(0.4s, 0.9s);
        
        @include flex-box(center, '', '');

        ._primary {
            width: 90%;
            border-radius: 25px;
            font-size: 18px;

            @include mobile {
                width: 100%;
            }
        }
    }
}
</style>