<template>
    <div class="message-view">
        <section class="view-header">
            <section class="img-container">
                <img
                    src="@/assets/img/sample-picture.jpg"
                    class="user-img"
                    alt="user-message-image"
                >
            </section>

            <h3 class="header-name">
                Manny Pacquiaouaoai
            </h3>
        </section>

        <section class="view-content">
            <message-area />
            <message-view-details />
        </section>
    </div>
</template>

<script>
import MessageArea from '@/components/messages/MessageArea'
import MessageViewDetails from '@/components/messages/MessageViewDetails'

export default {
    components: {
        MessageArea,
        MessageViewDetails
    },
}
</script>

<style lang="scss" scoped>
.message-view {
    background: #fff;
    box-shadow: 3px 1px 5px #d1d1d1;
    height: 94.5%;
    width: 100%;

    .view-header {
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);

        .img-container {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 12px;
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
    }

    .view-content {
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
    }
}
</style>