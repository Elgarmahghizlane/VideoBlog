<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 ">
        <div class="bg-white rounded-lg shadow-lg w-[50%] relative ">
            <div @click="closeModal"
                class="rounded-full p-1 text-sm bg-gray-200 flex items-end w-[2rem] absolute right-2 top-2 ">
                <Close />
            </div>
            <div class="m-4 p-4 text-lg">
                A confirmation email was sent to your address
            </div>
        </div>
    </div>
</template>
<script>
import Close from "./icons/CloseIcon.vue"
export default {
    components: {
        Close
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
}
</script>