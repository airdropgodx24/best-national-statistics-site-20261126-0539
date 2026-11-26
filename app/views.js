// StatAtlas views: one renderer per page. Each returns HTML for the mount
// point; main.js owns state and wires the controls after every render.

window.SA = window.SA || {};

function ind(key) { return SA.INDICATORS[key]; }
function val(code, key) { return SA.COUNTRIES[code].values[key]; }
function srcLine(key, entry) {
  return '<span class="src">' + SA.esc(ind(key).source) + ', ' + entry.y + '</span>';
}

SA.kpiCard = function (code, key, color) {
  const e = val(code, key);
  const meta = ind(key);
  const series = SA.COUNTRIES[code].series[key];
  const spark = series ? SA.sparkline(series, color || SA.CHART_COLORS[0]) : '';
  return '<article class="kpi">'
    + '<h3>' + SA.esc(meta.label) + '</h3>'
    + '<p class="kpi-value">' + SA.fmt(e.v, meta.format) + '</p>'
    + '<p class="kpi-unit">' + SA.esc(meta.unit) + '</p>'
    + spark
    + '<p class="kpi-src">' + srcLine(key, e) + '</p>'
    + '</article>';
};

SA.countryFacts = function (code) {
  const c = SA.COUNTRIES[code];
  const density = c.values.population.v / c.areaKm2;
  return '<dl class="facts">'
    + '<div><dt>Capital</dt><dd>' + SA.esc(c.capital) + '</dd></div>'
    + '<div><dt>Region</dt><dd>' + SA.esc(c.region) + '</dd></div>'
    + '<div><dt>Currency</dt><dd>' + SA.esc(c.currency) + '</dd></div>'
    + '<div><dt>Land area</dt><dd>' + c.areaKm2.toLocaleString('en-US') + ' km²</dd></div>'
    + '<div><dt>Population density</dt><dd>' + density.toFixed(1) + ' people/km²</dd></div>'
    + '</dl>';
};

SA.trendBlock = function (state, title) {
  const code = state.country;
  const key = state.indicator;
  const meta = ind(key);
  const series = [{ label: SA.COUNTRIES[code].name, color: SA.CHART_COLORS[0], values: SA.COUNTRIES[code].series[key] }];
  if (state.compareOn && state.compare !== code) {
    series.push({ label: SA.COUNTRIES[state.compare].name, color: SA.CHART_COLORS[1], values: SA.COUNTRIES[state.compare].series[key] });
  }
  const options = SA.SERIES_KEYS.map(function (k) {
    return '<option value="' + k + '"' + (k === key ? ' selected' : '') + '>' + SA.esc(ind(k).label) + '</option>';
  }).join('');
  return '<section class="card wide">'
    + '<div class="card-head"><h2>' + SA.esc(title || (meta.label + ' since 2000')) + '</h2>'
    + '<div class="controls">'
    + '<label>Indicator <select data-action="indicator">' + options + '</select></label>'
    + '<div class="seg" role="group" aria-label="Chart type">'
    + '<button type="button" data-action="chart-type" data-value="line" class="' + (state.chartType === 'line' ? 'on' : '') + '">Line</button>'
    + '<button type="button" data-action="chart-type" data-value="bar" class="' + (state.chartType === 'bar' ? 'on' : '') + '">Bars</button>'
    + '</div>'
    + '<label class="check"><input type="checkbox" data-action="compare-on"' + (state.compareOn ? ' checked' : '') + '> Overlay ' + SA.esc(SA.COUNTRIES[state.compare].name) + '</label>'
    + '</div></div>'
    + SA.trendChart(SA.SERIES_YEARS, series, { type: state.chartType, format: meta.format, title: meta.label })
    + SA.legend(series.map(function (s) { return { label: s.label, color: s.color }; }))
    + '<p class="note">Source: ' + SA.esc(meta.source) + '. Years shown: ' + SA.SERIES_YEARS.join(', ') + '.</p>'
    + '</section>';
};

