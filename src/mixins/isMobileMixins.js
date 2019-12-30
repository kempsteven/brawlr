export default {
    data() {
        return {
            windowWidth: 0
        }
    },

    async created() {
        await this.setWindowWidthListener()
        await this.isMobileViewWidth()
    },

    destroyed() {
        this.removeWindowWidthListener()
    },

    computed: {
        isMobileViewPort () {
            return this.windowWidth <= 768
        },

        transitionAnim () {
            return this.isMobileViewPort ? '_transition-fixed' : ''
        }
    },

    methods: {
        /* Mounted Lifecycle Methods */
        setWindowWidthListener() {
            this.windowWidth = window.innerWidth

            window.addEventListener('resize', this.onWindowResize)
        },

        onWindowResize() {
            this.windowWidth = window.innerWidth
        },

        isMobileViewWidth() {
            if (
                this.windowWidth > 768
                && this.$route.name !== 'message-view'
            ) {
                this.$router.push('/messages/view')
            }
        },

        /* Destroyed Lifecycle Methods */
        removeWindowWidthListener() {
            window.removeEventListener('resize')
        }
    }
}