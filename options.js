$(function() {
  var storage = chrome.storage.local;
  var $interval = $('#interval_value');
  var $badge = $('#badge_value');
  var $sections = $('.mainview > *');

  storage.get(function (items) {
    $interval.val(items.laracasts_interval);
    $badge.val(items.laracasts_badge);
  });

  $sections.not('.selected').css('display', 'none');

  var toggleAlert = function() {
    $('.alert').fadeToggle();
  }

  $('.save_button').click(function() {
    storage.set({
      'laracasts_interval': $interval.val(),
      'laracasts_badge': $badge.val()
    }, function() {
      chrome.browserAction.setBadgeText({ text: $badge.val() });

      toggleAlert();

      setTimeout(toggleAlert, 2500);
    });
  });

  $('.menu a').click(function(ev) {
    ev.preventDefault();

    var $current = $(ev.currentTarget);

    $sections.removeClass('selected');
    $('.menu li').removeClass('selected');

    setTimeout(function() {
      $('body')[0].scrollTop = 0;

      $sections.not('.selected').css('display', 'none');
    }, 100);

    $current.parent().addClass('selected');
    $current = $($current.attr('href'));
    $current.css('display', 'block');

    setTimeout(function() {
      $current.addClass('selected');
    }, 0);
  });
});
