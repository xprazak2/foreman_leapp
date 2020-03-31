import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import {
  preupgradeReports,
  reportsWithRemediations,
} from './PreupgradeReports.fixtures';

import {
  flattenEntries,
  isEmpty,
  entryFixable,
  anyEntriesFixable,
  idsForInvocation,
} from '../PreupgradeReportsHelpers';

const fixtures = {
  'should return flattened entrues': () => flattenEntries(preupgradeReports),
  'should detect empty object': () => isEmpty({}),
  'should detect non-empty object': () => isEmpty({ foo: 'bar' }),
  'should detect entry is fixable': () =>
    entryFixable({ detail: { remediations: [{ type: 'command' }] } }),
  'should detect entry is not fixable when not having a command': () =>
    entryFixable({ detail: { remediations: [{ type: 'hint' }] } }),
  'should detect entry is not fixable when not having remediations': () =>
    !!entryFixable({ detail: {} }),
  'should detect no entry is fixable': () =>
    anyEntriesFixable(preupgradeReports),
  'should detect a fixable entry in reports': () =>
    anyEntriesFixable(reportsWithRemediations),
  'should collect ids for job invocation': () =>
    idsForInvocation(preupgradeReports),
};

describe('PreupgradeReportsHelpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
