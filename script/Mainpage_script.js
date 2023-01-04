$(document).ready(function(){
function profile_section(){
      $("#profile_section").fadeIn();
     $("#profile_section").css({"visibility":"visible","display":"block"});

     $("#company_section").fadeOut();
     $("#company_section").css({"visibility":"hidden","display":"none"});

     $("#user_account_section").fadeOut();
     $("#user_account_section").css({"visibility":"hidden","display":"none"});

     $("#account_managment_section").fadeOut();
     $("#account_managment_section").css({"visibility":"hidden","display":"none"});
    }
    //Function to Hide Popup
    function company_section(){
    
        $("#company_section").fadeIn();
        $("#company_section").css({"visibility":"visible","display":"block"});

    $("#profile_section").fadeOut();
     $("#profile_section").css({"visibility":"hidden","display":"none"});

     $("#user_account_section").fadeOut();
     $("#user_account_section").css({"visibility":"hidden","display":"none"});
     
     $("#account_managment_section").fadeOut();
     $("#account_managment_section").css({"visibility":"hidden","display":"none"});
    
    }
    function user_account_section(){
    
      $("#user_account_section").fadeIn();
      $("#user_account_section").css({"visibility":"visible","display":"block"});

  $("#profile_section").fadeOut();
   $("#profile_section").css({"visibility":"hidden","display":"none"});

   $("#company_section").fadeOut();
   $("#company_section").css({"visibility":"hidden","display":"none"});
  
   $("#account_managment_section").fadeOut();
   $("#account_managment_section").css({"visibility":"hidden","display":"none"});
  }
  function account_managment_section(){
    
    $("#account_managment_section").fadeIn();
    $("#account_managment_section").css({"visibility":"visible","display":"block"});

$("#profile_section").fadeOut();
 $("#profile_section").css({"visibility":"hidden","display":"none"});

 $("#company_section").fadeOut();
 $("#company_section").css({"visibility":"hidden","display":"none"});

 $("#user_account_section").fadeOut();
 $("#user_account_section").css({"visibility":"hidden","display":"none"});

}
  

    var header = document.getElementById("change_nav_active");
    var btns = header.getElementsByClassName("change_active");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      });
      }
  
  
      var head= document.getElementById("navigation_active");
    var btn = head.getElementsByClassName("change_nav_active");
    for (var i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function() {
      var currents = document.getElementsByClassName("navigation_active");
      currents[0].className = currents[0].className.replace(" navigation_active", "");
      this.className += " navigation_active";
      });
      }
     
 
   $('.operation').click(function(){
     
    $('.do_operation').toggleClass('show_operation');
    });

    $('.action_btn').click(function(){
 
      $('.do_action').toggleClass('show_action');
      });

    });