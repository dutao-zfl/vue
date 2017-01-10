<template>
    <div id="a" class="fade2">
        你好，我是张三
        <img src="../static/img/hello.png">
    </div>
</template>


<script>
    $.ajax({
        url:'url',
        notSend:true,//表示不触发全局loading
        success:function () {
            //...do something
            $('#a').addClass('in')
        }
    })
</script>