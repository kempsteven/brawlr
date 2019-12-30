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
            />

            <section class="see-all-container">
                <span class="see-all">
                    See More
                </span>
            </section>

            <section class="match-list scroll-visible">
                <router-link
                    class="list-item"
                    :key="key"
                    v-for="(item, key) in 15"
                    :to="`/messages/view?id=${key}`"
                    @click.native="viewMessage(item, key)"
                >
                    <section class="img-container">
                        <img
                            class="item-img"
                            src="@/assets/img/sample-picture.jpg"
                            alt="user-message-image"
                        >
                    </section>

                    <span class="item-name">
                        Manny
                    </span>
                </router-link>
            </section>
        </section>
        
        <section class="message-list">
            <router-link
                class="message-item"
                :class="{ 'active' : activeMessage === key }"
                :key="key"
                v-for="(item, key) in 15"
                :to="`/messages/view?id=${key}`"
                @click.native="viewMessage(item, key)"
            >
                <section class="img-container">
                    <img
                        class="item-img"
                        src="@/assets/img/sample-picture.jpg"
                        alt="user-message-image"
                    >
                </section>

                <section class="item-message">
                    <h4 class="message-name">
                        Manny Pacquiaouaoai
                    </h4>

                    <section class="message-details">
                        <h4 class="detail-message">
                            Good day, Suntukan Tayu, amet consectetur adipisicing
                        </h4>

                        <section class="message-time">
                            Dec 7
                        </section>
                    </section>
                </section>
            </router-link>
        </section>
    </section>
</template>

<script>
import InputField from '@/components/global/InputField'

export default {
    data() {
        return {
            activeMessage: null
        }
    },

    methods: {
        viewMessage (item, key) {
            this.activeMessage = key
        }
    },

    components: {
        InputField  
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

    @include mobile {
        min-width: unset;
        max-width: unset;
        width: 100%;
    }

    .navigation-header {
        padding: 15px 20px;
        box-shadow: 0 -5px 15px #d1d1d1;

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

            @include mobile {
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

    .message-list {
        display: flex;
        flex-direction: column;
        overflow: auto;

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
                flex: 1 1 auto;

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
                        width: 240px;
                        flex-shrink: 1;

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
                        padding-left: 12px;
                    }
                }
            }
        }
    }
}
</style>