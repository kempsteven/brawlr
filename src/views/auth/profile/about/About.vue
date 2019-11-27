<template>
    <div class="about">
        <section class="image-container">
            <section
                class="image-item"
                v-for="(val, key) in 6"
                :key="key"
            >
                <span class="item-number">
                    {{ key + 1 }}
                </span>

                <section class="img-wrapper">
                    <img
                        class="user-image"
                        src="@/assets/img/sample-picture.jpg"
                        alt="User Image"
                    >
                </section>

                <button class="remove-add-btn">
                    &times;
                </button>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.about {
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;

    .image-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .image-item {
            width: 31.5%;
            padding-bottom: 38%;
            box-shadow: 0 1px 5px #e4e4e4;
            border-radius: 8px;
            position: relative;
            margin-bottom: 2.5%;

            @include mobile {
                width: 31%;
                margin-bottom: 3%;
            }

            .item-number {
                position: absolute;
                top: 5%;
                left: 7%;
                color: #fff;
                z-index: 1;
                text-shadow: 0px 0px 7px #828282;
                font-size: 1.3em;
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

            .remove-add-btn {
                position: absolute;
                bottom: -10px;
                right: -10px;
                border-radius: 50%;
                border: 1px solid #ddd;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                font-size: 26px;
                font-weight: 600;
                color: $red;
                opacity: 1;

                @include mobile {
                    width: 25px;
                    height: 25px;
                    font-size: 17px;
                    bottom: -5px;
                    right: -5px;
                }
            }
        }
    }
}
</style>