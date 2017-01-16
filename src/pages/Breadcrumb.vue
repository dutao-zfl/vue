<style lang="less" scoped>
    .Breadcrumb {
        position: absolute;
        top: 60px;
        left: 200px;
        right: 0;
        height: 60px;
        background: #00AFEF;
        overflow: hidden;
    }
</style>

<template>
    <div class="Breadcrumb">
        <span v-if="hash.id">{{hash.id}}</span>
        <router-link v-if="hash.key" :to="'/'+hash.id+'/'+hash.key">/{{hash.key}}</router-link>
    </div>
</template>

<script>
    module.exports = {
        computed: {
            hash(){
                let param = this.$route.params;
                return param
            },
            menu(){
                return this.$store.state.data
            }
        },
        methods: {}
    }
</script>