SA.viewOverview = function (state) {
  const code = state.country;
  const c = SA.COUNTRIES[code];
  const kpis = ['population', 'gdp', 'gdpPerCapita', 'lifeExpectancy', 'unemployment', 'inflation', 'internet', 'literacy']
    .map(function (k, i) { return SA.kpiCard(code, k, SA.CHART_COLORS[i % SA.CHART_COLORS.length]); }).join('');
  const ageParts = c.ageShares.map(function (v, i) { return { label: SA.AGE_LABELS[i], value: v, color: SA.CHART_COLORS[i] }; });
  const sectorParts = c.sectorShares.map(function (v, i) { return { label: SA.SECTOR_LABELS[i], value: v, color: SA.CHART_COLORS[i + 2] }; });
  return '<section class="hero">'
    + '<div><h1>' + SA.esc(c.name) + ' in numbers</h1>'
    + '<p class="lede">The key statistics for ' + SA.esc(c.name) + ': people, economy, health, education and connectivity, each with its source and year. Pick another country above, or open a section below.</p>'
    + SA.countryFacts(code)
    + '</div></section>'
    + '<section class="kpis">' + kpis + '</section>'
    + SA.trendBlock(state)
    + '<div class="grid2">'
    + '<section class="card"><h2>Age structure</h2>' + SA.donut(ageParts, { title: 'Age structure', center: c.ageShares[0].toFixed(0) + '%', sub: 'under 15' })
    + SA.legend(ageParts.map(function (p) { return { label: p.label, color: p.color, value: p.value.toFixed(1) + '%' }; }))
    + '<p class="note">Share of population by age group, 2024. Source: UN World Population Prospects.</p></section>'
    + '<section class="card"><h2>Economy by sector</h2>' + SA.donut(sectorParts, { title: 'GDP by sector', center: c.sectorShares[2].toFixed(0) + '%', sub: 'services' })
    + SA.legend(sectorParts.map(function (p) { return { label: p.label, color: p.color, value: p.value.toFixed(1) + '%' }; }))
    + '<p class="note">Share of GDP by sector, 2023. Source: World Bank WDI.</p></section>'
    + '</div>'
    + '<section class="card"><h2>Explore ' + SA.esc(c.name) + '</h2><div class="explore">'
    + '<a href="#/population">Population &amp; society →</a>'
    + '<a href="#/economy">Economy &amp; work →</a>'
    + '<a href="#/health-education">Health &amp; education →</a>'
    + '<a href="#/compare">Compare countries →</a>'
    + '<a href="#/data">All data &amp; sources →</a>'
    + '</div></section>';
};

SA.viewPopulation = function (state) {
  const code = state.country;
  const c = SA.COUNTRIES[code];
  const rows = SA.COUNTRY_ORDER.map(function (cc) {
    return { label: SA.COUNTRIES[cc].name, value: SA.COUNTRIES[cc].values.population.v, color: cc === code ? SA.CHART_COLORS[1] : SA.CHART_COLORS[0], highlight: cc === code };
  }).sort(function (a, b) { return b.value - a.value; });
  const ageParts = c.ageShares.map(function (v, i) { return { label: SA.AGE_LABELS[i], value: v, color: SA.CHART_COLORS[i] }; });
  return '<section class="hero"><div><h1>Population &amp; society — ' + SA.esc(c.name) + '</h1>'
    + '<p class="lede">How many people live in ' + SA.esc(c.name) + ', how old they are, where they live, and how the population has grown since 2000.</p></div></section>'
    + '<section class="kpis">'
    + SA.kpiCard(code, 'population') + SA.kpiCard(code, 'urbanShare', SA.CHART_COLORS[2])
    + SA.kpiCard(code, 'fertility', SA.CHART_COLORS[3]) + SA.kpiCard(code, 'lifeExpectancy', SA.CHART_COLORS[4])
    + '</section>'
    + SA.trendBlock(state, 'Population and life expectancy since 2000')
    + '<div class="grid2">'
    + '<section class="card"><h2>Age structure</h2>' + SA.donut(ageParts, { title: 'Age structure', center: c.ageShares[1].toFixed(0) + '%', sub: 'working age' })
    + SA.legend(ageParts.map(function (p) { return { label: p.label, color: p.color, value: p.value.toFixed(1) + '%' }; }))
    + '<p class="note">2024. Source: UN World Population Prospects.</p></section>'
    + '<section class="card"><h2>Population ranking</h2>' + SA.rankBars(rows, { format: 'people' })
    + '<p class="note">All eight countries on StatAtlas, latest year (2024). Source: World Bank WDI.</p></section>'
    + '</div>';
};

