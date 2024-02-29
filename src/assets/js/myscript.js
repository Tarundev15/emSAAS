
$(".otpInput input[type=text]").keyup(function () {
  if (this.value.length == 0) {
    $(this).blur().parent().prev().children('input[type=text]').focus();
    $(this).blur().prev('input[type=text]').focus();
  }
  else if (this.value.length == this.maxLength) {
    $(this).blur().parent().next().children('input[type=text]').focus();
    $(this).blur().next('input[type=text]').focus();
  }
});


$(".configration").click(function () {
  //$("#divID").slideToggle('slow');
  // $(this).html('<img src="images/wrench-icon.svg" />Configuration');
  //$('.configSection').toggleClass('active');
});


$(".iconBox").on("click", function () {
  $(".configSection").toggleClass('active');
  $("#divID").slideToggle('slow');
  $(".sideBar").toggleClass("show-sidebar", 500);
  // $(".sideBarMenu ul li span").toggle();
  // $(".fastLogo").hide();
  // $("this").show();
  $('body').toggleClass('hide-sidebar');
  console.log('test');
});

$(".three-dox").on("click", function () {
  $(this).parent().parent().toggleClass('active');
});
$(".filter-div").on("click", function () {
  $(this).parent().toggleClass('active');
  $(this).addClass('active');
});

$(".search-container").on("click", function () {
  $(this).parent().toggleClass('active');
  $(this).addClass('active');
});


$(".apply").on("click", function () {
  $(this).parent().parent().removeClass('active');
  $(".search-container").removeClass('active');
  $(".filter-div").removeClass('active');
  $('.open-popup-div').removeClass('active');
});
