$.ajaxSetup(
    {
        //options.url='http://192.168.11.43:1212'+options.url;
        //dataType: 'jsonp',
    }
);
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    let customPage={
        'api':'modulePath'
    };
    if(customPage[options.url]){
        options.success({moduleName:customPage[options.url]});
        jqXHR.abort();//终止ajax请求
    }else{
        options.url = "/api" + options.url;
    }
});
window.system_path='/snc-system';

