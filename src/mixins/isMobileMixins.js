export default {
    data() {
        return {
            windowWidth: 0
        }
    },

    async created() {
        await this.setWindowWidthListener()
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

        /* Destroyed Lifecycle Methods */
        removeWindowWidthListener() {
            window.removeEventListener('resize', this.onWindowResize)
        }
    }
}