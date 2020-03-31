import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PreupgradeReports from './PreupgradeReports';

import getCsrfToken from '../../csrf';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
} from './PreupgradeReportsSelectors';

import { getPreupgradeReports } from './PreupgradeReportsActions';

const WrappedPreupgradeReports = ({ url, newJobInvocationUrl }) => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state =>
    selectPreupgradeReports(state)
  );
  const error = useSelector(state => selectError(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreupgradeReports(url));
  }, [url, dispatch]);

  return (
    <PreupgradeReports
      preupgradeReports={preupgradeReports}
      error={error}
      loading={loading}
      csrfToken={getCsrfToken()}
      newJobInvocationUrl={newJobInvocationUrl}
    />
  );
};

WrappedPreupgradeReports.propTypes = {
  url: PropTypes.string.isRequired,
  newJobInvocationUrl: PropTypes.string.isRequired,
};

export default WrappedPreupgradeReports;
