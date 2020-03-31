import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import FixAllButton from './FixAllButton';

import { preupgradeReports } from '../__tests__/PreupgradeReports.fixtures';

const fixtures = {
  'should render': {
    preupgradeReports,
    postUrl: '/job_invocations/new',
    disabled: false,
    title: 'Button title',
    csrfToken: 'abcd',
  },
};

describe('FixAllButton', () =>
  testComponentSnapshotsWithFixtures(FixAllButton, fixtures));
