<template>
    <div class="message-area">
        <section class="message-list">

        </section>

        <section class="message-input-container">
            <input-field
                class="input-field"
                placeholder="Search Messages"
                type="text"
            />
        </section>
    </div>
</template>

<script>
import InputField from '@/components/global/InputField'

export default {
    components: {
        InputField  
    }
}
</script>

<style lang="scss" scoped>
.message-area {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .message-list {
        flex: 1 1 auto;
    }
}
</style>