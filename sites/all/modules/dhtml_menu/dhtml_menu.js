// $Id: dhtml_menu.js,v 1.9.2.10 2008/06/23 09:58:41 arancaytar Exp $

Drupal.dhtmlMenu = {};

/**
 * Attaches the online users autoupdate behaviour to the block content.
 */
Drupal.dhtmlMenu.autoAttach = function() {
  var cookievalue = Drupal.dhtmlMenu.getCookie('dhtml_menu');
  if (cookievalue != '') {
    var cookieList = cookievalue.split(',');
    for (var i = 0; i < cookieList.length; i++) {
      $('#'+ cookieList[i]).show();
      $('#'+ cookieList[i]).removeClass('sub-collapsed').addClass('sub-expanded');
      $('#menu-' + cookieList[i]).removeClass('collapsed').addClass('expanded');
    }
  }

  $('ul.menu li[@class!="leaf"] > a').each(function() {
    if ($(this).parent().children('div.submenu').length > 0) {
      $(this)
      .css({display: 'block', zIndex: 2})
      .click(function(e) {
        id = $(this).parents()[0].id.replace('menu-', '');
        Drupal.dhtmlMenu.switchMenu($('#'+ id)[0], $(this).parents()[0]);
          
        return false;
      })
      .dblclick(function(e) {
        window.location = this.href;
      });
    }
  });

  $(window).unload(Drupal.dhtmlMenu.saveMenuState);
};

/**
 *  Changes the state of a submenu from open to close.
 */
Drupal.dhtmlMenu.switchMenu = function(submenu, parent) {
  if($(parent).is('.expanded')) {
    if (Drupal.settings.dhtmlMenu.useEffects) {
      $(submenu).animate({height: 'hide', opacity: 'hide'}, '500');
    } else {
      $(submenu).css('display', 'none');
    }
    $(parent).removeClass('expanded').addClass('collapsed');
    $(submenu).removeClass('sub-expanded').addClass('sub-collapsed');
  } else {
    if (Drupal.settings.dhtmlMenu.useEffects) {
      $(submenu).animate({height: 'show', opacity: 'show'}, '500');
    } else {
      $(submenu).css('display', 'block');
    }
    $(parent).removeClass('collapsed').addClass('expanded');
    $(submenu).removeClass('sub-collapsed').addClass('sub-expanded');
  }
  Drupal.dhtmlMenu.saveMenuState();
}

/**
 * Grabs the cookie data.
 */
Drupal.dhtmlMenu.getCookie = function(name) {
  var search = name + '=';
  var returnvalue = '';
  
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      var end = document.cookie.indexOf(';', offset);
      if (end == -1) {
        end = document.cookie.length;
      }
      returnvalue = unescape(document.cookie.substring(offset, end));
    }
  }

  return returnvalue;
}

/**
 * Saves the states of the menus.
 */
Drupal.dhtmlMenu.saveMenuState = function() {
  var blocks = '';
  $('div.submenu').each(function(i) {
    if ($(this).is('.sub-expanded')) {
      if (blocks != '') {
        blocks += ',';
      }
      blocks += this.id;
    }
  });

  document.cookie = 'dhtml_menu=' + blocks + ';path=/';
}

if (Drupal.jsEnabled) {
  $(document).ready(Drupal.dhtmlMenu.autoAttach);
}
