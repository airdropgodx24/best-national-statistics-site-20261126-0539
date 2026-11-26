// StatAtlas charts: small hand-rolled SVG builders (no libraries, no network).
// Every chart is a string of SVG that views drop into the page.

window.SA = window.SA || {};

SA.fmt = function (value, format) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  switch (format) {
    case 'people': {
      if (Math.abs(value) >= 1e9) return (value / 1e9).toFixed(2) + ' bn';
      if (Math.abs(value) >= 1e6) return (value / 1e6).toFixed(1) + ' m';
      return Math.round(value).toLocaleString('en-US');
    }
    case 'money': {
      if (Math.abs(value) >= 1e12) return '$' + (value / 1e12).toFixed(2) + ' tn';
      if (Math.abs(value) >= 1e9) return '$' + (value / 1e9).toFixed(1) + ' bn';
      if (Math.abs(value) >= 1e6) return '$' + (value / 1e6).toFixed(1) + ' m';
      return '$' + Math.round(value).toLocaleString('en-US');
    }
    case 'money0': return '$' + Math.round(value).toLocaleString('en-US');
    case 'pct1': return value.toFixed(1) + '%';
    case 'num1': return value.toFixed(1);
    default: return String(value);
  }
};

SA.esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

SA.CHART_COLORS = ['#0e7c86', '#e8a33d', '#5b7fb8', '#c25e7e', '#6aa84f', '#8e6bbf'];

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  let step;
  if (norm < 1.5) step = mag;
  else if (norm < 3) step = 2 * mag;
  else if (norm < 7) step = 5 * mag;
  else step = 10 * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let t = lo; t <= hi + step / 2; t += step) ticks.push(Math.round(t * 1e9) / 1e9);
  return { lo, hi, ticks };
}

function axisLabel(v, format) {
  if (format === 'people') {
    if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(1) + 'bn';
    if (Math.abs(v) >= 1e6) return Math.round(v / 1e6) + 'm';
    return String(Math.round(v));
  }
  if (format === 'money') {
    if (Math.abs(v) >= 1e12) return '$' + (v / 1e12).toFixed(1) + 'tn';
    if (Math.abs(v) >= 1e9) return '$' + Math.round(v / 1e9) + 'bn';
    if (Math.abs(v) >= 1e6) return '$' + Math.round(v / 1e6) + 'm';
    return '$' + Math.round(v);
  }
  if (format === 'money0') return '$' + Math.round(v).toLocaleString('en-US');
  if (format === 'pct1') return Math.round(v) + '%';
  return String(Math.round(v * 10) / 10);
}

// Line or bar chart over years. seriesList: [{label, color, values:[...]}] aligned to years.
SA.trendChart = function (years, seriesList, opts) {
  opts = opts || {};
  const W = 720, H = 300, L = 64, R = 14, T = 16, B = 34;
  const iw = W - L - R, ih = H - T - B;
  let min = Infinity, max = -Infinity;
  seriesList.forEach(function (s) {
    s.values.forEach(function (v) { if (v < min) min = v; if (v > max) max = v; });
  });
  if (opts.type === 'bar') min = Math.min(0, min);
  const pad = (max - min) * 0.08 || 1;
  const scale = niceTicks(min - (opts.type === 'bar' ? 0 : pad), max + pad, 5);
  const x = function (i) { return L + (years.length === 1 ? iw / 2 : (i / (years.length - 1)) * iw); };
  const y = function (v) { return T + ih - ((v - scale.lo) / (scale.hi - scale.lo)) * ih; };
  let out = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + SA.esc(opts.title || 'Trend chart') + '">';
  scale.ticks.forEach(function (t) {
    out += '<line x1="' + L + '" y1="' + y(t) + '" x2="' + (W - R) + '" y2="' + y(t) + '" class="grid"/>';
    out += '<text x="' + (L - 8) + '" y="' + (y(t) + 4) + '" class="axis" text-anchor="end">' + axisLabel(t, opts.format) + '</text>';
  });
  years.forEach(function (yr, i) {
    out += '<text x="' + x(i) + '" y="' + (H - 10) + '" class="axis" text-anchor="middle">' + yr + '</text>';
  });
  if (opts.type === 'bar') {
    const n = seriesList.length;
    const groupW = iw / years.length;
    const barW = Math.min(26, (groupW * 0.72) / n);
    years.forEach(function (yr, i) {
      seriesList.forEach(function (s, si) {
        const v = s.values[i];
        const bx = L + i * groupW + groupW / 2 - (barW * n) / 2 + si * barW;
        const by = y(Math.max(v, scale.lo));
        const bh = Math.max(1, y(scale.lo) - by);
        out += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + (barW - 2).toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="' + s.color + '" rx="2"><title>' + SA.esc(s.label) + ' ' + yr + ': ' + SA.fmt(v, opts.format) + '</title></rect>';
      });
    });
  } else {
    seriesList.forEach(function (s) {
      const pts = s.values.map(function (v, i) { return x(i).toFixed(1) + ',' + y(v).toFixed(1); }).join(' ');
      out += '<polyline points="' + pts + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
      s.values.forEach(function (v, i) {
        out += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3.5" fill="' + s.color + '"><title>' + SA.esc(s.label) + ' ' + years[i] + ': ' + SA.fmt(v, opts.format) + '</title></circle>';
      });
    });
  }
  out += '</svg>';
  return out;
};

