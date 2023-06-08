<template>
    <div class="container-fluid background_color h-100 montserat-font">
        <div>
            <div class="row">
                <div class="col-12">
                    <div class="ml-2 my-auto">
                        <img class="swimmer-icon float-left mt-2" src="@/assets/images/swimmer_icon_white.png">
                        <h1 class="htb-text display-4 text-center text-white">HOW'S THE BEACH?</h1>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center mt-4"><h1>We've encountered an error with the request.</h1></div>
            </div>
            <div class="row">
                <div class="col-12 text-left mt-4"><h1>Response Code: {{status_code_display}}</h1></div>
            </div>
            <div class="row">
                <div class="col-12 text-left"><h1>Error Message: {{error_message_display}}</h1></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ErrorPage',
        props: ['error_message', 'status_code'],
        data() {
            return {
                status_code_data: '',
                error_message_data: ''
            }
        },
        mounted() {
            //let vm = this;
            console.debug("ErrorPage mounted.");

            //We aren't passing the props in the vue route path, so we check the params to then set the properties.
            this.status_code_data = this.status_code;
            this.error_message_data = this.error_message;
            if ('params' in this.$route) {
                if ('status_code' in this.$route.params) {
                    this.status_code_data = this.$route.params.status_code;
                }
                if ('error_message' in this.$route.params) {
                    this.error_message_data = this.$route.params.error_message;
                }
            }
        },
        computed: {
            status_code_display() {
                return(self.status_code_data);
            },
            error_message_display() {
                return(self.error_message_data);
            }

        }
    }
</script>
<style scoped>
    .swimmer-icon {
        width: 50px;
        height: 50px;
        margin-left: 25px;
    }
    .htb-text
    {
        margin-right: 25px;
    }

</style>
