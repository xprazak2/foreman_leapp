import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import FixSelectedButton from './FixSelectedButton';

const fixtures = {
  'should render': {
    ids: { hostIds: [5], entryIds: [115] },
    postUrl: '/job_invocations/new',
    disabled: false,
    csrfToken: 'abcd',
  },
};

describe('FixSelectedButton', () =>
  testComponentSnapshotsWithFixtures(FixSelectedButton, fixtures));
