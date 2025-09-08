// $Id: README.txt,v 1.5.2.16 2007/11/08 18:04:52 jvandervort Exp $

-------------- OVERVIEW -------------------------------------------
The countdowmtimer module provides a timer implemented through javascript
which gives you a dynamic countdown/up (second-by-second) to a certain date 
and time.  The Countdown Timer Module uses the onload event then dynamically 
searches content/blocks/teasers for certain css classes and then injects itself.
You can configure timer settings on the /admin/settings/countdowntimer page.
You can also format each timer differently using the individual timer overrides.



-------------- INSTALLING -----------------------------------------
countdowntimer can be installed simply by activating the module.
There are no module dependencies.
There are no table components.



-------------- NODE USAGE ----------------------------------------
1. create a new node with 
   -input format set to an html that allows span tags.
   -add a timer span with the appropriate formatting (from the examples below).
   -your timer should now work (unless you exluded this page in the admin settings).


-------------- BLOCK USAGE ----------------------------------------
1. Make sure admin setting for Javascript load option is set to: ALL Pages (easiest).
2. create a new block with 
   -input format set to an html that allows span tags.
   -add a timer span with the appropriate formatting (from the examples below).
   -your timer should now work (unless you exluded this page in the admin settings).


-------------- EXAMPLES -------------------------------------------

Example (count down, all defaults)
<b>Count-Down to Something...</b>
<span class="countdowntimer">Count Down, this shows until timer initializes or for non-js folks
 <span style="display:none" name="datetime">2007-02-26T09:30:00</span> 
 <span style="display:none" name="tz_hours">-8</span>
</span>


Example (count up)
<b>Count-Up to whatever...</b>
<span class="countdowntimer">Count Up, this shows until timer initializes or for non-js folks
 <span style="display:none" name="datetime">2007-02-26T09:30:00</span> 
 <span style="display:none" name="tz_hours">-8</span>
 <span style="display:none" name="dir">up</span>
</span>


Example (count down, with format preset 1)
<b>Count-Down to Something...</b>
<span class="countdowntimer">Count Down, this shows until timer initializes or for non-js folks
 <span style="display:none" name="datetime">2007-02-26T09:30:00</span> 
 <span style="display:none" name="tz_hours">-8</span>
 <span style="display:none" name="format_num">1</span>
</span>


<b>Count-Down to whatever...</b>
<span class="countdowntimer">Count Down
 <span style="display:none" name="datetime">2008-02-26T09:30:00</span> 
 <span style="display:none" name="tz_hours">-8</span>
 <span style="display:none" name="dir">down</span>
 <span style="display:none" name="format_txt"><em>(%dow% %moy%%day%)</em><br>%days% days + %hours%:%mins%:%secs%</span>
 <span style="display:none" name="threshold">4</span>
 <span style="display:none" name="complete">Custom Timer Complete Statement</span>
</span>

IMPORTANT: If you have a format_num and a format_txt in a timer, the format_txt
value will trump the format_num value.



-------------- OUTPUT FORMAT ---------------------------------------
The display of the actual timer is configurable in the Site configuration 
admin menu: countdowntimer.

Currently supported replacement values are:
%day%   - Day number of target date (0-31)
%month% - Month number of target date (1-12)
%year%  - Year number of target date (4 digit number)
%dow%   - Day-Of-Week (Mon-Sun)
%moy%   - Month-Of-Year (Jan-Dec)

%years% - Years from set date(integer number)
%ydays% - (Days - Years) from set date(integer number)

%days%  - Total Days from set date (integer number)
%hours% - (Hours - Days) from set date (integer number)
%mins%  - (Minutes - Hours) from set date (intger number)
%secs%  - (Seconds - Minutes) from set date (integer number)



-------------- CAVEATS ---------------------------------------------
If a daylight saving time shift should occur in either the client's tz or
the target's tz between the current date/time and your target datetime,
you could be off by one hour until you pass the point of conversion.



-------------- LEGACY FORMAT ---------------------------------------
Will not be supported in the Drupal 6.x release

2007
2007-10
2007-10-15 20
2007-10-15 20:30
2007-10-15 20:30:00
2007-10-15 20:30:00 -8
2007-10-15 20:30:00 -8 1

Defaults will be used if you don't fill in all of the fields.
You cannot skip arguements to get to the ones farther to the right.
Example: 2007-10-15 20 -8 does not work.



-------------- OTHER EXAMPLES --------------------------------------

Example (Legacy Format, with manually loaded js) 
NOTE: if you don't have clean urls turned on, try drupal_add_js('q=countdowntimer/timerjs');

<?php 
drupal_add_js('countdowntimer/timerjs');
?>
<b>Countdown to whatever...</b>
<span class="countdowntimer">2007-10-7</span>



Example (Legacy Format, for nodes, no need for the drupal_add_js)

<b>Countdown to whatever...</b>
<span class="countdowntimer">2007-10-15 20:30:00 -8</span>
