<template>
    <div class="about">
        <image-container />

        <InputField
            class="text-area"
            title="About You"
            placeholder="Enter about you"
            inputType="textarea"
            
            :limit="200"
            v-model="text"
        />

        <InputField
            title="Fighter Type"
            placeholder="Enter Fighter Type e.g. (Boxer, Martial Artist)"
            type="text"

            :limit="50"
            v-model="text"
        />

        <InputField
            title="Location"
            placeholder="Enter Location"
            type="text"

            :limit="50"
            v-model="text"
        />

        <InputField
            title="Gender"
            placeholder="Enter Gender"
            type="text"

            :limit="50"
            v-model="text"
        />

        <InputField
            title="School/Company Name"
            placeholder="Enter School/Company Name"
            type="text"

            :limit="50"
            v-model="text"
        />
    </div>
</template>

<script>
import ImageContainer from '@/components/profile/about/ImageContainer'
import InputField from '@/components/global/InputField'

export default {
    data() {
        return {
            text: ''
        }
    },

    components: {
        ImageContainer,
        InputField
    },
}
</script>

<style lang="scss" scoped>
.about {
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;

    .text-area {
        height: 150px;
    }
}
</style>