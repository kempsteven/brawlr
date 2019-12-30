<template>
    <div class="select-field" v-on-clickaway="closeDropdown">
        <!-- Select Title -->
        <h4 class="select-title" v-if="title">
            {{ title }}
        </h4>

        <!-- Selected Value/Input -->
        <input
            class="selected-value"
            ref="selectedInput"
            type="text"

            :placeholder="placeholder"
            :readonly="isReadOnly"

            :value="value.value"
            @input="inputOtherValue($event.target.value)"
            @click="toggleDropdown()"
        >

        <!-- Select Dropdown -->
        <transition name="_transition-anim">
            <ul
                :class="`list-container ${dropdownPosition}`"
                v-if="showDropdown"
            >
                <li
                    class="list-item"
                    :key="key"
                    v-for="(item, key) in items"
                    @click="selectItem(item)"
                >
                    {{ item.value }}
                </li>

                <li
                    class="list-item"
                    v-if="hasOthers"
                    @click="toggleReadOnly()"
                >
                    Others
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDropdown: false,
            isReadOnly: true
        }
    },

    props: {
        /* For Labels */
        title: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: ''
        },

        /* Data Related Props */
        items: {
            type: Array,
            default: () => []
        },

        value: {
            type: Object,
            default: () => {}
        },

        /* Element Related Props */
        hasOthers: {
            type: Boolean,
            default: false
        },

        dropdownPosition: {
            type: String,
            default: 'bottom'
        }
    },

    methods: {
        /* Select Item */
        selectItem (item) {
            this.isReadOnly = true
            this.input(item)
        },

        /* Input Value From Others (Input tag) */
        inputOtherValue (value) {
            if (this.isReadOnly) return

            console.log(value)
            
            this.input({
                id: 0,
                value: value
            })
        },

        /* Input/Emit Value */
        input (value) {
            this.$emit('input', value)
        },

        /* Template Methods */
        closeDropdown () {
            this.showDropdown = false
        },

        toggleDropdown () {
            this.showDropdown = !this.showDropdown
        },

        toggleReadOnly () {
            this.isReadOnly = false

            this.$refs.selectedInput.focus()

            this.input({
                id: 0,
                value: 'Other'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.select-field {
    position: relative;
    @include flex-box('', '', column);

    .select-title {
        text-align: left;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        height: 17px;
    }

    .selected-value {
        padding: 8px 10px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        user-select: none;

        &::placeholder {
            color: #c3c3c3;
        }
    }

    .list-container {
        position: absolute;
        top: 100%;
        z-index: 2;
        background: #fff;
        width: 100%;
        border-radius: 0 0 3px 3px;
        border: 1px solid #ddd;
        transition: 0.3s;
        max-height: 200px;
        overflow: auto;

        &.top {
            top: unset;
            bottom: 58%;
            transform: rotate(180deg);

            .list-item {
                transform: rotate(180deg);
            }
        }

        .list-item {
            padding: 10px;
            transition: 0.3s;

            &:hover {
                background: lighten($red, 6%);
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>