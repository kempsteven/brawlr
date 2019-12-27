<template>
    <form class="signup">
        <h2 class="form-header">
            Sign Up
        </h2>

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
            title="Email"
            placeholder="Enter Email"
            type="email"

            :limit="50"
            v-model="text"
        />

        <input-field
            title="Password"
            placeholder="Enter Password"
            type="email"

            :limit="50"
            v-model="text"
        />

        <input-field
            title="Confirm Password"
            placeholder="Enter Confirm Password"
            type="email"

            :limit="50"
            v-model="text"
        />

        <input-field
            title="Gender"
            placeholder="Enter Gender"
            type="text"

            :limit="50"
            v-model="text"
        />

        <input-field
            title="Age"
            placeholder="Enter Age"
            type="Number"

            :limit="50"
            v-model="text"
        />

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

export default {
    data () {
        return {
            text: ''
        }
    },

    methods: {
        closeForm () {
            this.$store.dispatch('modal/closeModal')
        }
    },

    components: {
        InputField,
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

    @include fadeinfromtop(0.6s, 0s);

    @include mobile {
        min-width: unset;
        width: 100%;
    }

    .form-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        color: $white;
    }

    /deep/.input-field {
        label {
            color: $white;
        }

        .input-box, .input-textarea {
            background: transparent;
            border: 1px solid $white;
            border-radius: 15px;
            color: #e9e9e9;
            padding: 12px 15px;
            transition: 0.3s;
            // background: rgba(0, 0, 0, 0.2);

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