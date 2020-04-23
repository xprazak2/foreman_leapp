import Immutable from 'seamless-immutable';

import {
  PREUPGRADE_REPORTS_REQUEST,
  PREUPGRADE_REPORTS_SUCCESS,
  PREUPGRADE_REPORTS_FAILURE,
} from '../../consts';

export const initialState = Immutable({
  loadingPreupgradeReports: false,
  reportsExpected: false,
  preupgradeReports: [],
  error: {},
});

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case PREUPGRADE_REPORTS_REQUEST:
      return state.set('loadingPreupgradeReports', true);
    case PREUPGRADE_REPORTS_SUCCESS:
      return state.merge({
        loadingPreupgradeReports: false,
        preupgradeReports: payload.results,
        reportsExpected: true,
      });
    case PREUPGRADE_REPORTS_FAILURE:
      return state.merge({
        error: payload.error,
        loadingPreupgradeReports: false,
      });
    default:
      return state;
  }
};

export default reducer;
