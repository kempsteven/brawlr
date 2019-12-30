<template>
    <form class="signup">
        <h2 class="form-header">
            Sign Up
        </h2>

        <section class="input-section scroll-visible">
            <input-field
                title="First Name"
                placeholder="Enter First Name"
                type="text"

                :limit="50"
                v-model="text"
            />

            <input-field
                title="Last Name"
                placeholder="Enter Last Name"
                type="text"

                :limit="50"
                v-model="text"
            />

            <input-field
                class="input-margin"
                title="Email"
                placeholder="Enter Email"
                type="email"
                v-model="text"
            />

            <input-field
                class="input-margin"
                title="Password"
                placeholder="Enter Password"
                type="email"
                v-model="text"
            />

            <input-field
                class="input-margin"
                title="Confirm Password"
                placeholder="Enter Confirm Password"
                type="email"
                v-model="text"
            />

            <select-field
                placeholder="Enter Gender"
                dropdownPosition="top"
                class="select-margin"
                title="Gender"
                type="text"
                
                :items="genders"
                :hasOthers="true"

                v-model="obj"
            />

            <input-field
                title="Age"
                placeholder="Enter Age"
                type="Number"
                :limit="3"
                v-model="text"
            />
        </section>

        <section class="controls">
            <button class="_cancel" type="button" @click="$router.push('/')">
                Back
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

            .list-container {
                bottom: 65%;
                border-radius: 15px;
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