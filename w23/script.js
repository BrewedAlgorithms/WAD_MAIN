$(function(){
  // Toggle achievements
  $(document).on('click','.toggle-achievements',function(){
    var $ul = $(this).siblings('.achievements');
    $ul.slideToggle(180);
    $(this).text($ul.is(':visible')? 'Hide Achievements':'View Achievements');
  });

  // Open image modal when clicking club image
  $(document).on('click','.club-img',function(){
    var src = $(this).attr('src');
    $('#modalImg').attr('src',src);
    $('#imgModal').fadeIn(120).attr('aria-hidden','false');
  });

  // Close modal
  $(document).on('click','.close-modal,#imgModal',function(e){
    if(e.target !== this) return; // prevent closing when clicking image
    $('#imgModal').fadeOut(120).attr('aria-hidden','true');
  });

  // prevent click on image from bubbling
  $(document).on('click','#modalImg',function(e){e.stopPropagation();});
});
