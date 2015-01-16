//音乐控制
$('.music_control').click(function() {
    if ($(this).hasClass('close')) {
        $('#bgm')[0].play();
        $(this).addClass('play').removeClass('close');
        $(this).find('p').text('开启').addClass('fadeIn');
    } else if ($(this).hasClass('play')) {
        $('#bgm')[0].pause();
        $(this).removeClass('play').addClass('close');
        $(this).find('p').text('关闭').addClass('fadeIn');
    }
    setTimeout(function() {
        $('.music_control').find('p').removeClass('fadeIn');
    }, 1000)
})