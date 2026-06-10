/* Press On Ventures — Nightfall shared nav + footer renderer (loads after povc-data.js + nightfall-data.js) */
(function () {
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  window.NF_ARROW = ARROW;
  window.NF_ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>';

  var NAV = [
    { label: 'Portfolio', href: 'portfolio.html', key: 'portfolio' },
    { label: 'Team', href: 'team.html', key: 'team' },
    { label: 'Press', href: 'press.html', key: 'press' },
    { label: 'Blog', href: 'blog.html', key: 'blog' }
  ];

  window.NF_renderChrome = function (activeKey) {
    var navEl = document.getElementById('nf-nav');
    if (navEl) {
      navEl.innerHTML = '<div class="container">'
        + '<a class="nf-brand" href="home.html"><span class="power-mark"></span><span class="nf-word">Press On</span></a>'
        + '<div class="nf-links">'
        + NAV.map(function (n) { return '<a href="' + n.href + '"' + (n.key === activeKey ? ' class="active"' : '') + '>' + n.label + '</a>'; }).join('')
        + '<a class="nf-cta" href="https://www.fundpanel.io/Login">Investor Login</a>'
        + '</div></div>';
    }

    var ftEl = document.getElementById('nf-footer');
    if (ftEl) {
      ftEl.innerHTML = '<div class="container"><div class="f-grid">'
        + '<div><div class="f-brand"><span class="power-mark"></span><span class="nf-word">Press On Ventures</span></div>'
        +   '<p class="f-tag">Investing in resilient founders building transformative consumer businesses.</p></div>'
        + '<div class="f-cols">'
        +   '<div class="f-col"><h4>Explore</h4><a href="portfolio.html">Portfolio</a><a href="team.html">Team</a><a href="press.html">Press</a><a href="blog.html">Blog</a></div>'
        +   '<div class="f-col"><h4>Connect</h4><a href="mailto:getintouch@presson.vc">getintouch@presson.vc</a><a href="https://x.com/pressonvc" target="_blank" rel="noopener">X / Twitter</a><a href="https://www.linkedin.com/company/pressonvc/" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.fundpanel.io/Login">Investor Login</a></div>'
        + '</div></div>'
        + '<div class="f-bottom"><span>© 2026 Press On Ventures</span>'
        +   '<span class="legal">For informational purposes only. Not an offer to sell or a solicitation to buy securities. Past performance is not indicative of future results.</span></div>'
        + '</div>';
    }

    document.querySelectorAll('.power-mark').forEach(function (m) { if (!m.innerHTML.trim()) m.innerHTML = window.POVC_POWER_SVG; });
    if (window.POVC_initReveal) window.POVC_initReveal();
    if (window.POVC_initNav && navEl) window.POVC_initNav(navEl);
  };
})();
