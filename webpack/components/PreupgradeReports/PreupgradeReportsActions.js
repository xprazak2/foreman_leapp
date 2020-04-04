import api from 'foremanReact/API';
import { deepPropsToCamelCase } from 'foremanReact/common/helpers';

import {
  PREUPGRADE_REPORTS_REQUEST,
  PREUPGRADE_REPORTS_SUCCESS,
  PREUPGRADE_REPORTS_FAILURE,
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

const errorHandler = (msg, err) => {
  const error = {
    errorMsg: 'Failed to fetch preupgrade reports from server.',
    statusText: err.response.statusText,
  };
  return { type: msg, payload: { error } };
};
