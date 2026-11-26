// StatAtlas shell logic: hash routing, shared state, and control wiring.
// State survives navigation so the country, chart and table choices stick.

window.SA = window.SA || {};

SA.state = {
  country: 'NG',
  compare: 'US',
  compareOn: false,
  indicator: 'gdp',
  chartType: 'line',
  dataIndicator: 'gdpPerCapita',
  dataQuery: '',
  sortKey: 'value',
  sortDir: 'desc',
};

SA.ROUTES = {
  '': 'viewOverview',
  '/': 'viewOverview',
  '/population': 'viewPopulation',
  '/economy': 'viewEconomy',
  '/health-education': 'viewHealth',
  '/compare': 'viewCompare',
  '/data': 'viewData',
};

SA.render = function () {
  const path = location.hash.replace(/^#/, '') || '/';
  const viewName = SA.ROUTES[path] || 'viewOverview';
  const mount = document.getElementById('view');
  mount.innerHTML = SA[viewName](SA.state);
  document.querySelectorAll('.navlink').forEach(function (a) {
    const href = a.getAttribute('href').replace(/^#/, '');
    a.classList.toggle('active', href === path || (path === '/' && href === '/'));
  });
  const select = document.getElementById('country-select');
  if (select && select.value !== SA.state.country) select.value = SA.state.country;
  document.title = 'StatAtlas — ' + SA.COUNTRIES[SA.state.country].name + ' statistics';
  window.scrollTo(0, 0);
};

SA.onAction = function (el) {
  const action = el.getAttribute('data-action');
  const s = SA.state;
  if (action === 'country') {
    s.country = el.value;
    if (s.compare === s.country) {
      s.compare = SA.COUNTRY_ORDER.find(function (c) { return c !== s.country; });
    }
  } else if (action === 'compare-country') {
    s.compare = el.value;
  } else if (action === 'indicator') {
    s.indicator = el.value;
  } else if (action === 'chart-type') {
    s.chartType = el.getAttribute('data-value');
  } else if (action === 'compare-on') {
    s.compareOn = el.checked;
  } else if (action === 'data-indicator') {
    s.dataIndicator = el.value;
  } else if (action === 'data-search') {
    s.dataQuery = el.value;
    SA.render();
    const input = document.querySelector('[data-action="data-search"]');
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
    return;
  } else if (action === 'sort') {
    const k = el.getAttribute('data-value');
    if (s.sortKey === k) s.sortDir = s.sortDir === 'asc' ? 'desc' : 'asc';
    else { s.sortKey = k; s.sortDir = k === 'name' ? 'asc' : 'desc'; }
  } else {
    return;
  }
  SA.render();
};

document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('change', function (ev) {
    const el = ev.target.closest('[data-action]');
    if (el && el.getAttribute('data-action') !== 'data-search') SA.onAction(el);
  });
  document.body.addEventListener('input', function (ev) {
    const el = ev.target.closest('[data-action="data-search"]');
    if (el) SA.onAction(el);
  });
  document.body.addEventListener('click', function (ev) {
    const el = ev.target.closest('button[data-action]');
    if (el) SA.onAction(el);
  });
  window.addEventListener('hashchange', SA.render);
  SA.render();
});
