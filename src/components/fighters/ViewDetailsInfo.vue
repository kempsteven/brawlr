<template>
    <div class="message-view-details">
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
                    {{ viewDetailsObject.figterType }}
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
                    {{ viewDetailsObject.organization }}
                </span>
            </span>

            <span class="detail-item">
                <h4 class="item-title">
                    Bio:
                </h4>

                <span class="item-value">
                    {{ viewDetailsObject.bio }}
                </span>
            </span>
        </section>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
    computed: {
        ...mapFields('match', [
			'viewDetailsObject',
		]),
    },
}
</script>

<style lang="scss" scoped>
.message-view-details {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fff;

    .main-details {
        display: flex;
        padding: 15px;
        flex-direction: column;

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
        }
    }
}
</style>