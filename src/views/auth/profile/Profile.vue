<template>
    <div class="profile">
        <section class="profile-header">
            <div class="header-cover">
                <div class="header-img"/>

                <section class="profile-main-info">
                    <h2 class="profile-name">
                        {{ fullName | null }}
                    </h2>

                    <span class="profile-type">
                        {{ user.fighterType | null }}
                    </span>
                </section>
            </div>
            
            <div class="picture-wrapper">
                <div class="picture-container">
                    <img
                        :src="profilePicture"
                        alt="Profile Picture"
                        class="profile-picture"
                    >
                </div>
            </div>
        </section>
    
        <section class="profile-info">
            <textarea
                class="bio-container"
                readonly
                :value="user.bio || '-'"
                @paste="test()"
                ref="bioTextArea"
            />

            <section class="profile-nav">
                <section class="nav-container">
                    <router-link
                        class="link-item"
                        to="/profile/about"
                    >
                        <div class="nav-icon about"/>

                        <span class="nav-title">
                            About
                        </span>
                    </router-link>

                    <router-link
                        class="link-item"
                        to="/profile/matches"
                    >
                        <div class="nav-icon matches"/>

                        <span class="nav-title">
                            Matches
                        </span>
                    </router-link>

                    <router-link
                        class="link-item"
                        to="/profile/settings"
                    >
                        <div class="nav-icon settings"/>

                        <span class="nav-title">
                            Settings
                        </span>
                    </router-link>
                </section>
            </section>
        </section>

        <section class="profile-content">
            <transition :name="isMobile">
                <router-view class="content-view"/>
            </transition>
        </section>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import * as user from '@/store/user/'
import { isMobileRegexFunction } from '@/regex'



export default {
    data() {
        return {
            bioWatcher: null
        }
    },

    beforeCreate () {
		if (!this.$store._modulesNamespaceMap['user/']) {
            this.$store.registerModule('user', user.default)
		}
    },
    
    async created () {
        if (!this.online) return
        
        await this.getUser()
    },

    mounted () {
        this.bioWatcher = this.$watch('user.bio', (val) => {
            if (val !== '-' && val) {
                const bioTextArea = this.$refs.bioTextArea
                const scrollHeight = bioTextArea.scrollHeight

                bioTextArea.style.height = `${scrollHeight}px`
            }
        }, { immediate: true })
    },

    destroyed () {
        this.removeWatcher()
    },

    computed: {
        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),
        
        profilePicture () {
            if (
                !this.user
                || !this.user.profilePictures
                || (
                    this.user.profilePictures
                    && this.user.profilePictures.every(x => x.image === null)
                )
            ) { return require('@/assets/img/avatar-default.png') }

            for (const picture of this.user.profilePictures) {
                if (picture.image !== null) {
                    return picture.image.url
                }
            }

            return require('@/assets/img/avatar-default.png')
        },

        fullName () {
            return this.user.firstName ? `${this.user.firstName} ${this.user.lastName}` : null
        },

		isMobile () {
			return isMobileRegexFunction ? '' : '_transition-anim'
		}
    },
    
    methods: {
        getUser () {
            this.$store.dispatch('user/getUser')
        },

        removeWatcher () {
            this.bioWatcher()
        }
    },
}
</script>

