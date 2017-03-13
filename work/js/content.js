/**
 * Created by hanshiqiang1 on 2017/2/21.
 */
/*$('#a1').click(function () {
    alert(1);
});*/
$(function () {
    /*$('#nav').delegate('.show','click',function () {
            var title=$(this).text().toLowerCase();
            // title!='about'?$('#mainContent').load('html/'+title+'.html'):'';
            $('#mainContent').load('html/'+title+'.html');

            $('#content').fadeIn();
    });*/
    //底部导航
    $('#nav .show').on('click',function () {
        // var title=$(this).text().toLowerCase();
        //导航切换
        ($('#container-navs ').children().length>1)?$('#container-navs li:last-child').remove():'';

        $('#content').scrollTop(0);

        var title=$(this).text();

        $('#container-navs').append('<li><small>>> </small><span>'+title+'</span></li>');
        //内容切换
        $('#mainContent').load('html/'+title+'.html');

        $('#content').fadeIn();
    });
    //关闭按钮
    $('#closeD').click(function () {
        $('#content').fadeOut();
        $('#mainContent').html('');
    });


});