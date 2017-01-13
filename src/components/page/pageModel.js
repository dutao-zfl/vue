/**
 * Created by Administrator on 2016/8/22 0022.
 */
define([
        'jquery',
        'underscore',
        'backbone'
    ],
    function ($, _, Backbone) {
        var model = Backbone.Model.extend({
            defaults: {
                savePage: system_path + '/config/saveTemplate.shtml',
                findPage: system_path + '/config/find_data.shtml',
                getList: system_path + '/config/findByPage.shtml?',
                resKey: '',
                isNav:false,
            }
        });

        return model;

    });