<style lang="scss" scoped>
.profile {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .profile-header {
        width: 100%;
        position: relative;
        background: #fff;

        .header-cover {
            width: 100%;
            height: 250px;
            position: relative;
            overflow: hidden;
            background-color: #505050;

            @include mobile {
                height: 200px;
            }

            .header-img {
                background-image: url('~@/assets/img/profile-cover.jpeg');
                // background-attachment: fixed;
                background-position: 0 -180px;
                background-repeat: no-repeat;
                background-size: cover;
                width: 100%;
                min-width: 1080px;
                height: 100%;
                position: absolute;
                margin-left: 50%;
                transform: translateX(-50%);

                @include mobile {
                    margin: unset;
                    transform: unset;
                    right: -100px;
                }
            }

            .profile-main-info {
                top: 45px;
                position: absolute;
                margin-left: 50%;
                transform: translateX(-50%);
                z-index: 2;

                @include mobile {
                    min-width: 80%;
                    top: 30px;
                }
                
                .profile-name, .profile-type {
                    color: #fff;
                    text-shadow: 2px 2px 5px #474747;
                }

                .profile-name {
                    font-size: 28px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #fff;
                    margin-bottom: 5px;
                    text-align: center;
                    min-width: 150px;
                    margin: 0 auto;
                    max-width: 770px;
                    word-break: break-all;
                    max-height: 72px;
                    overflow: hidden;

                    @include mobile {
                        min-width: unset;
                        max-width: 100%;
                    }
                }

                .profile-type {
                    font-size: 18px;
                    text-align: center;
                    display: block;
                    word-break: break-all;

                    @include mobile {
                        min-width: unset;
                        max-width: 100%;
                        max-height: 72px;
                        overflow: hidden;
                    }
                }

            }
        }

        .picture-wrapper {
            position: absolute;
            top: 160px;
            margin-left: 50%;
            transform: translateX(-50%);
            // padding: 5px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 1px 5px #d3d3d3;
            z-index: 2;

            @include mobile {
                top: 145px;
            }

            .picture-container {
                position: relative;
                width: 210px;
                height: 210px;
                overflow: hidden;
                border-radius: 50%;

                .profile-picture {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                @include mobile {
                    width: 180px;
                    height: 180px;
                }
            }
        }
    }

    .profile-info {
        width: 100%;
        min-width: 700px;
        padding-top: 100px;
        box-shadow: 0 1px 5px #e4e4e4;
        background: #fff;

        @include flex-box(center, '', column);

        @include mobile {
            min-width: unset;
            padding-top: 130px;
        }

        .bio-container {
            width: 100%;
            margin: 25px auto;
            padding: 15px 0;
            min-width: 590px;
            text-align: center;
            border: 0;
            resize: none;
            outline: none;
            max-height: 250px;
            max-width: 600px;
            flex-shrink: 0;

            @include mobile {
                min-width: unset;
                width: 100%;
                padding: 0 20px 15px 20px;
                max-height: 150px;
            }
        }

        .profile-nav {
            width: 100%;
            border-top: 1px solid #ececec;
            flex-shrink: 0;

            .nav-container {
                width: 50%;
                display: flex;
                margin: 0 auto;
                min-width: 600px;

                .link-item {
                    font-size: 18px;
                    border-bottom: 3px solid transparent;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;

                    .nav-icon {
                        width: 28px;
                        height: 28px;
                        margin-right: 5px;
                        background-repeat: no-repeat;
                        background-size: cover;
                        filter: grayscale(100%);
                        transition: 0.3s;

                        &.about {
                            background-image: url('~@/assets/img/icon/about.png');
                        }

                        &.matches {
                            background-image: url('~@/assets/img/icon/matches.png');
                        }

                        &.settings {
                            background-image: url('~@/assets/img/icon/settings.png');
                        }

                        @include mobile {
                            width: 45px;
                            height: 45px;
                            margin-right: 0;
                        }
                    }

                    &.router-link-active {
                        color: $red;
                        border-bottom: 3px solid #DA5555;

                        .nav-title {
                            color: #DA5555;
                        }

                        .nav-icon {
                            filter: unset;
                        }
                    }

                    @include mobile {
                        flex: 1 1 auto;
                        justify-content: center;

                        .nav-title {
                            display: none;
                        }
                    }
                }

                @include mobile {
                    justify-content: space-between;
                    width: 100%;
                    min-width: unset;
                }
            }
        }
    }

    .profile-content {
        margin-top: 15px;
        min-width: 600px;
        position: relative;
        width: 50%;
        box-shadow: 0 1px 5px #e4e4e4;

        @include mobile {
            min-width: unset;
            width: 100%;
            margin-top: 0;
        }

        .content-view {
            padding: 15px;
            width: 100%;
            border-radius: 5px;
            display: flex;
            background: #fff;
        }
    }
}
</style>