SA.viewEconomy = function (state) {
  const code = state.country;
  const c = SA.COUNTRIES[code];
  const rows = SA.COUNTRY_ORDER.map(function (cc) {
    return { label: SA.COUNTRIES[cc].name, value: SA.COUNTRIES[cc].values.gdpPerCapita.v, color: cc === code ? SA.CHART_COLORS[1] : SA.CHART_COLORS[0], highlight: cc === code };
  }).sort(function (a, b) { return b.value - a.value; });
  const sectorParts = c.sectorShares.map(function (v, i) { return { label: SA.SECTOR_LABELS[i], value: v, color: SA.CHART_COLORS[i + 2] }; });
  return '<section class="hero"><div><h1>Economy &amp; work — ' + SA.esc(c.name) + '</h1>'
    + '<p class="lede">Output, incomes, prices and jobs: the size of the economy, what it produces, and how fast it is growing.</p></div></section>'
    + '<section class="kpis">'
    + SA.kpiCard(code, 'gdp') + SA.kpiCard(code, 'gdpPerCapita', SA.CHART_COLORS[1])
    + SA.kpiCard(code, 'gdpGrowth', SA.CHART_COLORS[2]) + SA.kpiCard(code, 'inflation', SA.CHART_COLORS[3])
    + SA.kpiCard(code, 'unemployment', SA.CHART_COLORS[4])
    + '</section>'
    + SA.trendBlock(state, 'GDP and incomes since 2000')
    + '<div class="grid2">'
    + '<section class="card"><h2>What the economy produces</h2>' + SA.donut(sectorParts, { title: 'GDP by sector', center: c.sectorShares[2].toFixed(0) + '%', sub: 'services' })
    + SA.legend(sectorParts.map(function (p) { return { label: p.label, color: p.color, value: p.value.toFixed(1) + '%' }; }))
    + '<p class="note">Share of GDP by sector, 2023. Source: World Bank WDI.</p></section>'
    + '<section class="card"><h2>GDP per capita ranking</h2>' + SA.rankBars(rows, { format: 'money0' })
    + '<p class="note">Current US$, 2024. Source: World Bank WDI.</p></section>'
    + '</div>';
};

SA.viewHealth = function (state) {
  const code = state.country;
  const c = SA.COUNTRIES[code];
  const rows = SA.COUNTRY_ORDER.map(function (cc) {
    return { label: SA.COUNTRIES[cc].name, value: SA.COUNTRIES[cc].values.lifeExpectancy.v, color: cc === code ? SA.CHART_COLORS[1] : SA.CHART_COLORS[0], highlight: cc === code };
  }).sort(function (a, b) { return b.value - a.value; });
  return '<section class="hero"><div><h1>Health &amp; education — ' + SA.esc(c.name) + '</h1>'
    + '<p class="lede">How long people live, what is spent on their care and schooling, and the basics of access: power, connectivity and literacy.</p></div></section>'
    + '<section class="kpis">'
    + SA.kpiCard(code, 'lifeExpectancy') + SA.kpiCard(code, 'under5Mortality', SA.CHART_COLORS[3])
    + SA.kpiCard(code, 'literacy', SA.CHART_COLORS[2]) + SA.kpiCard(code, 'healthSpending', SA.CHART_COLORS[4])
    + SA.kpiCard(code, 'educationSpending', SA.CHART_COLORS[5]) + SA.kpiCard(code, 'electricity', SA.CHART_COLORS[1])
    + '</section>'
    + SA.trendBlock(state, 'Life expectancy and connectivity since 2000')
    + '<section class="card"><h2>Life expectancy ranking</h2>' + SA.rankBars(rows, { format: 'num1' })
    + '<p class="note">Years at birth, 2023. Source: World Bank WDI.</p></section>';
};

SA.viewCompare = function (state) {
  const a = state.country, b = state.compare;
  const ca = SA.COUNTRIES[a], cb = SA.COUNTRIES[b];
  const options = SA.COUNTRY_ORDER.filter(function (cc) { return cc !== a; }).map(function (cc) {
    return '<option value="' + cc + '"' + (cc === b ? ' selected' : '') + '>' + SA.esc(SA.COUNTRIES[cc].name) + '</option>';
  }).join('');
  const keys = Object.keys(SA.INDICATORS);
  const rows = keys.map(function (k) {
    const ea = val(a, k), eb = val(b, k), meta = ind(k);
    const higherBetter = ['population', 'gdp', 'gdpPerCapita', 'gdpGrowth', 'lifeExpectancy', 'literacy', 'internet', 'electricity'].indexOf(k) >= 0;
    const aWins = higherBetter ? ea.v > eb.v : ea.v < eb.v;
    const bWins = higherBetter ? eb.v > ea.v : eb.v < ea.v;
    return '<tr><th scope="row">' + SA.esc(meta.label) + '</th>'
      + '<td class="' + (aWins ? 'win' : '') + '">' + SA.fmt(ea.v, meta.format) + ' <span class="yr">' + ea.y + '</span></td>'
      + '<td class="' + (bWins ? 'win' : '') + '">' + SA.fmt(eb.v, meta.format) + ' <span class="yr">' + eb.y + '</span></td>'
      + '<td class="src">' + SA.esc(meta.source) + '</td></tr>';
  }).join('');
  const trendState = Object.assign({}, state, { compareOn: true });
  return '<section class="hero"><div><h1>Compare countries</h1>'
    + '<p class="lede">' + SA.esc(ca.name) + ' against ' + SA.esc(cb.name) + ' on every indicator StatAtlas tracks. The stronger figure on each row is highlighted; for prices, joblessness and child mortality, lower is stronger.</p>'
    + '<div class="controls"><label>Compare with <select data-action="compare-country">' + options + '</select></label></div>'
    + '</div></section>'
    + '<section class="card wide"><div class="tablewrap"><table class="data">'
    + '<thead><tr><th scope="col">Indicator</th><th scope="col">' + SA.esc(ca.name) + '</th><th scope="col">' + SA.esc(cb.name) + '</th><th scope="col">Source</th></tr></thead>'
    + '<tbody>' + rows + '</tbody></table></div></section>'
    + SA.trendBlock(trendState, 'Trends side by side since 2000');
};

