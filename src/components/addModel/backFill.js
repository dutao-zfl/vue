/**
 * Created by Administrator on 2016/11/17 0017.
 */
define([
    'jquery',
    'underscore',
    'icheck'
],function($,_){

    return function(el,obj){
        var $el=el instanceof $?el:$(el);
        _.each(obj,function(val,key){
            var $inputs=$('[name="'+key+'"]',$el);
            if(_.isObject(val)||!$inputs.length){
                return;
            }
            $inputs.each(function(e){
                var $this=$(this);
                var nodeName=$this.prop('nodeName');
                if(nodeName==='SELECT'){
                    if($this.find('option[value="'+val+'"]').length>0){
                        if($this.data('select2')){
                            $this.select2('val',val);
                        }else{
                            $this.val(val)
                        }
                    }else{
                        if($this.data('select2')){

                        }else if(val){
                            $this.html('<option value="'+val+'">'+val+'</option>')
                        }
                    }
                }else if(nodeName==='INPUT'){
                    switch ($this.attr('type')){
                        case 'checkbox':
                            if($this.data('iCheck')){
                                val&&$this.iCheck('check')
                            }else{
                                $this.prop('checked',true);
                            }
                            break;
                        case 'color':
                        case 'text':
                        case 'hidden':
                            $this.val(val);
                            break;
                    }
                }else if(nodeName==='TEXTAREA'){
                    $this.val(val);
                }
            }).change();
        });
    }

})