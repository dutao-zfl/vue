<style lang="less">

</style>

<template>
    <div>
    </div>
</template>

<script>
    import modelAnalyze from 'modelAnalyze'
    export default {
        props: ['model'],
        data(){
            return {model: this.model}
        },
        watch: {
            model(){
                this.rest;
            }
        },
        mounted(){
            this.rest;
        },
        computed: {
            rest(){
                modelAnalyze(_.extend({
                    el:$(this.$el),
                    resKey:'',
                    appendParam:{}
                },this.model))
            }
        },
    }
</script>