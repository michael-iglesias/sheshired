function mainmenu(){
  "use strict";
  jQuery("#main-menu ul:first li").hover(function(){
    jQuery(this).find('ul:first').stop().fadeIn('slow');
  },function(){
    jQuery(this).find('ul:first').stop().fadeOut('fast');
  });
}

function applyIso(){
  "use strict";
  jQuery("div.portfolio-container").css({overflow:'hidden'}).isotope({itemSelector : '.isotope-item'});
}

function animateSkillBars(){
  "use strict";
  var applyViewPort = ( jQuery("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
  jQuery('.progress'+applyViewPort).each(function(){
    var progressBar = jQuery(this),
        progressValue = progressBar.find('.bar').attr('data-value');
    
    if (!progressBar.hasClass('animated')) {
      progressBar.addClass('animated');
      progressBar.find('.bar').animate({width: progressValue + "%"},600,function(){ progressBar.find('.bar-text').fadeIn(400); });
    }
    
  });
}



jQuery(document).ready(function(){
  "use strict";
  mainmenu();
  
  animateSkillBars();
  
  jQuery(window).scroll(function(){ animateSkillBars(); });
  
  /* Main Menu */
  jQuery("#main-menu ul li:has(ul)").each(function(){
    jQuery(this).addClass("hasSubmenu");
  });
  
  /* Mibile Nav */	
  jQuery('#main-menu > ul').mobileMenu({
    defaultText: 'Navigate to...',
    className: 'mobile-menu',
    subMenuDash: '&ndash;&nbsp;'
  });
  
  /*Tabs*/
  if(jQuery('ul.tabs').length > 0) {
    jQuery('ul.tabs').tabs('> .tabs-content');
  }
  
  if(jQuery('ul.tabs-frame').length > 0) {
    jQuery('ul.tabs-frame').tabs('> .tabs-frame-content');
  }
  
  if(jQuery('.tabs-vertical-frame').length > 0){
    jQuery('.tabs-vertical-frame').tabs('> .tabs-vertical-frame-content');
    jQuery('.tabs-vertical-frame').each(function(){
      jQuery(this).find("li:first").addClass('first').addClass('current');
      jQuery(this).find("li:last").addClass('last');
    });
    
    jQuery('.tabs-vertical-frame li').click(function(){ 
      jQuery(this).parent().children().removeClass('current');
      jQuery(this).addClass('current');
    });
    
  }
  
  /*Google Maps*/
  var $map = jQuery('#map');
  if( $map.length ) {
    $map.gMap({
      address: 'No: 58 A, East Madison St, Baltimore, MD, USA',
      zoom: 16,
      markers: [ { 'address' : 'No: 58 A, East Madison St, Baltimore, MD, USA' } ]
    });
  }
  
  /*UI Slider*/
  if(jQuery("#slider-range").length > 0){
    jQuery("#slider-range" ).slider({
      range: true,
      min:0,
      max: 10000,
      values: [ 3000, 10000 ],
      slide: function( event, ui ) {
        jQuery( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    
    jQuery( "#amount" ).val( "$" + jQuery( "#slider-range" ).slider( "values", 0 ) + " - $" +jQuery( "#slider-range" ).slider( "values", 1 ) );
  }
  
  /*Portfolio Isotope*/
  var $container = jQuery('.portfolio-container');
  if($container.length){
    
    $container.isotope({
      filter: '*',
      animationOptions: { duration: 750, easing: 'linear', queue: false  }
    });
    
    if(jQuery("div.sorting-container").length){
      jQuery("div.sorting-container a").click(function(){
        jQuery("div.sorting-container a").removeClass("active-sort");
        var selector = jQuery(this).attr('data-filter');
        jQuery(this).addClass("active-sort");
        $container.isotope({ filter: selector, animationOptions: { duration: 750, easing: 'linear',  queue: false }});
        return false;
      });		
      
    }
    
  }/*Portfolio Isotope End*/
  
  if(jQuery("div.portfolio-container").length) {
    jQuery(window).smartresize(function(){ applyIso(); });
  }
  
  
  /*Portfolio Lightbox*/
  if(jQuery(".gallery").length) {
    jQuery(".gallery a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false});		
  }
  
  
  /*Portfolio Carousel*/
  if(jQuery(".portfolio-carousel-wrapper").length) {
    jQuery('.portfolio-carousel').carouFredSel({
      responsive: true,
      auto: false,
      width: '100%',
      prev: '.portfolio-prev-arrow',
      next: '.portfolio-next-arrow',
      height: 'auto',
      scroll: 1,				
      items: {
        width: 340,
        visible: {
          min: 1,
          max: 3
        }
      }				
    });			
  }
  
  /*Partner Carousel*/
  if(jQuery(".partner-carousel-wrapper").length) {
    jQuery('.partner-carousel').carouFredSel({
      responsive: true,
      auto: false,
      width: '100%',
      prev: '.partner-prev-arrow',
      next: '.partner-next-arrow',
      height: 'auto',
      scroll: 1,				
      items: {
        width: 230,
        visible: {
          min: 1,
          max: 4
        }
      }				
    });			
  }
  
  /*Product Carousel*/
  if(jQuery(".product-carousel-wrapper").length) {
    jQuery('.product-carousel').carouFredSel({
      responsive: true,
      auto: false,
      width: '100%',
      prev: '.product-prev-arrow',
      next: '.product-next-arrow',
      height: 'auto',
      scroll: 1,				
      items: {
        width: 340,
        visible: {
          min: 1,
          max: 3
        }
      }				
    });			
  }
  
  /*Portfolio Single Slideshow*/
  if(jQuery(".portfolio-slider").length) {
    jQuery('.portfolio-slider').bxSlider({
      auto: true,
      pager: ''
    });
  }
  
  /*Page Slideshow*/
  if(jQuery(".page-slider").length) {
    jQuery('.page-slider').bxSlider({
      auto: true,
      controls : false,
      mode: 'fade'
    });
  }
  
  /* Accordion */
  jQuery('.toggle').toggle(function(){ jQuery(this).addClass('active'); },function(){ jQuery(this).removeClass('active'); });
  jQuery('.toggle').click(function(){ jQuery(this).next('.toggle-content').slideToggle(); });
  jQuery('.toggle-frame-set').each(function(){
    var $this = jQuery(this),
        $toggle = $this.find('.toggle-accordion');
    
    $toggle.click(function(){
      if( jQuery(this).next().is(':hidden') ) {
        $this.find('.toggle-accordion').removeClass('active').next().slideUp();
        jQuery(this).toggleClass('active').next().slideDown();
      }
      return false;
    });
    
    //Activate First Item always
    $this.find('.toggle-accordion:first').addClass("active");
    $this.find('.toggle-accordion:first').next().slideDown();
  });
  
  
  
  /* Contact Send mail */	
  jQuery("#contact-form").submit(function(e){
    var $form = jQuery(this),
        $msg = jQuery(this).prev('div.message'),
        $action = $form.attr('action');
    jQuery.post($action,$form.serialize(),function(data){
      $form.fadeOut("fast", function(){
        $msg.hide().html(data).show('fast');
      });
    });
    e.preventDefault();
  });

  /* Tweets */
  jQuery(".tweets").tweet({
    join_text: "auto",
    username: "gokulsaravanan",
    count: 3,
    loading_text: "loading tweets..."
  });
});