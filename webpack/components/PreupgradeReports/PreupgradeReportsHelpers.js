export const flattenEntries = reports =>
  reports.reduce((memo, report) => [...memo, ...report.entries], []);

const entryWithFixKind = kind => entry =>
  entry.detail &&
  entry.detail.remediations &&
  entry.detail.remediations.some(remediation => remediation.type === kind);

export const entryFixable = entryWithFixKind('command');

export const isInhibitor = entry =>
  entry.flags && entry.flags.some(flag => flag === 'inhibitor');

export const byInhibitor = value => entry => {
  const inhibitsUpgrade = isInhibitor(entry);

  if (value === 'yes') {
    return inhibitsUpgrade;
  }

  if (value === 'no') {
    return !inhibitsUpgrade;
  }

  return true;
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const anyEntriesFixable = reports =>
  flattenEntries(reports).some(entryFixable);

export const idsForInvocationFromEntries = entries =>
  entries.reduce(
    (memo, entry) => {
      if (entryFixable(entry)) {
        memo.entryIds = [...memo.entryIds, entry.id];

        if (!memo.hostIds.includes(entry.hostId)) {
          memo.hostIds = [...memo.hostIds, entry.hostId];
        }
      }
      return memo;
    },
    { hostIds: [], entryIds: [] }
  );

export const idsForInvocationFromReports = reports =>
  idsForInvocationFromEntries(flattenEntries(reports));

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

  if (attribute === 'inhibitor') {
    return entries.filter(byInhibitor(value));
  }

  return entries.filter(entry =>
    entry[attribute].toLowerCase().includes(value.toLowerCase())
  );
};
