<template>
    <div id="unknown-type-popup">
        <div class="wq-card card">
            <div class="card-header">
                Unknown Feature Type
            </div>
            <div class="card-title font-avenir">
                Site: {{feature.properties.description}}
            </div>
            <div class="card-subtitle font-avenir">
                ID: {{feature.id}}
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'UnknownTypePopup',
        props: ['feature'],
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>
<style scoped>
    .wq-card {
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
</style>
