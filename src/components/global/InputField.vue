<template>
    <div class="input-field">
        <h4 class="input-title" v-if="title">
            {{ title }}
        </h4>

        <input
            class="input-box"
            v-bind="$attrs"
            :value="value"
            :autocomplete="autoComplete ? true : 'new-password'"
            @input="$emit('input', $event.target.value)"
            @keydown="checkValue($event)"
            @paste="onPaste($event)"
            v-if="!inputType"
        >

        <textarea
            class="input-textarea"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keydown="checkValue($event)"
            @paste="onPaste($event)"
            v-if="inputType === 'textarea'"
        />

        <span class="limit-label" v-if="limit">
            {{ remainingCharacters }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },

        value: {
            default: ''
        },

        regex: {
            type: RegExp,
            default: null
        },

        inputType: {
            type: String,
            default: ''
        },

        autoComplete: {
            type: Boolean,
            default: false
        },

        limit: {
            type: Number,
            default: 0
        }
    },

    computed: {
        remainingCharacters () {
            return this.limit - `${this.value}`.length
        }
    },

    methods: {
        checkValue (event) {
            const keyCode = event.keyCode
            const inputTag = event.target
            const isBackSpace = keyCode == 8
            const isSelectAll = event.ctrlKey && keyCode === 65
            const isArrowKeys = [37, 38, 39, 40].includes(keyCode)
            let highlightedText

            if (window.getSelection) {
                try {
                    const activeElement = document.activeElement
                    
                    if (activeElement && activeElement.value) {
                        // firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
                        highlightedText = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
                    } else {
                        highlightedText = window.getSelection().toString();
                    }

                } catch (e) { }
            } else if (document.selection && document.selection.type != "Control") {
                highlightedText = document.selection.createRange().text;
            }

            // Handle limit
            if (
                this.limit !== 0
                && `${inputTag.value}`.length >= this.limit
                && !isBackSpace
                && !isSelectAll
                && inputTag.value !== highlightedText
                && !isArrowKeys
            ) {
                event.preventDefault()
            }
            
            // Handle regex
            if (this.regex !== null && !isBackSpace) {
                if (`${event.key}`.match(/[1-5]/g) === null) event.preventDefault()
            }
        },

        onPaste (event) {
            const inputTag = event.target
            const pastedData = event.clipboardData.getData('text/plain')
            const pastedAndCurrentValue = (`${inputTag.value}` + `${pastedData}`)

            // Handle limit for pasting
            if (
                this.limit !== 0 &&
                pastedAndCurrentValue.length > this.limit
            ) {
                event.preventDefault()
            }
        } 
    },
}
</script>

<style lang="scss" scoped>
.input-field {
    position: relative;
    display: flex;
    flex-direction: column;

    .input-title {
        display: block;
        text-align: left;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        height: 17px;
    }

    /* For Input Box */
    .input-box {
        padding: 8px 10px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 3px;

        &::placeholder {
            color: #c3c3c3;
        }
    }

    /* For Input Text Area */
    .input-textarea {
        padding: 8px 10px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 3px;
        outline: none;
        resize: none;
        flex: 1 1 auto;

        &::placeholder {
            color: #c3c3c3;
        }
    }

    .limit-label {
        margin-top: 5px;
        width: 100%;
        text-align: right;
        display: block;
    }
}
</style>