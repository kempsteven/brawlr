<template>
    <div>
        settings page
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
    methods: {
        logout () {
            this.$store.dispatch('authentication/logOut')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>