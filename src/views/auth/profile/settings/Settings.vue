<template>
    <div class="settings">
        <h3 class="settings-header">
            Settings

            <button class="_primary" @click="saveSettings()">
                Save
            </button>
        </h3>

        <section class="settings-item">
            <h4 class="item-title">
                Show Me:
            </h4>

            <section class="item-value">
                <label
                    for="male"
                    class="checkbox"
                    :class="{ 'active' : male }"
                >
                    <span class="checkbox-title">
                        Male
                    </span>
                    
                    <input
                        id="male"
                        type="checkbox"
                        v-model="male"
                    >
                </label>

                <label
                    for="female"
                    class="checkbox"
                    :class="{ 'active' : female }"
                >
                    <span class="checkbox-title">
                        Female
                    </span>
                    
                    <input
                        id="female"
                        type="checkbox"
                        v-model="female"
                    >
                </label>

                <label
                    for="others"
                    class="checkbox"
                    :class="{ 'active' : others }"
                >
                    <span class="checkbox-title">
                        Others
                    </span>
                    
                    <input
                        id="others"
                        type="checkbox"
                        v-model="others"
                    >
                </label>
            </section>
        </section>

        <section class="settings-item">
            <h4 class="item-title">
                Age range: {{ `${ageRange.from} - ${ageRange.to}` }}
            </h4>
            <!-- navigator.userAgent.indexOf('Edge') >= 0 -->
            <section class="item-value range">
                <input
                    type="range"
                    class="min-range"
                    min="0"
                    v-model="ageRange.from"
                    @input="checkAgeRange($event, 'min')"
                >

                <input
                    type="range"
                    class="max-range"
                    v-model="ageRange.to"
                    @input="checkAgeRange($event, 'max')"
                >
            </section>
        </section>

        <button
            class="sign-out _primary"
            @click="logout()"
        >
            Sign out
        </button>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    created () {
        const unwatch = this.$watch('user', (val) => {
            if (Object.keys(val).length) {
                this.setSettings()

                unwatch()
            }
		}, { immediate: true })
    },

    computed: {
        ...mapFields('user', [
            'user',
            'userSettings.genderPreference',
            'userSettings.genderPreference.male',
            'userSettings.genderPreference.female',
            'userSettings.genderPreference.others',
            'userSettings.ageRange'
        ])
    },

    methods: {
        /* Created Methods */
        setSettings () {
            this.male = this.user.genderPreference.includes(0)
            this.female = this.user.genderPreference.includes(1)
            this.others = this.user.genderPreference.includes(2)

            this.ageRange.from = this.user.ageRange[0]
            this.ageRange.to = this.user.ageRange[1]
        },

        /* Age Range Checker Methods */
        checkAgeRange (e, rangeType) {
            const value = parseInt(e.target.value)

            // For Min Range
            if (rangeType === 'min') {
                if (value >= parseInt(this.ageRange.to)) {
                    this.ageRange.from = parseInt(this.ageRange.to) - 1

                    return
                }

                this.ageRange.from = value
                return
            }

            // For Max Range
            if (value <= parseInt(this.ageRange.from)) {
                this.ageRange.to = parseInt(this.ageRange.from) + 1

                return
            }

            this.ageRange.to = value
        },

        /* Save Settings Methods */
        async saveSettings () {
            if (await this.isAgeRangeValid()) return

            const genderPreference = ['male', 'female', 'others'].reduce((result, item, index) => {
                if (this.genderPreference[item]) {
                    result.push(index)
                }

                return result
            }, [])

            const form = new FormData()

            genderPreference.forEach((genderValue, index) => {
                form.append(`genderPreference[${index}]`, index)
            })

            form.append('ageRange[0]', this.ageRange.from)
            form.append('ageRange[1]', this.ageRange.to)


        },

        isAgeRangeValid () {
            const { from, to } = this.ageRange

            if ((from > to) || (to < from)) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Age range is not valid.',
                    { root: true }
                )

                return false
            }
        },

        /* Logout */
        logout () {
            this.$store.dispatch('authentication/logOut')
        }
    },
}
</script>

<style lang="scss" scoped>
.settings {
    display: flex;
    flex-direction: column;

    .settings-header {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;

        @include flex-box(space-between, center, '');

        ._primary {
            padding: 10px 15px;
        }
    }

    .settings-item {
        margin-bottom: 15px;
        margin-bottom: 50px;
        width: 100%;

        .item-title {
            margin-bottom: 15px;
            text-align: left;
        }

        .item-value {
            display: flex;
            position: relative;
            width: 100%;

            .checkbox {
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 3px;
                transition: 0.3s;
                cursor: pointer;

                &.active {
                    background: $red;

                    .checkbox-title {
                        color: #fff;
                    }
                }
                
                &:not(:last-child) {
                    margin-right: 15px;
                }

                .checkbox-title {
                    transition: 0.3s;
                    text-align: center;
                    display: block;
                }

                input {
                    appearance: none;
                    display: none;
                }
            }

            &.range {
                height: 20px;
                display: flex;
                align-items: center;

                &::before {
                    content: '';
                    height: 5px;
                    background: #000;
                    width: 100%;
                    background: #ddd;
                    border-radius: 3px;
                }
            }

            .min-range, .max-range {
                height: 25px;
                width: 100%;
                margin: 0;
                padding: 0;
                border: 0;
                outline: none;
                background: transparent;
                -webkit-appearance: none;
                -moz-appearance: none;
                pointer-events: none; // Prevent mouse interaction on the range slider.
                position: absolute;
                outline: none;

                /* For Webkit Browsers (Chrome) */
                &::-webkit-slider-runnable-track {
                    cursor: default;
                    height: 5px; /* Required for Samsung internet based browsers */
                    outline: 0;
                    appearance: none;
                    background: #ddd;
                    border-radius: 3px;
                    position: relative;

                }

                &::-webkit-slider-thumb {
                    -webkit-appearance: none; // Reset appearance so we can apply backgrounds/borders etc.
                    pointer-events: all; // Re-enable pointer events so the handles can be used.
                    background: $red;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    top: -10px;
                    position: absolute;
                    z-index: 10;
                    cursor: pointer;
                    border: 1px solid darken($red, 5%);
                }

                /* For Mozilla Browsers */
                &::-moz-range-track {
                    opacity: 0;
                    pointer-events: none;
                }

                &::-moz-range-thumb {
                    -webkit-appearance: none; // Reset appearance so we can apply backgrounds/borders etc.
                    pointer-events: all; // Re-enable pointer events so the handles can be used.
                    background: $red;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    top: -5px;
                    position: absolute;
                    z-index: 10;
                    cursor: pointer;
                    border: 1px solid darken($red, 5%);
                }

                /* For Edge Browsers */
                // &::-ms-track {
                //     height: 5px;
                    
                //     /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
                //     background: transparent;
                    
                //     /*leave room for the larger thumb to overflow with a transparent border */
                //     border-color: transparent;
                //     border-width: 6px 0;

                //     /*remove default tick marks*/
                //     color: transparent;

                //     pointer-events: all;
                // }

                // &::-ms-thumb {
                //     border: none;
                //     height: 25px;
                //     width: 25px;
                //     border-radius: 50%;
                //     background: $red;
                //     pointer-events: all;
                // }

                &::-ms-track {
                    pointer-events: all;
                }

                &::-ms-thumb {
                    border: none;
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                    background: $red;
                    pointer-events: all;
                }

                &::-ms-tooltip {
                    display: none;
                    pointer-events: all;
                }
            }
        }
    }
}
</style>