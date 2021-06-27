(function ($) {
  "use strict";

  $.fn.extend({
    countdown100: function (options) {
      var defaults = {
        endtimeDate: 0,
      };

      var options = $.extend(defaults, options);
      return this.each(function () {
        var obj = $(this);
        var endDate = options.endtimeDate;
        initializeClock(endDate);

        function getTimeRemaining(endtime) {
          var t = endtime - new Date().getTime();
          if (t < 0) {
            // do something here
            alter("Your date has expired");
          }
          var seconds = Math.floor((t / 1000) % 60);
          var minutes = Math.floor((t / 1000 / 60) % 60);
          var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
          var days = Math.floor(t / (1000 * 60 * 60 * 24));
          return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          };
        }

        function initializeClock(endtime) {
          var daysSpan = $(obj).find(".days");
          var hoursSpan = $(obj).find(".hours");
          var minutesSpan = $(obj).find(".minutes");
          var secondsSpan = $(obj).find(".seconds");

          function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.html(t.days);
            hoursSpan.html(("0" + t.hours).slice(-2));
            minutesSpan.html(("0" + t.minutes).slice(-2));
            secondsSpan.html(("0" + t.seconds).slice(-2));

            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
          }

          updateClock();
          var timeinterval = setInterval(updateClock, 1000);
        }
      });
    },
  });
})(jQuery);
