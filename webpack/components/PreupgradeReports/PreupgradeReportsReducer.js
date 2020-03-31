import Immutable from 'seamless-immutable';

import {
  PREUPGRADE_REPORTS_REQUEST,
  PREUPGRADE_REPORTS_SUCCESS,
  PREUPGRADE_REPORTS_FAILURE,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_REQUEST,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_FAILURE,
} from '../../consts';

export const initialState = Immutable({
  loadingPreupgradeReports: false,
  preupgradeReports: [],
  error: {},
  fixAllWorking: false,
  fixAllError: {},
});

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case PREUPGRADE_REPORTS_REQUEST:
      return state.set('loadingPreupgradeReports', true);
    case PREUPGRADE_REPORTS_SUCCESS:
      return state.merge({
        loadingPreupgradeReports: false,
        preupgradeReports: payload,
      });
    case PREUPGRADE_REPORTS_FAILURE:
      return state.merge({
        error: payload.error,
        loadingPreupgradeReports: false,
      });
    case PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_REQUEST:
      return state.set('fixAllWorking', true);
    case PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS:
      return state.set('fixAllWorking', false);
    case PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_FAILURE:
      return state.merge({
        fixAllWorking: false,
        fixAllError: { ...payload }, // what is payload???!
      });
    default:
      return state;
  }
};

export default reducer;
