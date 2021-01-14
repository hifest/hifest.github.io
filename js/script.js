
 const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controlsText: [
        '<img src="../icons/left.svg">',
        '<img src="../icons/right.svg">',
    ],
    controls: false,
    speed: 1100,
});


document.querySelector('.prev').addEventListener('click',function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click',function () {
    slider.goTo('next');
});






$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active ');
    
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })
}

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__btn');

//modal
    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
$('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thinks ,#order').fadeOut('slow')
});
$('.button_mini').each(function(i){
    $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
});
document.body.onload = function() {

    setTimeout(function(){ //код до прилоадера//
        var prelodaer = document.getElementById('page-preloader');
        if(!prelodaer.classList.contains('done'))
        {
            prelodaer.classList.add('done');
        }
    }, 300);

}

function validateForms(form){
$(form).validate({
    rules: {
        name: {
            required: true,
        },
        phone: "required",
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        name: "Введите,пожалуйста свое имя",
        phone: "Введите свой номер телефона",
        email: {
          required: "Введите свой email ",
          email: "Неправильний email"
        }
      }
});
}
validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');


$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thinks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});
//scroll
$(window).scroll(function(){
    if($(this).scrollTop() > 1300){
        $('.pageup').fadeIn();

    }else{
        $('.pageup').fadeOut();
    }
});
$("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});