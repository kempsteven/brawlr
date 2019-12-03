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

            <section class="item-value">
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

            // .min-range, .max-range {
            //     pointer-events: none;
            //     position: absolute;
            //     appearance: none;  
            //     border: none;
            //     border-radius: 5px;
            //     background: #ddd;
            //     left: 0;
            //     top: 0;
            //     width: 100%;
            //     outline: none;
            //     height: 5px;
            //     margin: 0;
            //     padding: 0;

            //     &::-webkit-slider-thumb {
            //         pointer-events: all;
            //         position: relative;
            //         z-index: 1;
            //         outline: 0;    
            //         appearance: none;
            //         width: 20px;
            //         height: 20px;
            //         border: none;
            //         background-color: $red;
            //         border-radius: 50%;
            //         cursor: pointer;
            //     }
            // }
            
            input[type="range"] {
                pointer-events: none;
                position: absolute;
                -webkit-appearance: none;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0);    
                border: none;
                border-radius: 5px;
                background: rgba(255, 255, 255, 0);
                left: 0;
                top: 0;
                width: 100%;
                outline: none;
                height: 25px;
                margin: 0;
                padding: 0;
            }  
            
            input[type="range"]::-webkit-slider-thumb {
                pointer-events: all;
                position: relative;
                z-index: 1;
                outline: 0;    
                appearance: none;
                width: 25px;
                height: 25px;
                border: none;
                border-radius: 5px;
                background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, lighten($red,60%)), color-stop(100%, $red)); /* android <= 2.2 */
                background-image: -webkit-linear-gradient(top , lighten($red,60%) 0, $red 100%); /* older mobile safari and android > 2.2 */;
                background-image: linear-gradient(to bottom, lighten($red,60%) 0, $red 100%); /* W3C */
            }
            
            input[type="range"]::-moz-range-thumb {
                pointer-events: all;
                position: relative;
                z-index: 10;
                appearance: none;
                width: 25px;
                height: 25px;
                border: none;
                border-radius: 5px;
                background-image: linear-gradient(to bottom, lighten($red,60%) 0, $red 100%); /* W3C */
            }

            input[type="range"]::-ms-thumb {
                pointer-events: all !important;
                position: relative;
                z-index: 10;
                appearance: none;
                width: 25px;
                height: 25px;
                border-radius: 5px;
                border: 0;
                background-image: linear-gradient(to bottom, lighten($red,60%) 0, $red 100%); /* W3C */
            }
            
            input[type=range]::-moz-range-track {
                position: relative;
                z-index: -1;
                background-color: rgba(0, 0, 0, 1);
                border: 0;
            }
            
            input[type=range]:last-of-type::-moz-range-track {
                -moz-appearance: none;
                background: none transparent;
                border: 0;
            } 
            
            input[type=range]::-moz-focus-outer {
                border: 0;
            }
        }
    }
}
</style>