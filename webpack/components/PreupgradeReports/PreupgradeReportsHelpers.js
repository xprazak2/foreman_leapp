export const flattenEntries = reports =>
  reports.reduce((memo, report) => [...memo, ...report.entries], []);

const entryWithFixKind = kind => entry =>
  entry.detail &&
  entry.detail.remediations &&
  entry.detail.remediations.some(remediation => remediation.type === kind);

export const entryFixable = entryWithFixKind('command');

export const isEmpty = obj => Object.keys(obj).length === 0;

export const anyEntriesFixable = reports =>
  flattenEntries(reports).some(entryFixable);

export const idsForInvocation = reports =>
  reports.reduce(
    (memo, report) => {
      report.entries.forEach(entry => {
        if (entryFixable(entry)) {
          memo.entryIds = [...memo.entryIds, entry.id];

          if (!memo.hostIds.includes(report.hostId)) {
            memo.hostIds = [...memo.hostIds, report.hostId];
          }
        }
      });
      return memo;
    },
    { hostIds: [], entryIds: [] }
  );

export const entriesPage = (entries, pagination) => {
  const offset = (pagination.page - 1) * pagination.perPage;

  return entries.slice(offset, offset + pagination.perPage);
};

export const filterEntries = (attribute, value, entries) => {
  if (!value) {
    return entries;
  }

  if (attribute === 'fix') {
    return entries.filter(entryWithFixKind(value));
  }

  return entries.filter(entry =>
    entry[attribute].toLowerCase().includes(value.toLowerCase())
  );
};
