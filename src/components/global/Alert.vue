<template>
    <div class="alert-bg" @click.self="$emit('bgClick')">
        <div class="alert-container">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.alert-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 100vw;
    height: 100vh;

    .alert-container {
        background-color: #fff;
        padding: 15px;
        box-shadow: 0 0 3px #00000029;
        border-radius: 3px;
        color: #fff;

        @include mobile {
            min-width: unset;
            width: 96%;
        }
    }
}
</style>