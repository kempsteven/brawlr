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

                <div class="item-value" v-pre>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br><br>
                    Cupiditate aliquam laudantium error odio tempora, odit<br><br>
                    quam vel omnis cumque id.
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Age:
                </h4>

                <div class="item-value" v-pre>
                    99 Years Old
                </div>
            </section>


            <section class="info-item">
                <h4 class="item-title">
                    Fighter Type:
                </h4>

                <div class="item-value" v-pre>
                    Lorem ipsum dolor
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Location:
                </h4>

                <div class="item-value" v-pre>
                    Lorem ipsum
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    Gender:
                </h4>

                <div class="item-value" v-pre>
                    Lorem ipsum
                </div>
            </section>

            <section class="info-item">
                <h4 class="item-title">
                    School/Company Name:
                </h4>

                <div class="item-value" v-pre>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
import ImageContainer from '@/components/profile/about/ImageContainer'
import AboutForm from '@/components/profile/about/AboutForm'
import Modal from '@/components/global/Modal'

import { mapFields } from 'vuex-map-fields'
export default {
    computed: {
        ...mapFields('modal',[
            'modalName',
        ]),
    },

    methods: {
        toggleEditAboutForm () {
            this.$store.commit('modal/toggleModal', {
                modalName: 'about-form'
            })
        }
    },

    components: {
        ImageContainer,
        AboutForm,
        Modal
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
            }
        }
    }
}
</style>