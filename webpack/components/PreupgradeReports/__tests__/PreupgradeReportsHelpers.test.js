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
  idsForInvocationFromReports,
  entriesPage,
  filterEntries,
  fixableEntries,
  sortEntries,
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
  'should collect ids for job invocation from reports': () =>
    idsForInvocationFromReports(preupgradeReports),
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
    filterEntries('inhibitor', 'yes', flattenEntries(preupgradeReports)),
  'should return fixable entries': () =>
    fixableEntries(reportsWithRemediations),
  'should sort entries by title in ascending order': () =>
    sortEntries(flattenEntries(preupgradeReports), {
      attribute: 'title',
      order: 'asc',
    }),
  'should sort entries by title in descending order': () =>
    sortEntries(flattenEntries(preupgradeReports), {
      attribute: 'title',
      order: 'desc',
    }),
  'should sort entries by hostname': () =>
    sortEntries(flattenEntries(preupgradeReports), {
      attribute: 'hostname',
      order: 'asc',
    }),
  'should sort entries by severity': () =>
    sortEntries(flattenEntries(preupgradeReports), {
      attribute: 'severity',
      order: 'asc',
    }),
  'should sort entries by remediations': () =>
    sortEntries(flattenEntries(reportsWithRemediations), {
      attribute: 'fix',
      order: 'asc',
    }),
};

describe('PreupgradeReportsHelpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
