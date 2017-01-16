<style lang="less">

</style>

<template>
    <div>
        <tree-render :list="menus" v-show="menus&&menus.length"></tree-render>
        <!--<tree :menus="menus"></tree>-->
        <router-view name="Breadcrumb"></router-view>
        <router-view name="RightBody"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import TreeRender from '../components/treeMenu/render.vue';

    export default {
        components: {
            TreeRender
        },
        computed: {
            data(){
                return this.$store.state.data
            },
            resKey(){
                return this.$route.params.id
            },
            menus(){
                let resKey = this.resKey;
                let menu = this.data.filter(
                    function (v) {
                        return v.resKey == resKey
                    }
                );
                return menu && menu[0] && menu[0].children
            }
        },
    }
</script>