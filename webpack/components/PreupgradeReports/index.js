import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreupgradeReports from './PreupgradeReports';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
} from './PreupgradeReportsSelectors';

import {
  getPreupgradeReports
} from './PreupgradeReportsActions';

const WrappedPreupgradeReports = props => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state => selectPreupgradeReports(state));
  const error = useSelector(state => selectError(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreupgradeReports(props.url));
  }, [props.url]);

  return (
    <PreupgradeReports
      preupgradeReports={preupgradeReports}
      error={error}
      loading={loading}
      {...props}
    />
  );
}

export default WrappedPreupgradeReports;