/*
	scripts.js
	
	License: GNU General Public License v3.0
	License URI: http://www.gnu.org/licenses/gpl-3.0.html
	
	Copyright: (c) 2013 Alexander "Alx" Agnarson, http://alxmedia.se
*/

jQuery(document).ready(function($) {
	OnceOnly();
});

jQuery(document).ajaxStop(function($) {
	OnceOnly();
});

function OnceOnly() {
	if (!jQuery('body').hasClass('s1-collapse')){
		console.log("ajaxStop Triggered");
		DocReadyAction();
	}
}
function DocReadyAction() {

/*  Toggle header search
/* ------------------------------------ */
	jQuery('.toggle-search').click(function(){
		jQuery('.toggle-search').toggleClass('active');
		jQuery('.search-expand').fadeToggle(250);
            setTimeout(function(){
                jQuery('.search-expand input').focus();
            }, 300);
	});
	
/*  Scroll to top
/* ------------------------------------ */
	jQuery('a#back-to-top').click(function() {
		jQuery('html, body').animate({scrollTop:0},'slow');
		return false;
	});
	
/*  Tabs widget
/* ------------------------------------ */	
	(function() {
		var $tabsNav       = jQuery('.alx-tabs-nav'),
			$tabsNavLis    = $tabsNav.children('li'),
			$tabsContainer = jQuery('.alx-tabs-container');

		$tabsNav.each(function() {
			var $this = jQuery(this);
			$this.next().children('.alx-tab').stop(true,true).hide()
			.siblings( $this.find('a').attr('href') ).show();
			$this.children('li').first().addClass('active').stop(true,true).show();
		});

		$tabsNavLis.on('click', function(e) {
			var $this = jQuery(this);

			$this.siblings().removeClass('active').end()
			.addClass('active');
			
			$this.parent().next().children('.alx-tab').stop(true,true).hide()
			.siblings( $this.find('a').attr('href') ).fadeIn();
			e.preventDefault();
		}).children( window.location.hash ? 'a[href=' + window.location.hash + ']' : 'a:first' ).trigger('click');

	})();
	
/*  Comments / pingbacks tabs
/* ------------------------------------ */	
    jQuery(".comment-tabs li").click(function() {
        jQuery(".comment-tabs li").removeClass('active');
        jQuery(this).addClass("active");
        jQuery(".comment-tab").hide();
        var selected_tab = jQuery(this).find("a").attr("href");
        jQuery(selected_tab).fadeIn();
        return false;
    });

/*  Table odd row class
/* ------------------------------------ */
	jQuery('table tr:odd').addClass('alt');

/*  Sidebar collapse
/* ------------------------------------ */
	jQuery('body').addClass('s1-collapse');
	jQuery('body').addClass('s2-collapse');
	
	jQuery('.s1 .sidebar-toggle').click(function(){
		console.log("s1 toggle")
		if(jQuery('body').is('.s1-collapse')) {
			console.log("s1 is collapsed. Expanding")
		} else {
			console.log("s1 is expanded. Collapsing")
		}
		jQuery('body').toggleClass('s1-collapse').toggleClass('s1-expand');
		if (jQuery('body').is('.s2-expand')) { 
			console.log("s2 is expanded. Collapsing")
			jQuery('body').toggleClass('s2-expand').toggleClass('s2-collapse');
		}
	});
	jQuery('.s2 .sidebar-toggle').click(function(){
		if(jQuery('body').is('.s2-collapse')) {
			console.log("s2 is collapsed. Expanding")
		} else {
			console.log("s2 is expanded. Collapsing")
		}
		jQuery('body').toggleClass('s2-collapse').toggleClass('s2-expand');
		if (jQuery('body').is('.s1-expand')) { 
			console.log("s1 is expanded. Collapsing")
			jQuery('body').toggleClass('s1-expand').toggleClass('s1-collapse');
		}
	});

/*  Dropdown menu animation
/* ------------------------------------ */
	jQuery('.nav ul.sub-menu').hide();
	jQuery('.nav li').hover( 
		function() {
			jQuery(this).children('ul.sub-menu').slideDown('fast');
		}, 
		function() {
			jQuery(this).children('ul.sub-menu').hide();
		}
	);
	
/*  Mobile menu smooth toggle height
/* ------------------------------------ */	
	jQuery('.nav-toggle').on('click', function() {
		slide(jQuery('.nav-wrap .nav', jQuery(this).parent()));
	});
	 
	function slide(content) {
		var wrapper = content.parent();
		var contentHeight = content.outerHeight(true);
		var wrapperHeight = wrapper.height();
	 
		wrapper.toggleClass('expand');
		if (wrapper.hasClass('expand')) {
		setTimeout(function() {
			wrapper.addClass('transition').css('height', contentHeight);
		}, 10);
	}
	else {
		setTimeout(function() {
			wrapper.css('height', wrapperHeight);
			setTimeout(function() {
			wrapper.addClass('transition').css('height', 0);
			}, 10);
		}, 10);
	}
	 
	wrapper.one('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function() {
		if(wrapper.hasClass('open')) {
			wrapper.removeClass('transition').css('height', 'auto');
		}
	});
	}
	
}