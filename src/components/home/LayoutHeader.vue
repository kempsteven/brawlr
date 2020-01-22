<template>
    <div class="layout-header">
        <router-link
            to="/profile"
            @click.native="returnToTop()"
        >
            <img
                class="brawlr-icon"
                :src="require('@/assets/img/brawlr-icon.png')"
                alt="Brawlr Icon"
            >
        </router-link>

        <section class="navigation-link">
            <router-link
                class="nav-item"
                to="/profile"
                :class="{ 'active' : $route.path === '/profile' }"
                @click.native="returnToTop()"
            >
                <div class="nav-icon profile"/>

                <span class="item-title">
                    Profile
                </span> 
            </router-link>

            <router-link
                class="nav-item"
                to="/fighters"
                :class="{ 'active' : $route.path === '/fighters' }"
                @click.native="returnToTop()"
            >
                <div class="nav-icon fighter"/>

                <span class="item-title">
                    Fighters
                </span> 
            </router-link>

            <router-link
                class="nav-item"
                to="/messages"
                :class="{ 'active' : $route.path === '/messages' }"
                @click.native="returnToTop()"
            >
                <div class="nav-icon message"/>

                <span class="item-title">
                    Messages
                </span> 
            </router-link>
        </section>
    </div>
</template>

<script>
export default {
    methods: {
        returnToTop () {
            document.body.scrollTo(0, 0)
        }
    },
}
</script>

<style lang="scss" scoped>
.layout-header {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 5px #3a3a3a;
    // position: fixed;
    z-index: 11;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    left: 0;

    @include mobile {
        justify-content: center;
    }

    .brawlr-icon {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        cursor: pointer;

        @include mobile {
            display: none;
        }
    }

    .navigation-link {
        display: flex;

        @include mobile {
            width: 90%;
            justify-content: space-between;
        }

        .nav-item {
            display: flex;
            font-size: 18px;
            transition: 0.3s;
            align-items: center;
            flex-shrink: 0;

            &.router-link-active {
                .item-title {
                    color: $red;
                }

                .nav-icon {
                    filter: unset;
                }
            }

            &:not(:last-child) {
                margin-right: 15px;
            }

            @include mobile {
                &:not(:last-child) {
                    margin-right: unset;
                }
            }

            .nav-icon {
                width: 28px;
                height: 28px;
                margin-right: 5px;
                background-repeat: no-repeat;
                background-size: cover;
                filter: grayscale(100%);
                transition: 0.3s;
                pointer-events: none;

                &.profile {
                    background-image: url('~@/assets/img/icon/profile-icon.png');
                }

                &.fighter {
                    background-image: url('~@/assets/img/icon/fighter-icon.png');
                }

                &.message {
                    background-image: url('~@/assets/img/icon/message-icon.png');
                }

                @include mobile {
                    width: 41px;
                    height: 41px;
                    margin-right: 0;
                }
            }

            .item-title {
                pointer-events: none;
                display: block;    

                @include mobile {
                    display: none;
                }
            }
        }
    }
}
</style>