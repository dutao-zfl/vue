define([
        'jquery',
        'underscore',
        'backbone'
    ],
    function ($, _, Backbone) {

        var model = Backbone.Model.extend({
            defaults: {
                bindModel:'',//绑定的模块实例映射
                sendBefore:function(bindModel){return {}},//请求发送前的处理方法，返回请求参数模版data对象
                type:'',//按钮类型：onlyRequest,pageOpen,windowOpen
                url:'',//请求地址：页面或者接口
                param:'',//请求参数模版：a=<%=p1%>&b=<%=p2%>
                text:'',//按钮文本

                //onlyRequest
                backDesc:'',//请求返回描述信息：如backDesc='注册',x+成功,x+失败

                //pageOpen
                contentId:'',//页面容器元素id

                //windowOpen
                width:'',//窗口宽度
                height:'',//窗口高度



            }
        });

        return model;

    });