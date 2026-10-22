<template>
    <div :class="wrapperClass">
        <label :for="id" class="form-label">{{ label }}</label>
        <div class="input-group">
            <input
                :id="id"
                :type="visible ? 'text' : 'password'"
                :value="modelValue"
                :autocomplete="autocomplete"
                :minlength="minlength || null"
                :placeholder="placeholder"
                :required="required"
                class="form-control"
                @input="$emit('update:modelValue', $event.target.value)"
            >
            <button
                type="button"
                class="btn btn-outline-secondary password-toggle"
                :aria-label="visible ? 'Ẩn ' + label.toLowerCase() : 'Hiện ' + label.toLowerCase()"
                :aria-pressed="visible"
                @click="visible = !visible"
            >
                {{ visible ? 'Ẩn' : 'Hiện' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: String, required: true },
        label: { type: String, required: true },
        modelValue: { type: String, default: '' },
        autocomplete: { type: String, default: 'current-password' },
        placeholder: { type: String, default: '' },
        minlength: { type: Number, default: null },
        required: { type: Boolean, default: false },
        wrapperClass: { type: String, default: 'mb-3' }
    },

    emits: ['update:modelValue'],

    data() {
        return { visible: false }
    }
}
</script>
