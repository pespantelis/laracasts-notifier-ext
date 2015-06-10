var browserAction = chrome.browserAction;
var storage = chrome.storage.local;
var url = 'https://laracasts.com/lessons';
var lastLesson;

(function check() {
  $.get(url, function (data) {
    lastLesson = $(data).find('.lesson-set:first-child .lesson-block:first-child').attr('class').match(/.*lesson-(\d+).*/)[1];

    storage.get(function (items) {
      if (lastLesson !== items.laracasts_last_lesson)
        browserAction.setBadgeText({ text: items.laracasts_badge });

      setTimeout(check, 1000*60*items.laracasts_interval); // in minutes
    });
  });
})();

browserAction.onClicked.addListener(function (tab) {
  browserAction.setBadgeText({ text: '' });

  storage.set({ 'laracasts_last_lesson': lastLesson });

  window.open(url);
});

chrome.runtime.onInstalled.addListener(function () {
  browserAction.setBadgeBackgroundColor({ color: "#f9604c" });

  storage.set({
    'laracasts_interval': 15,
    'laracasts_badge': '{ }'
  });
});
