<template>
    <div class="profile">
        <section class="profile-header">
            <div class="header-cover">
                <div class="header-img"/>

                <section class="profile-main-info">
                    <h2 class="profile-name">
                        Lorem ipsum dolor
                    </h2>

                    <span class="profile-type">
                        Lorem ipsum
                    </span>
                </section>
            </div>
            
            <div class="picture-wrapper">
                <div class="picture-container">
                    <img
                        :src="require('@/assets/img/avatar-default.png')"
                        alt="Profile Picture"
                        class="profile-picture"
                    >
                </div>
            </div>
        </section>

        <section class="profile-info">
            <section class="bio-container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                blanditiis odio, atque quas minima, reprehenderit molestiae
                itaque commodi nulla similique culpa! Amet repr repr ehenderit
                velit modi delectus consequuntur odit perferendis nemo?
            </section>

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
            <router-view/>
        </section>
    </div>
</template>

<script>
export default {
    
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
                top: 70px;
                position: absolute;
                margin-left: 50%;
                transform: translateX(-50%);
                z-index: 2;

                @include mobile {
                    min-width: 80%;
                }
                
                .profile-name, .profile-type {
                    color: #fff;
                    text-shadow: 2px 2px 5px #474747;
                }

                .profile-name {
                    font-size: 28px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #fff;
                    margin-bottom: px;
                }

                .profile-type {
                    font-size: 18px;
                }

            }
        }

        .picture-wrapper {
            position: absolute;
            top: 180px;
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
                width: 180px;
                height: 180px;
                overflow: hidden;
                border-radius: 50%;

                .profile-picture {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
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

        @include mobile {
            min-width: unset;
            padding-top: 130px;
        }

        .bio-container {
            width: 50%;
            margin: 0 auto;
            line-height: 28px;
            padding: 25px 0;
            min-width: 590px;

            @include mobile {
                min-width: unset;
                width: 100%;
                padding: 0 20px 15px 20px;
            }
        }

        .profile-nav {
            width: 100%;
            border-top: 1px solid #ececec;

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
                        color: #DA5555;

                        .nav-icon {
                            filter: unset;
                        }
                    }

                    @include mobile {
                        .nav-title {
                            display: none;
                        }
                    }
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
    }
}
</style>