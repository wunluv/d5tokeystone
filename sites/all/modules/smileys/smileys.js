// $Id: smileys.js,v 1.1 2006/11/16 08:24:20 Gurpartap Exp $

/* Filename: smileys.js
 * jQuery Smileys Code for Drupal smileys module.
 * License: GPL (Read LICENSE.txt for more information).
 * Copyright, authors.
*/

Drupal.smileysAutoAttach = function() {
  $('img.smiley-class').click(function(){
    var smiley = ' ' + this.alt + ' ';
    $('textarea#edit-body, textarea#edit-comment').each(function() {
      if (document.selection) {
        this.focus();
        document.selection.createRange().text = smiley;
      }
       else if (this.selectionStart || this.selectionStart == '0') {
        var cursorPos = this.selectionEnd + smiley.length;
        this.value = this.value.substring(0, this.selectionStart) + smiley + this.value.substring(this.selectionEnd);
        this.selectionStart = this.selectionEnd = cursorPos;
      }
      else {
        this.value = this.value + smiley
      }
      this.focus();
    });
  });
}

if (Drupal.jsEnabled) {
  $(document).ready(Drupal.smileysAutoAttach);
}