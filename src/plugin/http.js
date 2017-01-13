define(
    [
        'jquery',
        'underscore',
    ],
    function($) {
        "use strict";

        var http = {
            del: function(url) {
                return $.ajax({
                    cache: false,
                    url: url,
                    type: 'DELETE'
                });
            },
            get: function(url, params) {
                return $.ajax({
                    url: url,
                    type: 'GET',
                    data: _.extend({_now: _.now()},params),
                    dataType: 'json'
                });
            },
            post: function(url, data, async,dataType,append) {
            	var isAsync = true;
            	if(async!==undefined&&async!=='') {
            		isAsync = async;
            	}
                return $.ajax($.extend({
                    cache: false,
                    type: 'POST',
                    url: url,
                    data:  _.extend({_now: _.now()},data),
                    async : isAsync,
                    dataType:dataType||'json'
                },append));
            }
        };

        return http;
    }
);
