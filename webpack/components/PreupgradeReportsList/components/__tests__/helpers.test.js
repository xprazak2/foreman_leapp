import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import {
  tagInfo,
  hasRemediations,
  getTitle,
  getSeverity,
  getSummary,
  getTags,
  getExternals,
  getRemediations,
  severityToCssClass,
} from '../helpers';

import { reportEntry } from './PreupgradeReportEntry.fixtures';

const fixtures = {
  'should return css class for low severity': () => severityToCssClass('low'),
  'should return css class for medium severity': () =>
    severityToCssClass('medium'),
  'should return css class for high severity': () => severityToCssClass('high'),
  'should return css class for unknown severity': () =>
    severityToCssClass('foo'),
  'should return tag info': () => tagInfo(reportEntry.tags),
  'should detect if has remediations': () => hasRemediations(reportEntry),
  'should return title': () => getTitle(reportEntry),
  'should return severity': () => getSeverity(reportEntry),
  'should return summary': () => getSummary(reportEntry),
  'should return tags': () => getTags(reportEntry),
  'should return externals': () => getExternals(reportEntry),
  'should return remediations': () => getRemediations(reportEntry),
};

describe('PreupgradeReportList/helpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
