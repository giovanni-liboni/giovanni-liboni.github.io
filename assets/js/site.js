// Toggle the abstract / bibtex panel under each publication entry.
(function () {
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-toggle]');
    if (!trigger) return;
    var key = trigger.dataset.toggle;
    var entry = trigger.closest('.pub-entry');
    if (!entry) return;
    var panel = entry.querySelector('[data-detail="' + key + '"]');
    if (panel) panel.classList.toggle('open');
  });
})();
