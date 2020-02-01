<template>
    <div class="empty-state">
        <img 
            class="empty-icon" 
            :src="icon" 
            alt="Brawlr Empty Icon"
        >

        <h2 class="state-label">
            {{ text }}
        </h2>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: require('@/assets/img/icon/empty-icon.png')
        },

        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.empty-state {
    background-color: #f9f9f9;
    // background-color: #d6d6d6;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    position: absolute;

    @include flex-box(center, center, column);

    .empty-icon {
        flex-shrink: 0;
        width: 150px;
        margin-bottom: 35px;

        @include mobile {
            width: 80px;
        }
    }

    .state-label {
        // color: #fff;

        color: #949494;

        @include mobile {
            font-size: 18px;
        }
    }
}
</style>