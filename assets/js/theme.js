// Theme toggle. The early-paint inline script in head.html sets the
// initial attribute from localStorage; this only handles the click.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function current() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function apply(theme) {
    document.documentElement.classList.add('transition');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setTimeout(function () {
      document.documentElement.classList.remove('transition');
    }, 250);
  }

  btn.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark');
  });
})();
