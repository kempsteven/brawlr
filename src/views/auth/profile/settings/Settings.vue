<template>
    <div class="settings">
        <h3 class="settings-header">
            Settings

            <button
                class="_primary"
                :disabled="updateLoading || loading"
                @click="saveSettings()"
            >
                {{ updateLoading ? 'Loading...' : 'Save' }}
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
            
            <section
                class="item-value range"
                :class="{ 'edge' : isEdgeBrowser }"
            >
                <div
                    class="edge-fallback"
                    :style="fallbackStyle"
                    ref="fallback"
                    @mouseenter="changeAgeFromZIndex('over')"
                    v-if="isEdgeBrowser"
                />

                <input
                    type="range"
                    class="min-range"
                    min="0"
                    v-model="ageRange.from"
                    ref="ageFromRangeInput"
                    @mouseenter="togglePointerEventOfFallback('none')"
                    @mouseleave="changeAgeFromZIndex('leave')"
                    @input="checkAgeRange($event, 'min')"
                >

                <input
                    type="range"
                    class="max-range"
                    v-model="ageRange.to"
                    @mouseenter="togglePointerEventOfFallback('all')"
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

                if (unwatch) unwatch()
            }
		}, { immediate: true })
    },

    computed: {
        ...mapFields('user', [
            'user',
            'loading',
            
            'userSettings.genderPreference',
            'userSettings.genderPreference.male',
            'userSettings.genderPreference.female',
            'userSettings.genderPreference.others',
            'userSettings.ageRange',
            'updateLoading'
        ]),

        /* Computed Properties for fallback for Edge Browser arghhhhh*/
        isEdgeBrowser () {
            return navigator.userAgent.indexOf('Edge') >= 0
        },

        fallbackStyle () {
            switch (true) {
                case this.ageRange.from <= 26:
                    return `width: calc(${this.ageRange.from}% + 7px)`
                case this.ageRange.from <= 75:
                    return `width: calc(${this.ageRange.from}% + 5px)`
                default:
                    return `width: calc(${this.ageRange.from}%)`
            }
        }
    },

    methods: {
        /* Created Methods */
        setSettings () {
            this.male = parseInt(this.user.genderPreference.male) === 1
            this.female = parseInt(this.user.genderPreference.female) === 1
            this.others = parseInt(this.user.genderPreference.others) === 1

            this.ageRange.from = this.user.ageRange.from
            this.ageRange.to = this.user.ageRange.to
        },

        /* Age Range Checker Methods */
        checkAgeRange (e, rangeType) {
            const value = parseInt(e.target.value)

            // For Min Range
            if (rangeType === 'min') {
                if (this.isEdgeBrowser) {
                    this.timeOutAfterDrag()
                }

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
            if (await this.isAgeRangeValid() || this.loading) return

            const form = new FormData()

            form.append('genderPreference[male]', +this.male)
            form.append('genderPreference[female]', +this.female)
            form.append('genderPreference[others]', +this.others)
            form.append('ageRange[from]', this.ageRange.from)
            form.append('ageRange[to]', this.ageRange.to)

            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to update your settings?',
                storeAction: 'user/updateUser',
                storePayload: form
            })
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

        /* Methods for fallback for Edge Browser arghhhhh 😠😵 (Explanation is in the lowest part of the code) */
        togglePointerEventOfFallback (pointerEvent) {
            this.$refs.fallback.style.pointerEvents = pointerEvent
        },

        changeAgeFromZIndex (typeOfHover) {
            if (typeOfHover === 'over') {
                this.$refs.ageFromRangeInput.style.zIndex = '2'
                this.$refs.ageFromRangeInput.style.pointerEvents = 'all'
                
                return
            }

            this.$refs.ageFromRangeInput.style.zIndex = '1'
            this.$refs.ageFromRangeInput.style.pointerEvents = 'none'
        },

        timeOutAfterDrag () {
            this.$refs.ageFromRangeInput.style.zIndex = '1'
            this.$refs.ageFromRangeInput.style.pointerEvents = 'none'
        },

        /* Logout */
        logout () {
            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to log out?',
                storeAction: 'authentication/logOut'
            })
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

            .edge-fallback {
                height: 100%;
                position: absolute;
                min-width: 8px;
                z-index: 2;
            }

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
                    &::-ms-track {
                        pointer-events: all;
                    }

                    &::-ms-thumb {
                        border: none;
                        height: 18px;
                        width: 6px;
                        border-radius: 0;
                        background: $red;
                        pointer-events: all;
                        cursor: pointer;
                        border: 1px solid darken($red, 5%);
                    }

                    &::-ms-tooltip {
                        display: none;
                        pointer-events: all;
                    }
                }

                &.edge {
                    .min-range, .max-range {
                        pointer-events: all;
                        z-index: 1;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>

/* FALL BACK FOR EDGE BROWSER EXPLANATION, YEAH ITS FOR YOU KEMP, I KNOW YOU'LL FORGET HOW YOU DID THIS SHIT HAHA
    Explanation:
        Variables:
            minRange -> would be the age-from input range
            maxRange -> would be the age-to input range
            fallback -> would be the div that follows the range thumb of 'minRange'

        Info:
            fallbackStyle (computed property) is the calculated width (from the 'minRange' value)
            of the 'fallback' (hidden div covering the multi-range input).

        Scenario:
            First, 'fallback' would cover the multi-range input at first (not everything, only from its width, starting of left of its parent).

            fallback events:
                mouseenter:
                    it would set the 'minRange' on the top by setting z-index, and pointer events.
                    minRange can now be change, minRange is now covering the the html elements('maxRange', 'fallback')

                    by this time the level of elements would be (
                        minRange,
                        fallback,
                        maxRange
                    )

            minRange events:
                **Info:
                    event though the elements z-index is now lower and is the element is being covered by other elements,
                    as long as the user has clicked and hasn't let go
                    the input range can still be interacted.

                mouseenter: 
                    fallback's, pointers events will be set to none. after this event, 'fallback' cannot be
                    interacted (cannot be clicked, hovered, anything).

                    by this time the level of elements would be (
                        minRange,
                        fallback(pointer-events: none),
                        maxRange,
                    )

                input:
                    sets the value of ageFrom. will set the z-index of itself to 1 and pointer events to none,
                    minRange is not on top anymore. (**Info is relevant here)
                    
                    by this time the level of elements would be (fallback, maxRange, minRange)
                
                mouseleave:
                    will set the z-index of itself to 1, which the whole result would almost be the default levels of elements
                    only the fallback element will have a pointer events none style

                    by this time the level of elements would be (
                        fallback (pointer-events: none),
                        maxRange,
                        minRange
                    )
            maxRange events:
                mouseenter:
                    would set the fallbacks pointer events to all, will entirely resets everything to default.

                    by this time the level of elements would be (
                        fallback,
                        maxRange,
                        minRange
                    )
*/