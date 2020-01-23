<template>
    <div class="message-view-details">
        <section class="message-img-slider">
            <img
                class="slider-img"
                src="@/assets/img/avatar-default.png"
                alt="user-message-image"
            >
        </section>

        <section class="main-details">
            <span class="detail-item">
                <h4 class="item-title">
                    Name:
                </h4>

                <span class="item-value">
                    Manny Pacquiaouaoai
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Age:
                </h4>

                <span class="item-value">
                    103
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Fighter Type:
                </h4>

                <span class="item-value">
                    Lorem ipsum dolor
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Location:
                </h4>

                <span class="item-value">
                    Lorem, ipsum.
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Gender:
                </h4>

                <span class="item-value">
                    Lorem, ipsum.
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    School / Company Name:
                </h4>

                <span class="item-value">
                    Lorem, ipsum dolor.
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Bio:
                </h4>

                <span class="item-value">
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Et, temporibus.
                </span>
            </span>
        </section>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.message-view-details {
    width: 30%;
    height: 100%;
    min-width: 300px;
    border-left: 1px solid #ddd;
    overflow: auto;
    background: #fff;

    @include mobile {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 100%;
        top: 0;
        transition: 0.1s;
    }

    .message-img-slider {
        position: relative;
        width: 100%;
        height: 45%;
        overflow: hidden;

        .slider-img {
            width: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
        }
    }

    .main-details {
        display: flex;
        padding: 15px;
        flex-direction: column;

        .detail-item {
            width: 100%;
            display: flex;
            flex-direction: column;

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            .item-value {
                color: #888888;
            }
        }
    }
}
</style>