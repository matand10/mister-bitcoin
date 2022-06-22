<template>
    <div class="contact-filter">
        <input @input="onFilter" ref="filter" v-model="filterBy.txt" type="text" placeholder="Search someone">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },
    methods: {
        onFilter() {
            this.$emit('onFilter', this.filterBy)
        }
    },
    mounted() {
        this.$refs.filter.focus()
    }
}
</script>

<style lang="scss">
.contact-filter {
    background-color: rgb(59, 102, 131);
    color: beige;
    padding: 10px;

    & input {
        padding: 5px;
        width: 100%;
    }
}
</style>