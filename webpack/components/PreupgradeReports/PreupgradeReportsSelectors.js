export const selectPreupgrade = state => state.foremanLeapp.preupgrade;

export const selectPreupgradeReports = state =>
  selectPreupgrade(state).preupgradeReports;

export const selectLoadingPreupgradeReports = state =>
  selectPreupgrade(state).loadingPreupgradeReports;
export const selectError = state => selectPreupgrade(state).error;

export const selectReportsExpected = state =>
  selectPreupgrade(state).reportsExpected;

export const selectRexState = state => state.foremanRemoteExecutionReducers;

export const selectJobInvocations = state =>
  selectRexState(state).jobInvocations;
export const selectJobInvocationsPolling = state =>
  selectJobInvocations(state).isPolling;
