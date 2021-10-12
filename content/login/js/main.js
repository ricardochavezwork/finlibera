
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check){
          login(function(success, errorSms){
            if(success){
              console.log("Login successfull!");
              $('.wrap-login100').toggleClass('animated bounceOutUp delay-2s');
              setTimeout(function(){
                var email = $( ".email-field" ).val();
                $('.wrap-login100').remove();
                $('.wellcome-sms__hide').find('span').html('Ciao ' + email + '!');
                $('.wellcome-sms__hide').addClass('wellcome-sms animated bounceInDown').removeClass('wellcome-sms__hide');
                setTimeout(function(){
                  window.location.href = '/_gestione/';
                }, 1000);
              }, 1000);
            }else{
              console.log("Login failed!");
              $('.wrap-login100').toggleClass('animated shake faster');
              showValidate(input);
              check=false;
              alert(errorSms);
            }
          }, function(){
            $('.wrap-login100').toggleClass('animated infinite bounce faster delay-2s');
          }, function(){
            $('.wrap-login100').toggleClass('animated infinite bounce faster delay-2s');
          });
        }
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        /*if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {*/
            if($(input).val().trim() == ''){
                return false;
            }
        //}
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function login(callback, start, stop){
      try {
        var self = this;

        if(!callback)
          throw new TypeError('login - callback undefined!');

        var email = $( ".email-field" ).val();
        var psw = $(".psw-field").val();

        var params = {
          user : email,
          psw : psw
        }

        var clone = encodeURIComponent(JSON.stringify(params));
        $.ajax({
            method: "POST",
            url: '/_gestione/login/?action=login',
            data: { data : clone },
            beforeSend : start,
            complete : stop
        }).done(function(res){
          if(res && res.success){
            callback(res.success);
          }else {
            var errorSms = res.errorSms ? res.errorSms : 'Errore imprevisto. Richiedere assistenza';
            callback(res.success, errorSms);
          }
        });

      } catch (e) {
        console.log(e.message);
      }
    }



})(jQuery);
