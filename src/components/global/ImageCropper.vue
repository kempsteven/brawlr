<template>
    <div class="image-cropper">
        <h3 class="cropper-title" v-if="title">
            {{ title }}
        </h3>

        <section class="croppa-container">
            <button
                class="_primary"
                @click="removeImage()"
                v-if="croppa && croppa.img"
            />

            <!-- file-size-limit 2 mb -->
            <croppa
                class="croppa"
                canvas-color="#eee"
                :placeholder-font-size="16"
                :auto-sizing="true"
                :disabled="loading"
                :prevent-white-space="true"
                :placeholder="placeholder"
                :show-remove-button="false"
                :quality="0.9"
                :zoom-speed="15"
                :initial-image="initialImage"
                
                :file-size-limit="5 * (1024 * 1024)"

                @file-size-exceed="handleCroppaFileSizeExceed"

                v-model="croppa"
            >
            </croppa>
        </section>

        <section class="control-container">
            <button class="_cancel" @click="$emit('cancel')">
                Cancel
            </button>

            <button class="_primary" @click="generateImage()">
                Save
            </button>
        </section>
    </div>
</template>

<script>
import Croppa from 'vue-croppa'

export default {
    props: {
        title: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: 'Drag a photo or click to upload image'
        },

        initialImage: {
            type: String,
            default: ''
        },

        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            croppa: {}
        }
    },

    methods: {
        async generateImage () {
            if (!this.croppa.img) return

            const generatedImage = await this.croppa.promisedBlob('image/png', 1)

            this.$emit('save', generatedImage)
        },

        removeImage () {
            if (this.croppa) this.croppa.remove()
        },

        handleCroppaFileSizeExceed (e) {
            const imageSizeInserted = `${(e.size / (1024 * 1024))} MB`

            this.$store.dispatch(
                'modal/errorModal',
                `Sorry, 5 MB is the maximum image size, you inserted an image with a ${imageSizeInserted} file size`
            )
        }
    },

    components: {
        Croppa: Croppa.component,
    },
}
</script>

<style lang="scss" scoped>
.image-cropper {
    .cropper-title {
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
    }

    .croppa-container {
        padding-bottom: 125%;
        width: 350px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;

        @include mobile {
            width: 100%;
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
            z-index: 1;

            &:after {
                content: '\2716'
            }

            @include mobile {
                top: -7px;
                right: -7px;
            }
        }

        .croppa {
            width: 100%;
            height: 100%;
            cursor: pointer;
            position: absolute;
            border: 2px dashed #ddd;
            overflow: hidden;
        }
    }

    .control-container {
        @include flex-box(space-between, '', '');

        button {
            flex: 1 1 auto;

            &:first-child {
                margin-right: 15px;
            }
        }
    }
}
</style>