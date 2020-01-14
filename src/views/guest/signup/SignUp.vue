<template>
    <form class="signup" @submit.prevent="signUp()">
        <h2 class="form-header">
            Sign Up
        </h2>

        <section class="input-section scroll-visible">
            <input-field
                title="First Name"
                placeholder="Enter First Name"
                type="text"

                :limit="25"
                v-model="firstName"
            />

            <input-field
                title="Last Name"
                placeholder="Enter Last Name"
                type="text"

                :limit="25"
                v-model="lastName"
            />

            <input-field
                class="input-margin"
                title="Email"
                placeholder="Enter Email"
                type="email"
                v-model="email"
            />

            <input-field
                class="input-margin"
                title="Password"
                placeholder="Enter Password"
                type="password"
                v-model="password"
            />

            <input-field
                class="input-margin"
                title="Confirm Password"
                placeholder="Enter Confirm Password"
                type="password"
                v-model="confirmPassword"
            />

            <select-field
                placeholder="Enter Gender"
                dropdownPosition="top"
                class="select-margin"
                title="Gender"
                
                :items="genders"
                :hasOthers="true"

                v-model="gender"
            />

            <input-field
                title="Age"
                placeholder="Enter Age"
                type="Number"
                :limit="3"
                v-model="age"
            />
        </section>

        <section class="controls">
            <button
                class="_cancel"
                type="button"
                @click="back()"
                :disabled="loading"
            >
                Back
            </button>

            <button
                class="_primary"
                :disabled="loading"
            >
                {{ loading ? 'Loading...' : 'Save' }}
            </button>
        </section>
    </form>
</template>

<script>
import InputField from '@/components/global/InputField'
import SelectField from '@/components/global/SelectField'
import { formValidation } from '@/helpers/FormValidation'

import { mapFields } from 'vuex-map-fields'

export default {
    data () {
        return {

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

    computed: {
        ...mapFields('signup', [
            'signup.firstName',
            'signup.lastName',
            'signup.email',
            'signup.password',
            'signup.confirmPassword',
            'signup.gender',
            'signup.age',
            'signup',
            'loading'
        ])
    },

    methods: {
        signUp () {
            if (this.loading) return
            
            if (!formValidation.isFormComplete(this.signup)) return

            if (
                !formValidation.isEqual(
                    this.password,
                    this.confirmPassword,
                    'Password is not the same with confirm password'
                )
            ) { return }

            const form = new FormData()

            form.append('firstName', this.firstName)
            form.append('lastName', this.lastName)
            form.append('email', this.email)
            form.append('password', this.password)
            form.append('gender[id]', this.gender.id)
            form.append('gender[value]', this.gender.value)
            form.append('age', this.age)

            this.$store.dispatch('signup/signUp', form)
        },

        back () {
            this.$router.push('/')
            this.$store.commit('signup/clearSignup')
        }
    },

    components: {
        InputField,
        SelectField
    },
}
</script>

<style lang="scss" scoped>
$white: #ececec;

.signup {
    width: 25%;
    padding: 15px;
    margin-top: 60px;
    min-width: 500px;
    @include flex-box('', '', column);

    @include fadeinfromtop(0.6s, 0s);

    @include mobile {
        min-width: unset;
        width: 100%;
        margin-top: 0;
        height: 100%;
        overflow: auto;
    }

    .form-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        color: $white;
    }

    .input-section {
        flex: 1 1 auto;
        overflow: auto;

        .input-margin, .select-margin {
            margin-bottom: 24px;
        }

        /deep/ .select-field {
            h4 {
                color: $white;
            }

            .selected-value {
                background: transparent;
                border: 1px solid $white;
                border-radius: 15px;
                color: #e9e9e9;
                padding: 12px 15px;
                transition: 0.3s;

                &::placeholder {
                    color: $white;
                }

                &:focus {
                    background: rgba(0, 0, 0, 0.3);
                }
            }

            .dropdown-container {
                bottom: 65%;
                border-radius: 15px;
                overflow: hidden;
            }
        }

        /deep/.input-field {
            h4 {
                color: $white;
            }

            .input-box, .input-textarea {
                background: transparent;
                border: 1px solid $white;
                border-radius: 15px;
                color: #e9e9e9;
                padding: 12px 15px;
                transition: 0.3s;

                &::placeholder {
                    color: $white;
                }

                &:focus {
                    background: rgba(0, 0, 0, 0.3);
                }
            }

            .input-textarea {
                height: 170px;
            }

            .limit-label {
                color: $white;
            }
        }
    }
    
    .controls {
        display: flex;
        justify-content: flex-end;
        margin-top: 25px;
        justify-self: flex-end; 

        ._cancel {
            border: none;
            background: transparent;
            padding: 15px 25px;
            color: #fff;
            font-size: 15px;
            background: #4267b2;
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