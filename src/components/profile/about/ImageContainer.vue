<template>
    <div class="image-container">
        <section
            class="image-item"
            :class="{ 'default-image' : !isImageAvailable(key + 1) }"
            v-for="(val, key) in 6"
            :key="key"
            @click="openImageCropper(key + 1)"
        >
            <span class="item-number">
                {{ key + 1 }}
            </span>

            <section class="img-wrapper" v-if="isImageAvailable(key + 1)">
                <div
                    class="img-container"
                    :style="`background-image: url(${setImageSrcByPosition(key + 1)})`"
                />
            </section>

            <section class="overlay-container">
                Click to upload image
            </section>

            <button class="_primary" v-if="isImageAvailable(key + 1)"/>
        </section>

        <transition name="_transition-fixed">
            <modal class="modal" v-if="modalName.includes('image-cropper')">
               <image-cropper
                    title="Crop your picture"
                    @cancel="closeModal()"
                    @save="saveProfilePicture($event)"
                    :initial-image="cropInitialImage"
                    slot="content"
                />
            </modal>
        </transition>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    data () {
        return {
            activeImagePosition: null,
        }
    },

    computed: {
        ...mapFields('modal', [
            'modalName'
        ]),

        ...mapFields('user', [
            'user'
        ]),

        cropInitialImage () {
            const isUserHasValue = !Object.keys(this.user).length
            const activeImage = this.user.profilePictures.find(x => parseInt(x.position) === this.activeImagePosition).image
            
            if (
                isUserHasValue
                || activeImage === null
            ) {
                return null
            }

            return activeImage.image.url
        }
    },

    methods: {
        /* Update Profile Picture Methods */
        async saveProfilePicture (image) {
            const form = new FormData()

            form.append('images', this.convertBlobToFile(image))
            form.append('position[0]', this.activeImagePosition)

            this.$store.dispatch('user/updateUserImage', form)
        },

        convertBlobToFile (blob) {
            return new File([blob], 'image.png', {
                type: blob.type,
            })
        },

        openImageCropper (position) {
            this.activeImagePosition = position

            this.$store.commit('modal/toggleModal', { modalName: 'image-cropper' })
        },

        closeModal () {
            this.activeImagePosition = null

            this.$store.dispatch('modal/closeModal')
        },

        /* Template Methods */
        isImageAvailable (position) {
            if (!Object.keys(this.user).length) return false

            const positionObject = this.user.profilePictures.find(picture => parseInt(picture.position) === position)

            if (!positionObject) return false

            return positionObject.image !== null
        },

        setImageSrcByPosition (position) {
            const positionObject = this.user.profilePictures.find(picture => parseInt(picture.position) === position)

            if (!positionObject) return null

            return positionObject.image.url
        }
    },

    components: {
        Modal: () => import('@/components/global/Modal'),
        ImageCropper: () => import('@/components/global/ImageCropper')
    },
}
</script>

<style lang="scss" scoped>
.image-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;

    .image-item {
        width: 31.5%;
        padding-bottom: 38%;
        box-shadow: 0 1px 5px #e4e4e4;
        border-radius: 8px;
        position: relative;
        margin-bottom: 2.5%;
        background: #ddd;
        cursor: pointer;

        &.default-image {
            background-position: center;
            background-image: url('~@/assets/img/avatar-default.png');
            background-repeat: no-repeat;
            background-size: cover;

            .overlay-container {
                background-color: rgba(0,0,0, 0.2);
                opacity: 1;
            }
        }

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
            
            .img-container {
                position: relative;
                width: 100%;
                height: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;

                // .user-image {
                //     width: 100%;
                //     min-height: 100%;
                // }
            }
        }

        .overlay-container {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            position: absolute;
            background-color: rgba(0,0,0, 0.3);
            color: #fff;
            border: 2px dashed #fff;
            font-size: 18px;
            transition: 0.3s;
            opacity: 0;
            padding: 15px;
            text-align: center;

            @include flex-box(center, center, '');

            &:hover {
                opacity: 1;
            }

            @include mobile {
                opacity: 1;
                font-size: 12px;
                border: 1px dashed #fff;
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

            @include mobile {
                top: -7px;
                right: -7px;
            }
        }
    }

    .modal {
        /deep/.modal-container {
            @include mobile {
                height: unset;
            }
        }
    }
}
</style>