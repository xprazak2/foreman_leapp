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
  entriesPage,
  filterEntries,
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
  'should return entries page': () =>
    entriesPage(flattenEntries(preupgradeReports), { page: 2, perPage: 3 }),
  'should filter entries by title': () =>
    filterEntries('title', 'broken', flattenEntries(preupgradeReports)),
  'should filter entries by severity': () =>
    filterEntries('severity', 'medium', flattenEntries(preupgradeReports)),
  'should filter entries by host': () =>
    filterEntries('hostname', 'foo', flattenEntries(preupgradeReports)),
  'should filter entries by remediations': () =>
    filterEntries('fix', 'command', flattenEntries(reportsWithRemediations)),
  'should filter entries by inhibitor': () =>
    filterEntries('inhibitor', 'yes', flattenEntries(preupgradeReports))
};

describe('PreupgradeReportsHelpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
