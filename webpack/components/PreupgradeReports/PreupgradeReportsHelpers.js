import { deepPropsToSnakeCase } from 'foremanReact/common/helpers';

export const invocationFactory = ({ hostIds, entryIds }) =>
  deepPropsToSnakeCase({
    jobInvocation: {
      hostIds,
      feature: 'leapp_remediation_plan',
      inputs: {
        remediationIds: entryIds,
      },
    },
  });

export const flattenEntries = reports =>
  reports.reduce((memo, report) => [...memo, ...report.entries], []);

export const entryFixable = entry =>
  entry.detail &&
  entry.detail.remediations &&
  entry.detail.remediations.some(remediation => remediation.type === 'command');

export const isEmpty = obj => Object.keys(obj).length === 0;

export const anyEntriesFixable = reports =>
  flattenEntries(reports).some(entryFixable);

export const idsForInvocation = reports =>
  reports.reduce(
    (memo, report) => {
      report.entries.map(entry => {
        if (entryFixable(entry)) {
          memo.entryIds = [...memo.entryIds, entry.id];

          if (!memo.hostIds.includes(report.hostId)) {
            memo.hostIds = [...memo.hostIds, report.hostId];
          }
        }
        return entry;
      });
      return memo;
    },
    { hostIds: [], entryIds: [] }
  );