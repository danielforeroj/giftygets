export const mockTrackers = [
  { id: 'trk_1', name: 'LEGO Orchid', store: 'shop.example.com', status: 'WATCHING', last: '2h ago', next: 'in 50m', price: '$42' },
  { id: 'trk_2', name: 'Nintendo Switch OLED', store: 'gameshop.com', status: 'BACKOFF', last: '5m ago', next: 'in 2h', price: '$329' },
  { id: 'trk_3', name: 'Dyson Airwrap', store: 'beauty.store', status: 'ALERTED', last: '1h ago', next: 'in 4h', price: '$499' }
];

export const mockAlerts = [
  { id: 'alt_1', title: 'LEGO Orchid dropped to $39.99', when: '18 min ago', reason: 'Price cap matched and in stock' },
  { id: 'alt_2', title: 'Switch OLED available in white', when: '2 hours ago', reason: 'Variant matched + buyable verified' }
];

export const mockAgentTraces = [
  { id: 'trace_1', tracker: 'LEGO Orchid', status: 'SUCCEEDED', steps: ['FETCH_PAGE', 'EXTRACT_PRODUCT_JSON', 'VERIFY_BUYABLE', 'ALERT_GATE'] },
  { id: 'trace_2', tracker: 'Switch OLED', status: 'FAILED', steps: ['FETCH_PAGE', 'EXTRACT_PRODUCT_JSON', 'VERIFY_BUYABLE'] }
];
