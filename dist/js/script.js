$(function(){
    $(".button-contacts").hover(
        function(){
            $(this).parent().addClass("contacts-wrapper_margin");
        },
        function(){
            $(this).parent().removeClass("contacts-wrapper_margin");
        }
    );

    $("#petersburg-university").hover(function(){
        $('.img-petersburg').show();
    },function(){
        $('.img-petersburg').hide();
    });

    $("#travel-stars1, #travel-stars2").hover(function(){
        $('.img-work').show();
    },function(){
        $('.img-work').hide();
    });

    $("#gorky-institute").hover(function(){
        $('.img-university').show();
    },function(){
        $('.img-university').hide();
    });
    
    $("body").css("opacity", "1");
});