SA.viewData = function (state) {
  const key = state.dataIndicator;
  const meta = ind(key);
  const options = Object.keys(SA.INDICATORS).map(function (k) {
    return '<option value="' + k + '"' + (k === key ? ' selected' : '') + '>' + SA.esc(ind(k).label) + '</option>';
  }).join('');
  const q = (state.dataQuery || '').toLowerCase();
  let rows = SA.COUNTRY_ORDER.map(function (cc) {
    const e = val(cc, key);
    return { code: cc, name: SA.COUNTRIES[cc].name, v: e.v, y: e.y };
  }).filter(function (r) { return r.name.toLowerCase().indexOf(q) >= 0; });
  rows.sort(function (x, y) {
    const d = state.sortKey === 'name' ? x.name.localeCompare(y.name) : (x.v - y.v);
    return state.sortDir === 'asc' ? d : -d;
  });
  const body = rows.map(function (r) {
    return '<tr><td>' + SA.esc(r.name) + '</td><td>' + SA.fmt(r.v, meta.format) + '</td><td>' + r.y + '</td><td class="src">' + SA.esc(meta.source) + '</td></tr>';
  }).join('');
  const arrow = function (k) { return state.sortKey === k ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''; };
  const countryRows = Object.keys(SA.INDICATORS).map(function (k) {
    const e = val(state.country, k), m = ind(k);
    return '<tr><th scope="row">' + SA.esc(m.label) + '</th><td>' + SA.fmt(e.v, m.format) + '</td><td>' + e.y + '</td><td class="src">' + SA.esc(m.source) + '</td></tr>';
  }).join('');
  return '<section class="hero"><div><h1>All data &amp; sources</h1>'
    + '<p class="lede">Every figure on StatAtlas, with the source and year it was published for. Search the table, sort it, or switch the indicator.</p></div></section>'
    + '<section class="card wide"><div class="card-head"><h2>' + SA.esc(meta.label) + ' by country</h2>'
    + '<div class="controls"><label>Indicator <select data-action="data-indicator">' + options + '</select></label>'
    + '<label>Search <input type="search" data-action="data-search" value="' + SA.esc(state.dataQuery || '') + '" placeholder="Country name"></label></div></div>'
    + '<div class="tablewrap"><table class="data"><thead><tr>'
    + '<th scope="col"><button type="button" class="thbtn" data-action="sort" data-value="name">Country' + arrow('name') + '</button></th>'
    + '<th scope="col"><button type="button" class="thbtn" data-action="sort" data-value="value">' + SA.esc(meta.label) + arrow('value') + '</button></th>'
    + '<th scope="col">Year</th><th scope="col">Source</th></tr></thead>'
    + '<tbody>' + (body || '<tr><td colspan="4">No country matches that search.</td></tr>') + '</tbody></table></div>'
    + '<p class="note">Unit: ' + SA.esc(meta.unit) + '. Source: ' + SA.esc(meta.source) + '.</p></section>'
    + '<section class="card wide"><h2>' + SA.esc(SA.COUNTRIES[state.country].name) + ' — every indicator</h2>'
    + '<div class="tablewrap"><table class="data"><thead><tr><th scope="col">Indicator</th><th scope="col">Value</th><th scope="col">Year</th><th scope="col">Source</th></tr></thead>'
    + '<tbody>' + countryRows + '</tbody></table></div></section>';
};
