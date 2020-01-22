<template>
    <div class="view-details">
        <section class="close-container">
            <div class="close" @click="closeModal()"/>
        </section>

        <carousel
            class="image-slider"
            :perPage="1"
            :paginationSize="isMobileViewPort ? 10 : 15"

            navigationNextLabel=""
            navigationPrevLabel=""
            :navigationEnabled="!isMobileViewPort"

            paginationActiveColor="#efefef"
            paginationColor="#555555"
            paginationPosition="center"
        >
            <slide
                class="slide"
                :key="key"
                v-for="(image, key) in userImages"
            >
                <img
                    class="img-item"
                    :src="image"
                    alt="User Image"
                >
            </slide>
        </carousel>

        <view-details-info />
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { Carousel, Slide } from 'vue-carousel';
import isMobileMixins from '@/mixins/isMobileMixins'

export default {
    computed: {
        ...mapFields('match', [
			'viewDetailsObject',
        ]),
        
        userImages () {
            if (!Object.keys(this.viewDetailsObject).length) return [ `${require('@/assets/img/avatar-default.png')}`]

            const getAllImages = this.viewDetailsObject.profilePictures.reduce((result, item) => {
                                    if (item.image !== null) {
                                        result.push(item.image.url)
                                    }

                                    return result
                                }, [])

            if (!getAllImages.length) return [ `${require('@/assets/img/avatar-default.png')}` ]

            return getAllImages
        }
    },

    methods: {
        closeModal () {
            this.viewDetailsObject = {}
            this.$store.dispatch('modal/closeModal', {})
        }
    },

    components: {
        Carousel,
        Slide,
        ViewDetailsInfo: () => import('@/components/profile/matches/ViewDetailsInfo'),
    },

    mixins: [isMobileMixins]
}
</script>

<style lang="scss" scoped>
.view-details {
    width: 595px;
    min-height: 850px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
    opacity: 0;

    @include fadeinfromtop(0.2s, 0.1s);

    @include mobile {
        width: 100%;
        height: 100%;
        min-height: unset;
        border-radius: 0;
    }

    .close {
        height: 28px;
        width: 28px;
        position: absolute;
        right: 9px;
        top: 10px;
        cursor: pointer;
        z-index: 2;

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

    .image-slider {
        width: 100%;
        height: 480px;
        border-radius: 5px 5px 0 0;
        position: relative;
        border-bottom: 1px solid #ddd;

        @include mobile {
            height: 290px;
        }

        /deep/.VueCarousel-wrapper {
            height: 100% !important;
            background: #252525;
        }

        /deep/.VueCarousel-inner {
            height: 100% !important;

            .slide {
                height: 100%;
                position: relative;

                .img-item {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        /deep/.VueCarousel-navigation {
            // /deep/.VueCarousel-navigation-button {
            //     top: 45%;
            // }

            /deep/.VueCarousel-navigation-prev {
                left: 40px !important;

                &::after {
                    position: absolute;
                    content: '\2039';
                    font-size: 60px;
                    top: -110%;
                    left: 0;
                    height: 30px;
                    width: 30px;
                    color: #fff;
                }
            }

            /deep/.VueCarousel-navigation-next {
                right: 40px !important;

                &::after {
                    position: absolute;
                    content: '\203A';
                    font-size: 60px;
                    top: -110%;
                    left: 0;
                    height: 30px;
                    width: 30px;
                    color: #fff;
                }
            }

            button {
                font-size: 80px;
                font-weight: 600;
                height: 30px;
                width: 30px;
                padding: 0 !important;
                outline: none;
            }
        }

        /deep/.VueCarousel-pagination {
            bottom: 5px;
            position: absolute;
            pointer-events: none;

            @include mobile {
                bottom: 2px;
            }

            .VueCarousel-dot-container {
                margin-top: 0 !important;

                .VueCarousel-dot {
                    pointer-events: all;
                    margin-top: 0 !important;
                }
            }
        }
    }
}
</style>