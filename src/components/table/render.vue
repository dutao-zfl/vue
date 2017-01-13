<style lang="less">

</style>

<template>
    <div>

    </div>
</template>

<script>
    import view from './view';
    import model from './model';
    module.exports = {
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
                new view({
                    el: this.$el,
                    model: new model(this.model)
                })
            }
        },
    }
</script>