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

        data(){
            return {
                id:this.$route.params.id
            }
        },
        components: {
            TreeRender
        },
        watch:{
            $route(){
                this.id=this.$route.params.id
            }
        },
        computed: {
            data(){
                return this.$store.state.data
            },
            menus(){
                let id = this.id;
                console.log(1);
                let menu = this.data.filter(
                    function (v) {
                        return v.id == id
                    }
                );
                return menu && menu[0] && menu[0].children
            }
        },
    }
</script>