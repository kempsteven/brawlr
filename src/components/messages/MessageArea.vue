<template>
    <div class="message-area">
        <ul class="message-list" ref="messageList">
            <li
                class="list-item"
                :class="{ 'own-message' : isUserOwnMessage(message) }"
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

        <form class="message-input-container" @submit.prevent="sendMessage()">
            <button class="gif-btn" type="button"/>
            
            <section class="input-wrapper">
                <input-field
                    class="input-field"
                    placeholder="Type a message..."
                    v-model="message"
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
import * as user from '@/store/user/'
import io from 'socket.io-client'
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            message: '',

            socket: io.connect('https://brawlr-backend.herokuapp.com')
        }
    },

    beforeCreate () {
        if (!this.$store._modulesNamespaceMap['user/']) {
            this.$store.registerModule('user', user.default)
		}
    },

    created () {
        this.getUser()
    },

    mounted () {
        this.setSocketListeners()
    },

    destroyed () {
        this.removeSocketConnection()
    },

    computed: {
        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('message', [
            'messageList'
        ]),

        ...mapFields('connection-status', [
            'online'
        ])
    },

    methods: {
        /* Created Lifecycle Methods */
        getUser () {
            if (!this.online) return

            this.$store.dispatch('user/getUser')
        },

        setSocketListeners () {
			this.socket.on("new_message", ({ data }) => {
				this.messageList.push({
                    name: data.name,
                    userId: data.userId,
                    userImage: data.userImage,
                    message: data.message
                })

				setTimeout(() => {
					this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
				}, 0)
			})
		},

		sendMessage () {
            if(!this.message) return

            const findUserImage = this.user.profilePictures.find(item => item.image !== null)
            const userImage = findUserImage.image.url || require('@/assets/img/sample-picture.jpg')

			this.socket.emit('new_message', {
                name: `${this.user.firstName} ${this.user.lastName}`,
                userId: this.user._id,
                userImage: userImage,
				message: this.message
			})

			this.message = ''

			setTimeout(() => {
				this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
			}, 0)
        },

        /* Tempalte Methods */
        isUserOwnMessage (message) {
            if (!this.user) return false

            return message.userId === this.user._id
        },
        
        /* Destroyed Lifecycle Methods */
        removeSocketConnection () {
            this.socket.disconnect()
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
            padding: 5px 15px;
            display: flex;
            align-items: flex-end;

            &.own-message {
                justify-content: flex-end;
                padding: 2px 15px;


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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 70%;
                    min-width: 150px;

                    @include mobile {
                        min-width: 105px;
                    }
                }

                .message-text {
                    font-size: 13px;
                    background-color: #f1f0f0;
                    border-radius: 20px;
                    padding: 10px 18px;
                    display: inline-block;
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