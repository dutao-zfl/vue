<style lang="less" scoped>
    .rightBody {
        position: absolute;
        left: 200px;
        right: 0;
        overflow: auto;
        top: 120px;
        bottom: 0;
    }
</style>

<template>
    <div class="rightBody">
        {{hash.key}}
        <page-render :model="model"></page-render>
    </div>
</template>

<script>
    import pageRender from '../components/page/render.vue'
    module.exports = {
        /*data(){
            return {model:{
                "appendParam": {},
                "isOption": false,
                "showTitle": true,
                "showPage": true,
                "title": "组件管理",
                "btn": [{
                    "btnId": "ivhpqppd30",
                    "type": "pageOpen",
                    "url": "/config/addUI.shtml",
                    "param": "",
                    "text": "新增",
                    "position": "",
                    "backDesc": "",
                    "width": "",
                    "height": ""
                }, {
                    "btnId": "ivhpt17s62",
                    "type": "pageOpen",
                    "url": "/config/addUI.shtml",
                    "param": "ALL",
                    "text": "修改",
                    "position": "",
                    "backDesc": "",
                    "width": "",
                    "height": ""
                }, {
                    "btnId": "ivhpvf6469",
                    "type": "onlyRequest",
                    "url": "/config/deleteEntity.shtml",
                    "param": "ids=<%=id%>",
                    "text": "删除",
                    "position": "",
                    "backDesc": "删除",
                    "width": "",
                    "height": ""
                }],
                "grid": {
                    "gridid": "user_paging",
                    "showTableTop": true,
                    "pageSize": "10",
                    "checkbox": true,
                    "async": true,
                    "searchCondition": {},
                    "url": "",
                    "column": [{
                        "colkey": "name",
                        "name": "组件名称",
                        "hide": false,
                        "width": "",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": []
                    }, {
                        "colkey": "alias",
                        "name": "功能引用",
                        "hide": false,
                        "width": "",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": []
                    }, {
                        "colkey": "resKey",
                        "name": "组件mid",
                        "hide": false,
                        "width": "",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": []
                    }, {
                        "colkey": "type",
                        "name": "组件类型",
                        "hide": false,
                        "width": "",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": []
                    }]
                },
                "type": "table",
                "data_type": "dataurl",
                "dataSQLSelect": "snc_amp_43",
                "porject_path": "system_path",
                "url": "/config/findByPage.shtml",
                "reslists": "",
                "name": "添加组件",
                "mid": "xin_mm",
                "alias": "系统管理-系统基础管理-添加组件"
            }}
        },*/
        computed: {
            hash(){
                return this.$route.params
            },
            model(){
                return {
                    resKey:this.hash.key
                }
            }
        },
        components:{
            pageRender
        }
    }
</script>