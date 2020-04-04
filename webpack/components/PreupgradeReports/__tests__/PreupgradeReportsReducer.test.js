import { testReducerSnapshotWithFixtures } from '@theforeman/test';

import reducer, { initialState } from '../PreupgradeReportsReducer';

import {
  PREUPGRADE_REPORTS_REQUEST,
  PREUPGRADE_REPORTS_SUCCESS,
  PREUPGRADE_REPORTS_FAILURE,
} from '../../../consts';

import { preupgradeReports } from './PreupgradeReports.fixtures';

const fixtures = {
  'should return initial state': {
    state: initialState,
    action: {
      type: undefined,
      payload: [],
    },
  },
  'should start loading reports on request': {
    state: initialState,
    action: {
      type: PREUPGRADE_REPORTS_REQUEST,
    },
  },
  'should stop loading on reports success': {
    state: initialState.set('loadingPreupgradeReports', true),
    action: {
      type: PREUPGRADE_REPORTS_SUCCESS,
      payload: { results: preupgradeReports },
    },
  },
  'should show error on request failure': {
    state: initialState.set('loadingPreupgradeReports', true),
    action: {
      type: PREUPGRADE_REPORTS_FAILURE,
      payload: { error: { errorMsg: 'This is error', statusText: 'Not good' } },
    },
  },
};

describe('PreupgradeReportsReducer', () =>
  testReducerSnapshotWithFixtures(reducer, fixtures));
