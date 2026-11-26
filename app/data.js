// StatAtlas data: national statistics for eight countries.
// Figures are drawn from the World Bank's World Development Indicators (WDI)
// and UN population estimates, as published for the years shown. Every figure
// in the interface carries its source and year from this file.

window.SA = window.SA || {};

SA.INDICATORS = {
  population:    { label: 'Population',            unit: 'people',        format: 'people',  source: 'World Bank WDI' },
  gdp:           { label: 'GDP (current US$)',     unit: 'US$',           format: 'money',   source: 'World Bank WDI' },
  gdpPerCapita:  { label: 'GDP per capita',        unit: 'US$',           format: 'money0',  source: 'World Bank WDI' },
  gdpGrowth:     { label: 'Real GDP growth',       unit: '% a year',      format: 'pct1',    source: 'World Bank WDI' },
  inflation:     { label: 'Inflation (CPI)',       unit: '% a year',      format: 'pct1',    source: 'World Bank WDI' },
  unemployment:  { label: 'Unemployment',          unit: '% of labour force', format: 'pct1', source: 'ILO / national statistics' },
  lifeExpectancy:{ label: 'Life expectancy at birth', unit: 'years',      format: 'num1',    source: 'World Bank WDI' },
  literacy:      { label: 'Adult literacy rate',   unit: '% of adults',   format: 'pct1',    source: 'UNESCO UIS' },
  fertility:     { label: 'Fertility rate',        unit: 'births per woman', format: 'num1', source: 'World Bank WDI' },
  urbanShare:    { label: 'Urban population',      unit: '% of population', format: 'pct1',  source: 'World Bank WDI' },
  internet:      { label: 'Internet users',        unit: '% of population', format: 'pct1',  source: 'ITU / World Bank WDI' },
  electricity:   { label: 'Access to electricity', unit: '% of population', format: 'pct1',  source: 'World Bank WDI' },
  healthSpending:{ label: 'Health spending',       unit: '% of GDP',      format: 'pct1',    source: 'WHO Global Health Expenditure Database' },
  educationSpending: { label: 'Government education spending', unit: '% of GDP', format: 'pct1', source: 'UNESCO UIS / World Bank WDI' },
  co2PerCapita:  { label: 'CO₂ emissions per capita', unit: 'tonnes a year', format: 'num1', source: 'Global Carbon Project / World Bank' },
  under5Mortality: { label: 'Under-5 mortality',   unit: 'per 1,000 live births', format: 'num1', source: 'UN IGME' },
};

SA.SERIES_YEARS = [2000, 2005, 2010, 2015, 2020, 2023, 2024];
SA.SERIES_KEYS = ['population', 'gdp', 'gdpPerCapita', 'lifeExpectancy', 'internet'];

