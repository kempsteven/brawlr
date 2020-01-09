<template>
    <div class="matches">
        <section
            class="image-item"
            v-for="(val, key) in 6"
            :key="key"
        >
            <section class="img-wrapper">
                <img
                    class="user-image"
                    src="@/assets/img/sample-picture.jpg"
                    alt="User Image"
                >
            </section>

            <section class="primary-info">
                <h4 class="name">
                    Manny Pacquiao
                </h4>

                <h5 class="fighter">
                    Boxer
                </h5>
            </section>

            <button class="_primary" />
        </section>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.matches {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .image-item {
        width: 23.5%;
        padding-bottom: 28%;
        box-shadow: 0 1px 5px #e4e4e4;
        border-radius: 8px;
        position: relative;
        margin-bottom: 2%;

        &:not(:nth-child(4n)) {
            margin-right: 2%;
        }

        @include mobile {
            width: 31%;
            padding-bottom: 38%;
            margin-bottom: 3%;
            margin-right: 0%;

            &:not(:nth-child(4n)) {
                margin-right: 0;
            }

            &:not(:nth-child(3n)) {
                margin-right: 3.5%;
            }
        }

        .img-wrapper {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 8px;
            position: absolute;
            top: 0;
            left: 0;
            
            .user-image {
                width: 100%;
                min-height: 100%;
            }
        }

        .primary-info {
            position: absolute;
            left: 0px;
            bottom: 10px;
            padding: 0 10px;

            h4, h5 {
                color: #fff;
                text-align: left;
                text-shadow: 0px 0px 7px #828282;

                @include mobile {
                    font-size: 12px;
                }
            }

            .name {
                padding-bottom: 2px;
                margin-bottom: 2px;
                border-bottom: 1px solid #fff;
                max-width: 100%;
            }
        }

        ._primary {
            position: absolute;
            top: -5px;
            right: -5px;
            padding: 2px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 12px;
            min-width: unset;

            &:after {
                content: '\2716'
            }
        }
    }
}
</style>