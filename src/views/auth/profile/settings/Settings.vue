<template>
    <div class="settings">
        <h3 class="settings-header">
            Settings
        </h3>

        <section class="settings-item">
            <h4 class="item-title">
                Show Me:
            </h4>

            <section class="item-value">
                <label
                    for="male"
                    class="checkbox"
                    :class="{ 'active' : showMe.male }"
                >
                    <span class="checkbox-title">
                        Male
                    </span>
                    
                    <input
                        id="male"
                        type="checkbox"
                        v-model="showMe.male"
                    >
                </label>

                <label
                    for="female"
                    class="checkbox"
                    :class="{ 'active' : showMe.female }"
                >
                    <span class="checkbox-title">
                        Female
                    </span>
                    
                    <input
                        id="female"
                        type="checkbox"
                        v-model="showMe.female"
                    >
                </label>

                <label
                    for="others"
                    class="checkbox"
                    :class="{ 'active' : showMe.others }"
                >
                    <span class="checkbox-title">
                        Others
                    </span>
                    
                    <input
                        id="others"
                        type="checkbox"
                        v-model="showMe.others"
                    >
                </label>
            </section>
        </section>

        <section class="settings-item">
            <h4 class="item-title">
                Age range:
            </h4>
            <!-- navigator.userAgent.indexOf('Edge') >= 0 -->
            <section class="item-value range">
                <input type="range" value="10" class="min-range">
                <input type="range" value="10" class="max-range">
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
export default {
    data() {
        return {
            showMe: {
                male: false,
                female: false,
                others: false
            }
        }
    },

    methods: {
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
    }

    .settings-item {
        margin-bottom: 15px;
        margin-bottom: 100px;
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
                    border: 0;
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