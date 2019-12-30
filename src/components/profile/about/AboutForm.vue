<template>
    <form class="about-form">
        <h3 class="form-header">
            Edit Information
        </h3>

        <input-field
            class="text-area"
            title="About You"
            placeholder="Enter about you"
            inputType="textarea"
            
            :limit="200"
            v-model="text"
        />

        <input-field
            title="Fighter Type"
            placeholder="Enter Fighter Type e.g. (Boxer, Martial Artist)"
            type="text"

            :limit="50"
            v-model="text"
        />

        <input-field
            title="Location"
            placeholder="Enter Location"
            type="text"

            :limit="50"
            v-model="text"
        />

        <select-field
            class="select-margin"
            title="Gender"
            placeholder="Enter Gender"
            type="text"

            :items="genders"
            :hasOthers="true"

            v-model="obj"
        />


        <input-field
            title="School/Company Name"
            placeholder="Enter School/Company Name"
            type="text"

            :limit="50"
            v-model="text"
        />

        <section class="controls">
            <button class="_cancel" type="button" @click="closeForm()">
                Cancel
            </button>

            <button class="_primary">
                Save
            </button>
        </section>
    </form>
</template>

<script>
import InputField from '@/components/global/InputField'
import SelectField from '@/components/global/SelectField'

export default {
    data () {
        return {
            text: '',

            obj: {},

            genders: [
                {
                    id: 0,
                    value: 'Male'
                },
                
                {
                    id: 1,
                    value: 'Female'
                }
            ]
        }
    },

    methods: {
        closeForm () {
            this.$store.dispatch('modal/closeModal')
        },

        test (e) {
            console.log(e)
        }
    },

    components: {
        InputField,
        SelectField
    },
}
</script>

<style lang="scss" scoped>
.about-form {
    min-width: 500px;
    width: 50%;
    padding: 5px;

    @include mobile {
        min-width: unset;
        width: 100%;
    }

    .form-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }

    .select-margin {
        margin-bottom: 24px;
    }

    .text-area {
        height: 170px;
    }
    
    .controls {
        display: flex;
        justify-content: flex-end;
        margin-top: 25px;

        ._cancel {
            margin-right: 15px;
        }

        @include mobile {
            button {
                flex: 1 1 auto;
            }
        }
    }
}
</style>