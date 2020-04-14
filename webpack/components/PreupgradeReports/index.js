import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PreupgradeReports from './PreupgradeReports';

import getCsrfToken from '../../csrf';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
  selectJobInvocationsPolling,
} from './PreupgradeReportsSelectors';

import { getPreupgradeReportsAction } from './PreupgradeReportsActions';

const WrappedPreupgradeReports = ({ url, newJobInvocationUrl }) => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state =>
    selectPreupgradeReports(state)
  );
  const error = useSelector(state => selectError(state));

  const invocationPending = useSelector(state =>
    selectJobInvocationsPolling(state)
  );

  const previousInvocationRef = useRef();
  useEffect(() => {
    previousInvocationRef.current = invocationPending;
  });

  const previousInvocationPending = previousInvocationRef.current;

  const dispatch = useDispatch();

  useEffect(() => {
    if (previousInvocationPending && !invocationPending) {
      dispatch(getPreupgradeReportsAction(url));
    }
  }, [dispatch, url, invocationPending, previousInvocationPending]);

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
