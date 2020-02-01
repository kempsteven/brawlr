<template>
    <div class="message-area">
        <ul class="message-list" ref="messageList" @scroll="getMessageListNextPage()">
            <loading v-if="isMessageListLoading"/>

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
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            message: '',
        }
    },

    beforeCreate () {
        if (!this.$store._modulesNamespaceMap['user/']) {
            this.$store.registerModule('user', user.default)
		}
    },

    async created () {
        if (!this.online) return

        this.getMessageList()
    },

    mounted () {
        if (!this.online) return

        this.setSocketListeners()
    },

    beforeDestroy () {
        this.clearMessageList()

        if (!this.online) return

        this.removeSocketConnection()
    },

    computed: {
        ...mapFields('socket', [
            'socket'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('message', [
            'hasSendMessage',
            'hasSentFirstMessage',

            'messageView',
            
            'activeMessageId',

            'messageList',
            'messageListLoading',
            'messageListPagination.page',
            'messageListPagination.hasNextPage'
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),

        isMessageListLoading () {
            return this.messageListLoading && this.page !== 1
        },

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

            if (this.hasSentFirstMessage) {
                this.hasSentFirstMessage = false

                return
            }

            await this.$store.dispatch('message/getMessageList', this.activeMessageId)

            setTimeout(() => {
                if (!this.$refs.messageList || !this.$refs.messageList.scrollHeight) return

                // When scrolling for next page set
                if (this.page !== 1) {
                    this.$refs.messageList.scrollTop = 790

                    return
                }

                this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
            }, 0)
        },

        /* Mounted Lifecycle Methods */
        setSocketListeners () {
            if(!this.activeMessageId) return

			this.socket.on(`${this.activeMessageId}_new_message`, ({ data }) => {
				this.messageList.push({ 
                    name: data.name,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    message: data.message
                })

				setTimeout(() => {
                    if (!this.$refs.messageList || !this.$refs.messageList.scrollHeight) return

					this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
				}, 0)
			})
        },
        
        /* Get Message List Next Page */
        getMessageListNextPage () {
            const shouldGetNextPage = this.$refs.messageList.scrollTop === 0
            
            if (!shouldGetNextPage || !this.hasNextPage) return

            this.page++

            this.getMessageList()
        },

        /* Send Message */
		async sendMessage () {
            if(!this.message) return

            const messageTemp = this.message
            
            const form = new FormData()

            if (this.activeMessageId) {
                form.append('conversationId', this.activeMessageId)
            }

            form.append('receiverId', this.messageView._id)
            form.append('message', this.message)

            this.message = ''

            await this.$store.dispatch('message/sendMessage', form)

            if (!this.hasSendMessage) return

			this.socket.emit('new_message', {
                conversationId: this.activeMessageId,
                name: `${this.user.firstName} ${this.user.lastName}`,
                senderId: this.user._id,
                receiverId: this.messageView._id,
				message: messageTemp
            })
            
            this.hasSendMessage = false
        },

        /* Template Methods */
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
        
        /* beforeDestroy Lifecycle Methods */
        clearMessageList () {
            this.$store.commit('message/resetUserMessageList')
        },

        async removeSocketConnection () {
            await this.socket.removeListener(`${this.activeMessageId}_new_message`)

            this.activeMessageId = null
        }
    },

    components: {
        InputField,
        Loading: () => import('@/components/global/Loading')
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
        padding: 15px 0 15px 0;
        flex: 1 1 auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        position: relative;

        /deep/.loading-container {
            position: initial;
            min-height: unset;
            padding: 25px 0 35px 0;
            height: 25px;
            // background: #f7f7f7;

            .lds-dual-ring {
                width: 30px;
                height: 30px;

                &:after {
                    width: 20px;
                    height: 20px;
                    border: 4px solid #949494;
                    border-color: #949494 transparent #949494 transparent;
                }
            }
        }
        
        .list-item {
            width: 100%;
            padding: 0px 15px 2px 15px;
            display: flex;
            align-items: flex-end;

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
                width: 36px;
                height: 36px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                position: relative;
                flex-shrink: 0;

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
                    padding: 10px 15px;
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
                padding-top: 0px;

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
                // padding-bottom: 2px;

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
        box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.1);

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