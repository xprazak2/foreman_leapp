export const preupgradeReports = [
  {
    hostId: 5,
    entries: [
      { title: 'Fix me!', severity: 'Too severe to talk about', id: 42 },
      { title: 'I am broken too', severity: 'medium', id: 43 },
    ],
  },
  {
    hostId: 6,
    entries: [
      { title: 'Octocat is not happy', severity: 'high', id: 44 },
      { title: 'Not enough credits', severity: 'low', id: 45 },
    ],
  },
];

export const reportsWithRemediations = [
  {
    hostId: 5,
    entries: [
      {
        title: 'Fix me!',
        severity: 'Too severe to talk about',
        detail: { remediations: [{ type: 'hint' }] },
      },
      { title: 'I am broken too', severity: 'medium' },
    ],
  },
  {
    hostId: 6,
    entries: [
      {
        title: 'Octocat is not happy',
        severity: 'high',
        detail: { remediations: [{ type: 'command' }] },
      },
      { title: 'Not enough credits', severity: 'low' },
    ],
  },
];
