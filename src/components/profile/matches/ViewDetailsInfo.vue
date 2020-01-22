<template>
    <div class="main-view-details">
        <section class="main-details">
            <span class="detail-item">
                <h4 class="item-title">
                    Name:
                </h4>

                <span class="item-value">
                    {{ `${viewDetailsObject.firstName} ${viewDetailsObject.lastName}` }}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Age:
                </h4>

                <span class="item-value">
                    {{ viewDetailsObject.age }}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Fighter Type:
                </h4>

                <span class="item-value">
                    {{ viewDetailsObject.fighterType | null }}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Location:
                </h4>

                <span class="item-value">
                    {{ viewDetailsObject.location ? viewDetailsObject.location.value : '-'}}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Gender:
                </h4>

                <span class="item-value">
                   {{ viewDetailsObject.gender ? viewDetailsObject.gender.value : '-'}}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    School / Company Name:
                </h4>

                <span class="item-value">
                    {{ viewDetailsObject.organization | null }}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Bio:
                </h4>

                <textarea
                    class="item-value-area"
                    :value="viewDetailsObject.bio | null"
                    ref="bioTextArea"
                    readonly
                />
            </span>
        </section>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
    mounted () {
        this.bioWatcher = this.$watch('viewDetailsObject.bio', (val) => {
            if (val !== '-' && val) {
                const bioTextArea = this.$refs.bioTextArea
                const scrollHeight = bioTextArea.scrollHeight

                bioTextArea.style.height = `${scrollHeight}px`
            }
        }, { immediate: true })
    },

    computed: {
        ...mapFields('match', [
			'viewDetailsObject',
		]),
    },
}
</script>

<style lang="scss" scoped>
.main-view-details {
    width: 100%;
    height: 100%;
    background: #fff;

    .main-details {
        display: flex;
        padding: 15px;
        flex-direction: column;
        width: 100%;

        .detail-item {
            width: 100%;
            display: flex;
            flex-direction: column;

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            .item-value {
                color: #888888;
            }

            .item-value-area {
                width: 100%;
                padding: 15px 0;
                text-align: left;
                border: 0;
                resize: none;
                outline: none;
            }
        }
    }
}
</style>