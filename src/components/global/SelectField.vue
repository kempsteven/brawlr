<template>
    <div
        class="select-field"
        v-on-clickaway="closeDropdown"
        tabindex="0"
        @focus="openDropdown()"
        @blur="closeDropdown()"
    >
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
            <section
                :class="`dropdown-container ${dropdownPosition}`"
                v-if="showDropdown"
            >
                <input
                    type="text"
                    class="search-field"
                    placeholder="Search"
                    @input="searchList($event.target.value)"
                    v-if="hasSearch"
                >

                <ul class="list-container">
                    <li
                        class="list-item"
                        :class="{
                            'selected' : parseInt(item.id) === parseInt(value.id) && value.id !== 'other-option'
                        }"
                        :key="key"
                        v-for="(item, key) in list"
                        @click="selectItem(item)"
                    >
                        {{ item.value }}
                    </li>

                    <li
                        class="list-item"
                        :class="{
                            'selected' : items.every(x => x.value !== value.value)
                        }"
                        v-if="hasOthers"
                        @click="toggleReadOnly()"
                    >
                        Others
                    </li>
                </ul>
            </section>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDropdown: false,
            isReadOnly: true,
            list: []
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

        hasSearch: {
            type: Boolean,
            default: false
        },

        dropdownPosition: {
            type: String,
            default: 'bottom'
        }
    },

    created () {
        this.list = [...this.items]
    },

    watch: {
        value: {
            handler (value) {
                if (value && value.id === 'other-option') {
                    this.isReadOnly = false
                }
            },

            immediate: true,
            deep: true
        }
    },

    methods: {
        /* Select Item */
        selectItem (item) {
            this.isReadOnly = true
            this.input(item)

            this.showDropdown = false
        },

        /* Input Value From Others (Input tag) */
        inputOtherValue (value) {
            if (this.isReadOnly) return
            
            this.input({
                id: 'other-option',
                value: value
            })
        },

        /* Input/Emit Value */
        input (value) {
            this.$emit('input', value)
        },

        /* Search List */
        searchList (searchText) {
            clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
                if (!searchText) {
                    this.list = [...this.items]
                    return
                }
                
				this.list = this.items.filter((item) => {
                    return item.value.toLowerCase().indexOf(searchText) > -1
                })
			}, 500)
        },

        /* Template Methods */
        closeDropdown () {
            this.showDropdown = false
        },

        openDropdown () {
            this.showDropdown = true
        },

        toggleDropdown () {
            this.showDropdown = !this.showDropdown
        },

        toggleReadOnly () {
            this.$refs.selectedInput.focus()

            this.input({
                id: 'other-option',
                value: 'Other'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.select-field {
    position: relative;
    outline: none;
    
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

    .dropdown-container {
        position: absolute;
        top: 100%;
        z-index: 2;
        background: #fff;
        width: 100%;
        border-radius: 0 0 3px 3px;
        border: 1px solid #ddd;
        transition: 0.3s;

        &.top {
            top: unset;
            bottom: 58%;
            transform: rotate(180deg);

            .list-container {
                transform: rotate(180deg);
            }
        }

        .search-field {
            width: 100%;
            border: 0;
            border-bottom: 1px solid #ddd;
            padding: 8px 10px;

            &::placeholder {
                color: #c3c3c3;
            }
        }

        .list-container {
            width: 100%;
            overflow: auto;
            max-height: 167px;

            .list-item {
                padding: 10px;
                transition: 0.3s;
                cursor: pointer;

                &.selected {
                    background: lighten($red, 6%);
                    color: #fff;
                }

                &:hover {
                    background: lighten($red, 6%);
                    color: #fff;
                }
            }
        }
    }
}
</style>