// Horizontal bars for one indicator across countries. rows: [{label, value, color, highlight}]
SA.rankBars = function (rows, opts) {
  opts = opts || {};
  const max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([0]));
  let out = '<div class="rankbars">';
  rows.forEach(function (r) {
    const pct = max > 0 ? (r.value / max) * 100 : 0;
    out += '<div class="rankrow' + (r.highlight ? ' hl' : '') + '">'
      + '<span class="ranklabel">' + SA.esc(r.label) + '</span>'
      + '<span class="ranktrack"><span class="rankfill" style="width:' + pct.toFixed(1) + '%;background:' + r.color + '"></span></span>'
      + '<span class="rankvalue">' + SA.fmt(r.value, opts.format) + '</span></div>';
  });
  out += '</div>';
  return out;
};

// Donut for shares that sum to ~100. parts: [{label, value, color}]
SA.donut = function (parts, opts) {
  opts = opts || {};
  const total = parts.reduce(function (a, p) { return a + p.value; }, 0) || 1;
  const cx = 90, cy = 90, r = 68, sw = 26;
  const C = 2 * Math.PI * r;
  let acc = 0;
  let out = '<svg class="donut" viewBox="0 0 180 180" role="img" aria-label="' + SA.esc(opts.title || 'Share chart') + '">';
  parts.forEach(function (p) {
    const frac = p.value / total;
    const dash = Math.max(0, frac * C - 2);
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + p.color + '" stroke-width="' + sw + '" stroke-dasharray="' + dash.toFixed(1) + ' ' + C.toFixed(1) + '" stroke-dashoffset="' + (-acc * C).toFixed(1) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"><title>' + SA.esc(p.label) + ': ' + p.value.toFixed(1) + '%</title></circle>';
    acc += frac;
  });
  out += '<text x="' + cx + '" y="' + (cy - 2) + '" class="donut-center" text-anchor="middle">' + SA.esc(opts.center || '') + '</text>';
  out += '<text x="' + cx + '" y="' + (cy + 16) + '" class="donut-sub" text-anchor="middle">' + SA.esc(opts.sub || '') + '</text>';
  out += '</svg>';
  return out;
};

SA.legend = function (items) {
  return '<div class="legend">' + items.map(function (it) {
    return '<span class="legend-item"><span class="swatch" style="background:' + it.color + '"></span>' + SA.esc(it.label) + (it.value !== undefined ? ' <strong>' + it.value + '</strong>' : '') + '</span>';
  }).join('') + '</div>';
};

SA.sparkline = function (values, color) {
  const W = 120, H = 34, P = 3;
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1;
  const pts = values.map(function (v, i) {
    const px = P + (i / (values.length - 1)) * (W - 2 * P);
    const py = H - P - ((v - min) / span) * (H - 2 * P);
    return px.toFixed(1) + ',' + py.toFixed(1);
  }).join(' ');
  return '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>';
};
