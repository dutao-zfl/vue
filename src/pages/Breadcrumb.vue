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
        <span v-for="item in showFind">
            <template v-if="item===showFind[showFind.length-1]">{{item}}</template>
            <template v-else="">{{item}}/</template>
        </span>
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
            },
            showFind(){
                let data=this.find(this.menu);
                console.log(data,this.$route);
                return data
            }
        },
        mounted(){
        },
        methods: {
            find(_data){
                var path=[];
                var data=_data||this.menu;
                for(var i=0;i<data.length;i++){
                    let relay=data[i];
                    if(relay.resKey===this.hash.key){
                        return [relay.name];
                    }else{
                        let childData=relay.children;
                        let childObj=childData&&childData.length&&this.find(childData);
                        if(childObj&&childObj.length){
                            path.push(relay.name);
                            path=path.concat(childObj);
                        }
                    }
                }
                return path
            }
        }
    }
</script>