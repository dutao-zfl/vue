define([
        'jquery',
        'underscore',
        'backbone',
        'publicModel',
    ],
    function ($, _, Backbone,publicModel) {

        var model = publicModel.extend({
            defaults: _.extend({},(new publicModel).defaults,{
                showPage: false,
                showTitle:false,
                title:'',
                search:[],
                btn:[],
                grid:{
                    gridid: 'user_paging',
                    pageSize: 10,
                    checkbox: true,
                    showTableTop: true,
                    async: true,
                    searchCondition: {},
                    url:'',
                    column: [{
                        colkey: "name",
                        name: "",
                    }, {
                        colkey: "resKey",
                        name: "",
                    }, {
                        colkey: "type",
                        name: "",
                        /*renderData : function(rowindex, data, rowdata, colkey) {
                         return '<a href="javascript:void(0)" class="modifyForm" user-id="' + rowdata.id +  '">'+data+'</a>';
                         }*/
                    }]
                }
            })
        });

        return model;

    });