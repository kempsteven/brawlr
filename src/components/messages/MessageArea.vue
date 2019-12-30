<template>
    <div class="message-area">
        <ul class="message-list">
            <li
                class="list-item"
                :class="{ 'own-message' : message.userId === 1 }"
                :key="key"
                v-for="(message, key) in messageList"
            >
                <section class="img-container">
                    <img
                        :src="message.userImage"
                        class="user-img"
                        alt="user-message-image"
                    >
                </section>

                <section class="message-details">
                    <span class="message-name">
                        {{ message.name }}
                    </span>
                    
                    <section class="message-text">
                        {{ message.message }}
                    </section>
                </section>
            </li>
        </ul>

        <form class="message-input-container" @input.prevent>
            <button class="gif-btn" type="button"/>
            
            <section class="input-wrapper">
                <input-field
                    class="input-field"
                    placeholder="Type a message..."
                    type="text"
                />

                <button class="emoji-btn" type="button"/>
            </section>

            <button class="send-btn"/>
        </form>
    </div>
</template>

<script>
import InputField from '@/components/global/InputField'

export default {
    data() {
        return {
            messageList: [
                {
                    userId: 2,
                    name: 'Manny Pacquiaouaoai',
                    message: `Good day,
                        suntukan tayu, Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Facilis itaque
                    `,
                    userImage: require('@/assets/img/sample-picture.jpg')
                },

                {
                    userId: 1,
                    name: 'Baki The Grappler',
                    message: `
                        Good day manny, tara suntukan
                    `,
                    userImage: require('@/assets/img/sample-picture.jpg')
                },
            ]
        }
    },

    components: {
        InputField  
    }
}
</script>

<style lang="scss" scoped>
.message-area {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-width: 330px;

    @include mobile {
        min-width: unset;
        width: 100%;
    }
    
    .message-list {
        padding: 15px 0;
        flex: 1 1 auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        
        .list-item {
            width: 100%;
            padding: 8px 15px;
            display: flex;
            align-items: flex-end;

            @include mobile {
                padding: 8px 10px;
            }

            &.own-message {
                justify-content: flex-end;

                .img-container {
                    display: none;
                }

                .message-details {
                    justify-self: flex-end;

                    .message-name {
                        display: none;
                    }

                    .message-text {
                        background: rgb(218,85,85);
                        background: linear-gradient(0deg, rgba(201,73,73,1) 0%, rgba(218,85,85,1) 70%);
                        color: #fff;
                    }
                }
            }

            .img-container {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                position: relative;
                flex-shrink: 0;

                @include mobile {
                    width: 40px;
                    height: 40px;
                }

                .user-img {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateY(-50%) translateX(-50%);
                }   
            }

            .message-details {
                max-width: 70%;

                .message-name {
                    font-size: 11px;
                    color: #90949c;
                    margin-bottom: 5px;
                    display: block;
                }

                .message-text {
                    font-size: 13px;
                    background-color: #f1f0f0;
                    border-radius: 20px;
                    padding: 10px 15px;
                }
            }
        }
    }

    .message-input-container {
        padding: 15px;
        display: flex;

        button {
            width: 35px;
            height: 35px;
            border: 0;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .gif-btn {
            background-image: url('~@/assets/img/icon/gif-icon.png');
            margin-right: 10px;
        }

        .input-wrapper {
            flex: 1 1 auto;
            display: flex;
            background-color: rgba(0, 0, 0, .05);
            border-radius: 25px;
            padding: 5px;
            
            .input-field {
                flex: 1 1 auto;
                border: none;
                background: transparent;
                height: 100%;

                /deep/ input {
                    border: none;
                    background: transparent;
                    height: 100%;
                    padding: 0 10px;
                }
            }

            .emoji-btn {
                width: 30px;
                height: 30px;
                background-image: url('~@/assets/img/icon/emoji-icon.png');
            }
        }

        .send-btn {
            background-image: url('~@/assets/img/icon/send-icon.png');
            margin-left: 10px;
        }
    }
}
</style>