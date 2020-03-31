import Immutable from 'seamless-immutable';

export const selectPreupgrade = state => state.foremanLeapp.preupgrade;

export const selectPreupgradeReports = state =>
  selectPreupgrade(state).preupgradeReports.map(transfromEntryAttrs);

export const selectLoadingPreupgradeReports = state =>
  selectPreupgrade(state).loadingPreupgradeReports;
export const selectError = state => selectPreupgrade(state).error;


const transfromEntryAttrs = report => {
  const transformedEntries = report.entries.map(entry => {
    try {
      const tags = JSON.parse(entry.tags);
      const detail = JSON.parse(entry.datail);
    } catch(e) {
      console.error('Failed to parse report entry:', entry);
      return entry;
    }

    return ({ ...entry, tags, detail });
  });

  return ({ ...report, entries: transformedEntries });
}