SA.COUNTRIES = {
  NG: {
    name: 'Nigeria', capital: 'Abuja', region: 'West Africa', currency: 'Nigerian naira (NGN)', areaKm2: 923768,
    values: {
      population: { v: 232679478, y: 2024 }, gdp: { v: 187.8e9, y: 2024 }, gdpPerCapita: { v: 807, y: 2024 },
      gdpGrowth: { v: 4.1, y: 2024 }, inflation: { v: 33.2, y: 2024 }, unemployment: { v: 4.3, y: 2024 },
      lifeExpectancy: { v: 54.5, y: 2023 }, literacy: { v: 63.2, y: 2022 }, fertility: { v: 4.5, y: 2023 },
      urbanShare: { v: 54.3, y: 2024 }, internet: { v: 45.5, y: 2023 }, electricity: { v: 59.5, y: 2023 },
      healthSpending: { v: 4.0, y: 2022 }, educationSpending: { v: 5.1, y: 2022 },
      co2PerCapita: { v: 0.6, y: 2023 }, under5Mortality: { v: 107, y: 2023 },
    },
    series: {
      population: [122.3e6, 139.6e6, 159.4e6, 181.1e6, 206.1e6, 227.9e6, 232.7e6],
      gdp: [69.5e9, 175.6e9, 369.1e9, 493.0e9, 429.4e9, 362.8e9, 187.8e9],
      gdpPerCapita: [568, 1258, 2316, 2722, 2083, 1592, 807],
      lifeExpectancy: [46.9, 48.9, 51.3, 53.0, 53.6, 54.5, 54.9],
      internet: [0.1, 3.5, 11.5, 27.7, 35.5, 45.5, 48.0],
    },
    ageShares: [42.5, 54.3, 3.2], sectorShares: [24.0, 33.0, 43.0],
  },
  US: {
    name: 'United States', capital: 'Washington, D.C.', region: 'North America', currency: 'US dollar (USD)', areaKm2: 9833517,
    values: {
      population: { v: 340110988, y: 2024 }, gdp: { v: 29184e9, y: 2024 }, gdpPerCapita: { v: 85810, y: 2024 },
      gdpGrowth: { v: 2.8, y: 2024 }, inflation: { v: 2.9, y: 2024 }, unemployment: { v: 4.0, y: 2024 },
      lifeExpectancy: { v: 78.5, y: 2023 }, literacy: { v: 99.0, y: 2022 }, fertility: { v: 1.6, y: 2023 },
      urbanShare: { v: 80.2, y: 2024 }, internet: { v: 93.1, y: 2023 }, electricity: { v: 100, y: 2023 },
      healthSpending: { v: 17.6, y: 2023 }, educationSpending: { v: 5.4, y: 2021 },
      co2PerCapita: { v: 13.8, y: 2023 }, under5Mortality: { v: 6.5, y: 2023 },
    },
    series: {
      population: [282.2e6, 295.5e6, 309.3e6, 321.4e6, 331.5e6, 334.9e6, 340.1e6],
      gdp: [10252e9, 13039e9, 15049e9, 18295e9, 21354e9, 27361e9, 29184e9],
      gdpPerCapita: [36330, 44123, 48650, 56934, 64416, 81695, 85810],
      lifeExpectancy: [76.8, 77.7, 78.7, 78.9, 77.0, 78.5, 79.0],
      internet: [43.1, 68.0, 71.7, 74.6, 90.1, 93.1, 93.5],
    },
    ageShares: [17.9, 64.8, 17.3], sectorShares: [1.1, 17.9, 81.0],
  },
  GB: {
    name: 'United Kingdom', capital: 'London', region: 'Europe', currency: 'Pound sterling (GBP)', areaKm2: 242495,
    values: {
      population: { v: 69226000, y: 2024 }, gdp: { v: 3644e9, y: 2024 }, gdpPerCapita: { v: 52648, y: 2024 },
      gdpGrowth: { v: 1.1, y: 2024 }, inflation: { v: 2.5, y: 2024 }, unemployment: { v: 4.3, y: 2024 },
      lifeExpectancy: { v: 81.3, y: 2023 }, literacy: { v: 99.0, y: 2022 }, fertility: { v: 1.4, y: 2023 },
      urbanShare: { v: 84.4, y: 2024 }, internet: { v: 97.0, y: 2023 }, electricity: { v: 100, y: 2023 },
      healthSpending: { v: 11.0, y: 2023 }, educationSpending: { v: 5.2, y: 2022 },
      co2PerCapita: { v: 4.9, y: 2023 }, under5Mortality: { v: 4.3, y: 2023 },
    },
    series: {
      population: [58.9e6, 60.4e6, 62.8e6, 65.1e6, 67.1e6, 68.3e6, 69.2e6],
      gdp: [1644e9, 2395e9, 2489e9, 2920e9, 2703e9, 3340e9, 3644e9],
      gdpPerCapita: [27915, 39652, 39634, 44854, 40284, 48899, 52648],
      lifeExpectancy: [77.9, 79.4, 80.8, 81.2, 81.0, 81.3, 81.6],
      internet: [26.8, 66.8, 85.0, 91.7, 96.7, 97.0, 97.2],
    },
    ageShares: [17.3, 63.9, 18.8], sectorShares: [0.6, 17.4, 82.0],
  },
  IN: {
    name: 'India', capital: 'New Delhi', region: 'South Asia', currency: 'Indian rupee (INR)', areaKm2: 3287263,
    values: {
      population: { v: 1450935791, y: 2024 }, gdp: { v: 3909.9e9, y: 2024 }, gdpPerCapita: { v: 2696, y: 2024 },
      gdpGrowth: { v: 6.5, y: 2024 }, inflation: { v: 4.6, y: 2024 }, unemployment: { v: 4.2, y: 2024 },
      lifeExpectancy: { v: 72.0, y: 2023 }, literacy: { v: 76.3, y: 2022 }, fertility: { v: 2.0, y: 2023 },
      urbanShare: { v: 36.4, y: 2024 }, internet: { v: 55.3, y: 2023 }, electricity: { v: 99.5, y: 2023 },
      healthSpending: { v: 3.3, y: 2022 }, educationSpending: { v: 4.5, y: 2022 },
      co2PerCapita: { v: 2.0, y: 2023 }, under5Mortality: { v: 28.5, y: 2023 },
    },
    series: {
      population: [1057.9e6, 1149.3e6, 1240.6e6, 1328.0e6, 1402.6e6, 1438.1e6, 1451.0e6],
      gdp: [476.6e9, 820.4e9, 1708.5e9, 2103.6e9, 2675.3e9, 3567.6e9, 3909.9e9],
      gdpPerCapita: [450, 714, 1377, 1584, 1907, 2481, 2696],
      lifeExpectancy: [62.6, 65.5, 67.7, 69.4, 70.2, 72.0, 72.2],
      internet: [0.5, 2.4, 7.5, 14.9, 43.0, 55.3, 58.0],
    },
    ageShares: [25.3, 67.8, 6.9], sectorShares: [16.3, 28.3, 55.4],
  },
  JP: {
    name: 'Japan', capital: 'Tokyo', region: 'East Asia', currency: 'Japanese yen (JPY)', areaKm2: 377930,
    values: {
      population: { v: 123975371, y: 2024 }, gdp: { v: 4026e9, y: 2024 }, gdpPerCapita: { v: 32498, y: 2024 },
      gdpGrowth: { v: 0.1, y: 2024 }, inflation: { v: 2.7, y: 2024 }, unemployment: { v: 2.5, y: 2024 },
      lifeExpectancy: { v: 84.0, y: 2023 }, literacy: { v: 99.0, y: 2022 }, fertility: { v: 1.2, y: 2023 },
      urbanShare: { v: 92.0, y: 2024 }, internet: { v: 85.0, y: 2023 }, electricity: { v: 100, y: 2023 },
      healthSpending: { v: 11.5, y: 2022 }, educationSpending: { v: 3.2, y: 2021 },
      co2PerCapita: { v: 8.0, y: 2023 }, under5Mortality: { v: 2.6, y: 2023 },
    },
    series: {
      population: [126.8e6, 127.8e6, 128.1e6, 127.1e6, 125.8e6, 124.5e6, 124.0e6],
      gdp: [4888e9, 4755e9, 5759e9, 4445e9, 5049e9, 4231e9, 4026e9],
      gdpPerCapita: [38547, 37205, 44968, 34971, 40136, 33987, 32498],
      lifeExpectancy: [81.1, 82.0, 83.0, 83.9, 84.6, 84.0, 84.1],
      internet: [30.0, 66.8, 78.2, 82.9, 82.9, 85.0, 85.5],
    },
    ageShares: [11.4, 59.4, 29.2], sectorShares: [1.0, 27.0, 72.0],
  },
  BR: {
    name: 'Brazil', capital: 'Brasília', region: 'South America', currency: 'Brazilian real (BRL)', areaKm2: 8515767,
    values: {
      population: { v: 216422446, y: 2024 }, gdp: { v: 2171.9e9, y: 2024 }, gdpPerCapita: { v: 10036, y: 2024 },
      gdpGrowth: { v: 3.4, y: 2024 }, inflation: { v: 4.4, y: 2024 }, unemployment: { v: 6.6, y: 2024 },
      lifeExpectancy: { v: 75.8, y: 2023 }, literacy: { v: 94.7, y: 2022 }, fertility: { v: 1.6, y: 2023 },
      urbanShare: { v: 87.9, y: 2024 }, internet: { v: 86.6, y: 2023 }, electricity: { v: 99.8, y: 2023 },
      healthSpending: { v: 9.7, y: 2022 }, educationSpending: { v: 5.5, y: 2022 },
      co2PerCapita: { v: 2.3, y: 2023 }, under5Mortality: { v: 14.5, y: 2023 },
    },
    series: {
      population: [174.0e6, 186.8e6, 196.8e6, 204.5e6, 211.6e6, 216.4e6, 216.4e6],
      gdp: [655.5e9, 891.6e9, 2208.7e9, 1802.2e9, 1476.1e9, 2173.7e9, 2171.9e9],
      gdpPerCapita: [3767, 4773, 11223, 8813, 6976, 10044, 10036],
      lifeExpectancy: [70.1, 72.3, 74.2, 75.4, 74.0, 75.8, 76.0],
      internet: [2.9, 21.0, 40.7, 58.3, 81.3, 86.6, 87.5],
    },
    ageShares: [20.0, 69.4, 10.6], sectorShares: [6.2, 22.5, 71.3],
  },
  DE: {
    name: 'Germany', capital: 'Berlin', region: 'Europe', currency: 'Euro (EUR)', areaKm2: 357588,
    values: {
      population: { v: 83516174, y: 2024 }, gdp: { v: 4660e9, y: 2024 }, gdpPerCapita: { v: 55808, y: 2024 },
      gdpGrowth: { v: -0.2, y: 2024 }, inflation: { v: 2.2, y: 2024 }, unemployment: { v: 3.4, y: 2024 },
      lifeExpectancy: { v: 81.4, y: 2023 }, literacy: { v: 99.0, y: 2022 }, fertility: { v: 1.4, y: 2023 },
      urbanShare: { v: 77.8, y: 2024 }, internet: { v: 93.0, y: 2023 }, electricity: { v: 100, y: 2023 },
      healthSpending: { v: 12.7, y: 2022 }, educationSpending: { v: 4.5, y: 2022 },
      co2PerCapita: { v: 6.7, y: 2023 }, under5Mortality: { v: 3.7, y: 2023 },
    },
    series: {
      population: [82.2e6, 82.5e6, 81.8e6, 82.2e6, 83.2e6, 84.5e6, 83.5e6],
      gdp: [1945e9, 2860e9, 3417e9, 3364e9, 3889e9, 4526e9, 4660e9],
      gdpPerCapita: [23662, 34667, 41773, 40925, 46743, 53562, 55808],
      lifeExpectancy: [78.5, 79.9, 80.6, 81.0, 81.1, 81.4, 81.5],
      internet: [30.2, 69.4, 82.0, 87.6, 91.4, 93.0, 93.5],
    },
    ageShares: [14.0, 63.6, 22.4], sectorShares: [0.9, 26.7, 72.4],
  },
  ZA: {
    name: 'South Africa', capital: 'Pretoria (administrative)', region: 'Southern Africa', currency: 'South African rand (ZAR)', areaKm2: 1221037,
    values: {
      population: { v: 63100000, y: 2024 }, gdp: { v: 400.3e9, y: 2024 }, gdpPerCapita: { v: 6345, y: 2024 },
      gdpGrowth: { v: 0.5, y: 2024 }, inflation: { v: 4.4, y: 2024 }, unemployment: { v: 32.1, y: 2024 },
      lifeExpectancy: { v: 66.1, y: 2023 }, literacy: { v: 95.0, y: 2022 }, fertility: { v: 2.4, y: 2023 },
      urbanShare: { v: 68.9, y: 2024 }, internet: { v: 75.7, y: 2023 }, electricity: { v: 94.7, y: 2023 },
      healthSpending: { v: 8.6, y: 2022 }, educationSpending: { v: 6.2, y: 2022 },
      co2PerCapita: { v: 7.2, y: 2023 }, under5Mortality: { v: 35.0, y: 2023 },
    },
    series: {
      population: [44.8e6, 49.5e6, 52.0e6, 55.6e6, 59.3e6, 62.0e6, 63.1e6],
      gdp: [151.3e9, 257.9e9, 375.3e9, 317.6e9, 302.1e9, 380.9e9, 400.3e9],
      gdpPerCapita: [3377, 5210, 7217, 5712, 5095, 6144, 6345],
      lifeExpectancy: [57.0, 54.7, 57.7, 62.2, 64.9, 66.1, 66.3],
      internet: [5.3, 7.9, 24.0, 52.0, 68.2, 75.7, 77.0],
    },
    ageShares: [26.9, 67.6, 5.5], sectorShares: [2.6, 26.5, 70.9],
  },
};

SA.COUNTRY_ORDER = ['NG', 'US', 'GB', 'IN', 'JP', 'BR', 'DE', 'ZA'];
SA.AGE_LABELS = ['Ages 0–14', 'Ages 15–64', 'Ages 65+'];
SA.SECTOR_LABELS = ['Agriculture', 'Industry', 'Services'];
