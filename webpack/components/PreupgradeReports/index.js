import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PreupgradeReports from './PreupgradeReports';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
} from './PreupgradeReportsSelectors';

import { getPreupgradeReports } from './PreupgradeReportsActions';

const WrappedPreupgradeReports = ({ url }) => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state =>
    selectPreupgradeReports(state)
  );
  const error = useSelector(state => selectError(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreupgradeReports(url));
  }, [url]);

  return (
    <PreupgradeReports
      preupgradeReports={preupgradeReports}
      error={error}
      loading={loading}
    />
  );
};

WrappedPreupgradeReports.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WrappedPreupgradeReports;
