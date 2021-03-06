<template>
    <section class="matches">
        <section class="match-container">
            <transition name="_transition-anim">
                <loading v-if="matchListLoading"/>

                <empty-state
                    key="1"
                    :text="emptyStateText"
                    v-else-if="isMatchesAvailable"
                />

                <section class="match-list" key="2" v-else>
                    <section
                        class="match-item"
                        v-for="(match, key) in matchList"
                        :key="key"
                    >
                        <section class="img-wrapper">
                            <section class="img-container">
                                <div class="overlay" />

                                <img
                                    class="user-image"
                                    :src="getUserImage(match)"
                                    alt="User Image"
                                >
                            </section>
                        </section>

                        <section class="primary-info" @click="viewDetails(match)">
                            <h4 class="name">
                                {{ fullName(match) }}
                            </h4>

                            <h5 class="fighter">
                                {{ match.fighterType | null }}
                            </h5>
                        </section>

                        <button class="_primary" @click="unMatch(match)"/>
                    </section>
                </section>
            </transition>
        </section>

        <paginate
            :class="{ 'disabled' : matchListLoading }"
            :page-count="totalPages"
            :click-handler="changePage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :page-range="pageRange"
        />

        <transition name="_transition-anim">
			<modal
				class="view-details-container"
				v-if="modalName.includes('view-details-modal')"
			>
				<view-details slot="content" @close="closeViewDetails()"/>
			</modal>
		</transition>
    </section>
</template>

<script>
import * as match from '@/store/match/'
import { mapFields } from 'vuex-map-fields'
import isMobileMixins from '@/mixins/isMobileMixins'

export default {
    beforeCreate () {
        if (!this.$store._modulesNamespaceMap['match/']) {
            this.$store.registerModule('match', match.default)
		}
    },

    created () {
        if (!this.online) return

        this.getMatchList()
    },

    destroyed () {
        this.clearMatchList()
    },

    computed: {
		...mapFields('match', [
			'matchList',
            'matchListLoading',
            'matchListPagination.page',
            'matchListPagination.hasNextPage',
            'matchListPagination.totalPages',

            'viewDetailsObject'
        ]),
        
		...mapFields('modal', [
            'modalName',
        ]),

        ...mapFields('user', [
            'user'
        ]),

        ...mapFields('connection-status', [
            'online'
        ]),

        emptyStateText () {
            return this.online ? 'No matches available yet.' : 'No internet connection.'
        },

        isMatchesAvailable () {
            return this.matchList && !this.matchList.length && !this.matchListLoading
        },

        pageRange () {
            if (this.isMobileViewPort) {
                return 2
            }

            return 4
        }
    },
    
    methods: {
        /* Created Lifecyle Methods */
        getMatchList () {
            this.$store.dispatch('match/getMatchList')
        },

        /* Unmatch Methods */
        unMatch (match) {
            const form = new FormData()
            
            form.append('userId', match._id)

            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to unmatch this user?',
                storeAction: 'match/unMatch',
                storePayload: { form, shouldGetMatchList: true }
            })
        },

        /* Change Page Method */
        changePage (page) {
            this.page = page

            this.getMatchList()
        },

        /* View Match Details */
        viewDetails (userDetails) {
            this.$store.commit('modal/toggleModal', {
                modalName: 'view-details-modal',
            })

            this.viewDetailsObject = userDetails
        },

        /* Close View Details */
		closeViewDetails () {
			this.viewDetailsObject = {}
            this.$store.dispatch('modal/closeModal', {})
		},

        /* Template Methods */
        getUserImage (match) {
            if (!match || match.profilePictures.every(x => x.image === null)) return require('@/assets/img/avatar-default.png')

            const picture = match.profilePictures.find(x => x.image !== null)

            return picture.image.url
        },

        fullName (match) {
            if (!match.firstName || !match.lastName) return null

            return `${match.firstName} ${match.lastName}`
        },

        /* Destroyed Lifecycle Methods */
        clearMatchList () {
            this.$store.commit('match/clearMatchList')
        }
    },

    components: {
        Paginate: () => import('vuejs-paginate'),
        Loading: () => import('@/components/global/Loading'),
        EmptyState: () => import('@/components/global/EmptyState'),
        Modal: () => import('@/components/global/Modal'),
        ViewDetails: () => import('@/components/profile/matches/ViewDetails')
    },

    mixins: [ isMobileMixins ]
}
</script>

<style lang="scss" scoped>
.matches {
    width: 100%;
    flex-wrap: wrap;

    .match-container {
        width: 100%;
        padding-bottom: 88%;
        position: relative;
        margin-bottom: 15px;

        @include mobile {
            padding-bottom: 161%;
        }

        .match-list {
            width: 100%;
            // height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-items: flex-start;
            align-items: flex-start;
            position: absolute;

            .match-item {
                width: 23.5%;
                padding-bottom: 28%;
                box-shadow: 0 1px 5px #e4e4e4;
                border-radius: 8px;
                position: relative;
                margin-bottom: 2%;

                &:not(:nth-child(4n)) {
                    margin-right: 2%;
                }

                @include mobile {
                    width: 31%;
                    padding-bottom: 38%;
                    margin-bottom: 3%;
                    margin-right: 0%;

                    &:not(:nth-child(4n)) {
                        margin-right: 0;
                    }

                    &:not(:nth-child(3n)) {
                        margin-right: 3.5%;
                    }
                }

                .img-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: 8px;
                    position: absolute;

                    .img-container {
                        position: relative;
                        width: 100%;
                        height: 100%;

                        .overlay {
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.1);
                            position: absolute;
                            z-index: 2;
                        }

                        .user-image {
                            z-index: 1;
                            min-width: 100%;
                            height: 100%;
                            position: absolute;
                            margin-left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }

                .primary-info {
                    position: absolute;
                    left: 0px;
                    bottom: 0;
                    padding: 0 10px 10px 10px;
                    width: 100%;
                    z-index: 3;
                    cursor: pointer;

                    h4, h5 {
                        color: #ffffff;
                        text-align: left;
                        text-shadow: 0px 1px 7px #828282;
                        text-transform: capitalize;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;

                        @include mobile {
                            font-size: 12px;
                        }
                    }

                    .name {
                        padding-bottom: 2px;
                        margin-bottom: 2px;
                        border-bottom: 1px solid #fff;
                        max-width: 100%;
                    }
                }

                ._primary {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    padding: 2px;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    font-size: 12px;
                    min-width: unset;
                    z-index: 4;

                    &:after {
                        content: '\2716'
                    }
                }
            }
        }
    }

    .disabled {
        pointer-events: none;
    }

    .pagination {
        display: flex;
        justify-content: flex-end;
        width: 100%;

        @include mobile {
            justify-content: center;
        }

        /deep/li {
            border: 1px solid #ddd;
            border-radius: 3px;
            text-align: center;
            user-select: none;
            transition: 0.3s;

            &:not(:last-child) {
                margin-right: 5px;
            }

            &.disabled {
                opacity: 0.8;
                pointer-events: none;
            }

            &.active, &:hover {
                background: $red;

                a {
                    color: #fff;
                }
            }
            

            a {
                display: block;
                min-width: 40px;
                padding: 10px;
                user-select: none;
                outline: none;

                @include mobile {
                    font-size: 12px;
                }
            }
        }
    }

    .view-details-container {
		/deep/.modal-container {
			padding: 0;
			background: none;
			box-shadow: 0 1px 5px #aaaaaa;
			border: 0;

			@include mobile {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>