<template>
    <div class="message-area">
        <ul class="message-list" ref="messageList">
            <li
                class="list-item"
                :class="{
                    'own-message' : isUserOwnMessage(message),
                    'is-first-message' : isFirstMessage(isUserOwnMessage(message), key),
                    'is-last-message' : isLastMessage(isUserOwnMessage(message), key),
                    'is-between-message' : isBetweenMessage(isUserOwnMessage(message), key),
                }"
                :key="key"
                v-for="(message, key) in messageList"
            >
                <section class="img-container" v-if="!isUserOwnMessage(message)">
                    <img
                        :src="otherUserImage"
                        class="user-img"
                        alt="user-message-image"
                    >
                </section>

                <section class="message-details">
                    <span class="message-name" v-if="!isUserOwnMessage(message)">
                        {{ otherUserName }}
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

            socket: io.connect(process.env.VUE_APP_API_URL)
        }
    },

    beforeCreate () {
        if (!this.$store._modulesNamespaceMap['user/']) {
            this.$store.registerModule('user', user.default)
		}
    },

    async created () {
        // await this.getUser()
        this.getMessageList()
    },

    mounted () {
        this.setSocketListeners()
    },

    destroyed () {
        this.removeSocketConnection()
        this.clearMessageList()
    },

    computed: {
        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('message', [
            'messageView',
            
            'messageList',
            'activeMessageId'
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),

        otherUserName () {
            return `${this.messageView.firstName} ${this.messageView.lastName}`
        },

        otherUserImage () {
            if (!this.messageView || this.messageView.profilePictures.every(x => x.image === null)) {
                return require('@/assets/img/avatar-default.png')
            }

            return this.messageView.profilePictures.find(x => x.image !== null).image.url
        }
    },

    methods: {
        /* Created Lifecycle Methods */
        async getMessageList () {
            if (!this.activeMessageId) return

            await this.$store.dispatch('message/getMessageList', this.activeMessageId)

            setTimeout(() => {
                this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
            }, 0)
        },

        setSocketListeners () {
			this.socket.on('new_message', ({ data }) => {
				this.messageList.push({ 
                    name: data.name,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    message: data.message
                })

				setTimeout(() => {
					this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
				}, 0)
			})
		},

		async sendMessage () {
            if(!this.message) return
            
            const form = new FormData()

            if (this.activeMessageId) {
                form.append('conversationId', this.activeMessageId)
            }

            form.append('receiverId', this.messageView._id)
            form.append('message', this.message)

            await this.$store.dispatch('message/sendMessage', form)

			this.socket.emit('new_message', {
                name: `${this.user.firstName} ${this.user.lastName}`,
                senderId: this.user._id,
                receiverId: this.messageView._id,
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

            return message.senderId === this.user._id
        },

        isFirstMessage (isOwnMessage, key) {
            const messageBefore = this.messageList[key - 1] || ''
            const currentMessage = this.messageList[key]
            const messageAfter = this.messageList[key + 1] || ''

            const senderPropertyIdName = isOwnMessage ? 'senderId' : 'receiverId'

            if (
                this.messageList.length > 1
                && messageAfter
                && currentMessage[senderPropertyIdName] !== messageBefore[senderPropertyIdName]
                && currentMessage[senderPropertyIdName] === messageAfter[senderPropertyIdName]
            ) {
                return true
            }

            return false
        },

        isLastMessage (isOwnMessage, key) {
            const messageBefore = this.messageList[key - 1] || ''
            const currentMessage = this.messageList[key]
            const messageAfter = this.messageList[key + 1] || ''

            const senderPropertyIdName = isOwnMessage ? 'senderId' : 'receiverId'

            if (
                this.messageList.length > 1
                && (!messageAfter
                || currentMessage[senderPropertyIdName] !== messageAfter[senderPropertyIdName])
                && currentMessage[senderPropertyIdName] === messageBefore[senderPropertyIdName]
            ) {
                return true
            }

            return false
        },

        isBetweenMessage (isOwnMessage, key) {
            const messageBefore = this.messageList[key - 1] || ''
            const currentMessage = this.messageList[key]
            const messageAfter = this.messageList[key + 1] || ''

            const senderPropertyIdName = isOwnMessage ? 'senderId' : 'receiverId'

            if (
                messageBefore
                && messageAfter
                && currentMessage[senderPropertyIdName] === messageAfter[senderPropertyIdName]
                && currentMessage[senderPropertyIdName] === messageBefore[senderPropertyIdName]
            ) {
                return true
            }

            return false
        },
        
        /* Destroyed Lifecycle Methods */
        removeSocketConnection () {
            this.socket.removeListener('new_message')
            this.socket.disconnect()
        },

        clearMessageList () {
            this.messageList = []
            this.activeMessageId = null
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
            padding: 0px 15px;
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
                        width: 100%;
                        word-break: break-word;
                        border-radius: 20px 20px 20px 20px;
                    }
                }

                &.is-first-message {
                    .message-text {
                        border-radius: 20px 20px 0px 20px;
                    }
                }

                &.is-last-message {
                    .message-text {
                        border-radius: 20px 0px 20px 20px;
                    }
                }

                &.is-between-message {
                    .message-text {
                        border-radius: 20px 0px 0px 20px;
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
                    border-radius: 20px 20px 20px 20px;
                    padding: 10px 18px;
                    display: inline-block;
                    word-break: break-word;
                }
            }

            &.is-first-message {
                .img-container {
                    opacity: 0;
                }

                .message-text {
                    border-radius: 20px 20px 20px 0px;
                }

                .message-name {
                    display: block;
                }
            }

            &.is-last-message {
                .img-container {
                    opacity: 1;
                }

                .message-text {
                    border-radius: 0px 20px 20px 20px;
                }

                .message-name {
                    display: none;
                }
            }

            &.is-between-message {
                .img-container {
                    opacity: 0;
                }

                .message-text {
                    border-radius: 0px 20px 20px 0px;
                }

                .message-name {
                    display: none;
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