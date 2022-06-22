<template>
    <section class="contact-details">
        <h1>{{ contact.name }}</h1>
    </section>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">
.contact-details {
    color: white;
    font-size: 1.2rem;
    width: 100%;
    align-self: center;
    margin-inline-start: 10px;
}
</style>