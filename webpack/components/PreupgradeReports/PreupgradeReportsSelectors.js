export const selectPreupgrade = state => state.foremanLeapp.preupgrade;

export const selectPreupgradeReports = state =>
  selectPreupgrade(state).preupgradeReports;

export const selectLoadingPreupgradeReports = state =>
  selectPreupgrade(state).loadingPreupgradeReports;
export const selectError = state => selectPreupgrade(state).error;

export const selectFixAllWorking = state =>
  selectPreupgrade(state).fixAllWorking;

export const selectFixAllError = state => selectPreupgrade(state).fixAllError;

export const selectFixAllErrorMsg = state => selectFixAllError(state).mesasage;
