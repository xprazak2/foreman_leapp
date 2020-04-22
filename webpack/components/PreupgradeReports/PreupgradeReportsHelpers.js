import Immutable from 'seamless-immutable';

export const flattenEntries = reports =>
  reports.reduce((memo, report) => [...memo, ...report.entries], []);

const entryWithFixKind = kind => entry =>
  entry.detail &&
  entry.detail.remediations &&
  entry.detail.remediations.some(remediation => remediation.type === kind);

export const entryFixable = entryWithFixKind('command');

export const isEmpty = obj => Object.keys(obj).length === 0;

export const anyEntriesFixable = reports =>
  reportsToEntries(reports, Array.prototype.some, entryFixable);

export const fixableEntries = reports =>
  reportsToEntries(reports, Array.prototype.filter, entryFixable);

const reportsToEntries = (reports, iterator, predicate) =>
  iterator.call(flattenEntries(reports), predicate);

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

  return entries.filter(entry =>
    entry[attribute].toLowerCase().includes(value.toLowerCase())
  );
};

export const byText = attribute => (first, second) => {
  const firstAttr = first[attribute].toLowerCase();
  const secondAttr = second[attribute].toLowerCase();

  if (firstAttr < secondAttr) {
    return -1;
  }

  if (firstAttr > secondAttr) {
    return 1;
  }
  return 0;
};

export const bySeverity = attribute => (first, second) => {
  const sevList = ['info', 'low', 'medium', 'high'];

  const firstAttr = first[attribute].toLowerCase();
  const secondAttr = second[attribute].toLowerCase();

  return sevList.indexOf(firstAttr) - sevList.indexOf(secondAttr);
};

export const byFix = (first, second) => {
  const firstAttr = first.detail && first.detail.remediations;
  const secondAttr = second.detail && second.detail.remediations;

  if (firstAttr === secondAttr) {
    return 0;
  }

  if (firstAttr) {
    return -1;
  }
  return 1;
};

export const sortEntries = (entries, sort) => {
  const entriesCopy = Immutable.asMutable(entries);

  if (!sort.attribute) {
    return entriesCopy;
  }

  let sorted;

  if (['title', 'hostname'].includes(sort.attribute)) {
    sorted = entriesCopy.sort(byText(sort.attribute));
  }

  if (sort.attribute === 'severity') {
    sorted = entriesCopy.sort(bySeverity(sort.attribute));
  }

  if (sort.attribute === 'fix') {
    sorted = entriesCopy.sort(byFix);
  }
  return sort.order === 'asc' ? sorted : sorted.reverse();
};
