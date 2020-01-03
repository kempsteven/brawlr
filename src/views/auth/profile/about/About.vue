<template>
    <div class="about">
        <image-container />
        
        <button class="_cancel" @click="toggleEditAboutForm()">
            Edit
        </button>

        <section class="about-info">
            <section class="info-item">
                <h4 class="item-title">
                    About you:
                </h4>

                <textarea
                    class="item-value-area"
                    v-bind="$attrs"
                    :value="user.bio"
                    readonly
                />
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Age:
                </h4>

                <div class="item-value">
                    {{ `${user.age} Year(s) Old` }}
                </div>
            </section>


            <section class="info-item">
                <h4 class="item-title">
                    Fighter Type:
                </h4>

                <div class="item-value">
                    {{ user.fighterType | null }}
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Location:
                </h4>

                <div class="item-value">
                    {{ user.location ? user.location.value : '-'}}
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Gender:
                </h4>

                <div class="item-value">
                    {{ user.gender ? user.gender.value : '-'}}
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    School/Company Name:
                </h4>

                <div class="item-value">
                    {{ user.organization | null }}
                </div>
            </section>
        </section>

        <transition name="_transition-fixed">
            <modal v-if="modalName.includes('about-form')">
                <about-form slot="content"/>
            </modal>
        </transition>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
    computed: {
        ...mapFields('modal',[
            'modalName',
        ]),

        ...mapFields('user', [
            'user'
        ])
    },

    methods: {
        toggleEditAboutForm () {
            this.$store.commit('modal/toggleModal', {
                modalName: 'about-form'
            })
        }
    },

    components: {
        ImageContainer: () => import('@/components/profile/about/ImageContainer'),
        AboutForm: () => import('@/components/profile/about/AboutForm'),
        Modal: () => import('@/components/global/Modal')
    },
}
</script>

<style lang="scss" scoped>
.about {
    flex-direction: column;
    
    ._cancel {
        align-self: flex-end;
    }

    .about-info {
        margin-top: 25px;

        .info-item {
            text-align: left;

            &:not(:last-child) {
                margin-bottom: 15px;
            }

            .item-title {
                margin-bottom: 10px;
            }

            .item-value {
                padding: 15px 10px;
                background: #f8f8f8;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 15px;
            }

            .item-value-area {
                padding: 15px 10px;
                background: #f8f8f8;
                border: 1px solid #ddd;
                border-radius: 5px;
                width: 100%;
                height: 200px;
                resize: none;
                outline: none;
                font-size: 15px;
            }
        }
    }
}
</style>