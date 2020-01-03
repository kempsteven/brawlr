<template>
    <form class="about-form" @submit.prevent="updateUser()">
        <h3 class="form-header">
            Edit Information
        </h3>

        <section class="input-section">
            <input-field
                class="text-area"
                title="About You"
                placeholder="Enter about you"
                inputType="textarea"
                
                :limit="200"
                v-model="bio"
            />

            <input-field
                title="Fighter Type"
                placeholder="Enter Fighter Type e.g. (Boxer, Muay Thai, Taekwondo)"
                type="text"

                :limit="50"
                v-model="fighterType"
            />

            <select-field
                class="select-margin"
                title="Location"
                placeholder="Enter Location"
                :hasSearch="true"
                :items="countries"

                v-model="location"
            />

            <select-field
                class="select-margin"
                title="Gender"
                placeholder="Enter Gender"

                :items="genders"
                :hasOthers="true"

                v-model="gender"
            />


            <input-field
                title="School/Company Name"
                placeholder="Enter School/Company Name"
                type="text"

                :limit="50"
                v-model="organization"
            />
        </section>

        <section class="controls">
            <button
                class="_cancel"
                type="button"
                :disabled="updateLoading"
                @click="closeForm()"
            >
                Cancel
            </button>

            <button
                class="_primary"
                :disabled="updateLoading"
            >
                {{ updateLoading ? 'Loading...' : 'Save' }}
            </button>
        </section>
    </form>
</template>

<script>
import InputField from '@/components/global/InputField'
import SelectField from '@/components/global/SelectField'

import { mapFields } from 'vuex-map-fields'

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

    created () {
        this.setUserForm()
    },

    computed: {
        ...mapFields('countries', [
            'countries'
        ]),

        ...mapFields('user', [
            'userForm.bio',
            'userForm.fighterType',
            'userForm.location',
            'userForm.gender',
            'userForm.organization',
            'updateLoading',
            'user'
        ])
    },

    methods: {
        /* Created Lifecycle Methods */
        setUserForm () {
            const {
                bio, fighterType, location, 
                gender, organization
            } = this.user
            
            this.bio = bio || ''
            this.fighterType = fighterType || ''
            this.location = location || {id: 0, value: ''}
            this.gender = gender || {id: 0, value: ''}
            this.organization = organization || ''
        },

        /* Update User Methods */
        updateUser () {
            const form = new FormData()

            form.append('bio', this.bio)
            form.append('fighterType', this.fighterType)
            form.append('location[id]', this.location.id)
            form.append('location[value]', this.location.value)
            form.append('gender[id]', this.gender.id)
            form.append('gender[value]', this.gender.value)
            form.append('organization', this.organization)

            this.$store.dispatch('user/updateUser', form)
        },

        /* Close Form Methods */
        closeForm () {
            this.$store.dispatch('modal/closeModal')
            this.$store.commit('user/clearUserForm')
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
    height: 100%;

    @include flex-box('', '', column);

    @include mobile {
        min-width: unset;
        width: 100%;
    }

    .form-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }

    .input-section {
        flex: 1 1 auto;

        @include mobile {
            overflow: auto;
        }

        .select-margin {
            margin-bottom: 24px;
        }

        .text-area {
            height: 170px;
        }
    }
    
    .controls {
        margin-top: 25px;
        width: 100%;

        @include flex-box(flex-end, '', '');

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