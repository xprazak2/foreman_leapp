import api from 'foremanReact/API';
import { deepPropsToCamelCase } from 'foremanReact/common/helpers';

import {
  PREUPGRADE_REPORTS_REQUEST,
  PREUPGRADE_REPORTS_SUCCESS,
  PREUPGRADE_REPORTS_FAILURE,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_REQUEST,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_FAILURE,
} from '../../consts';

export const getPreupgradeReports = url => async dispatch => {
  dispatch({ type: PREUPGRADE_REPORTS_REQUEST });

  try {
    const { data } = await api.get(url);
    return dispatch({
      type: PREUPGRADE_REPORTS_SUCCESS,
      payload: deepPropsToCamelCase(data),
    });
  } catch (error) {
    return dispatch(errorHandler(PREUPGRADE_REPORTS_FAILURE, error));
  }
};

export const postFixEntries = (url, data) => async dispatch => {
  dispatch({ type: PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_REQUEST });

  try {
    const { data } = await api.post(url, data);
    return dispatch({
      type: PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS,
      payload: { succ: true },
    });
  } catch (error) {
    // error handling!!
    return dispatch({ type: PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_FAILURE, payload: { succ: false } });
  }
}

const errorHandler = (msg, err) => {
  const error = {
    errorMsg: 'Failed to fetch preupgrade reports from server.',
    statusText: err.response.statusText,
  };
  return { type: msg, payload: { error } };
};
