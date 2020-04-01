import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PreupgradeReports from './PreupgradeReports';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
  selectFixAllWorking,
  selectFixAllError,
} from './PreupgradeReportsSelectors';

import { getPreupgradeReports, postFixEntries } from './PreupgradeReportsActions';

const WrappedPreupgradeReports = ({ url, jobInvocationsUrl }) => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state =>
    selectPreupgradeReports(state)
  );
  const error = useSelector(state => selectError(state));
  const fixAllWorking = useSelector(state => selectFixAllWorking(state));
  const fixAllError = useSelector(state => selectFixAllError(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreupgradeReports(url));
  }, [url]);

  const onFixEntries = (postData) => dispatch(postFixEntries(jobInvocationsUrl, postData));

  return (
    <PreupgradeReports
      preupgradeReports={preupgradeReports}
      error={error}
      loading={loading}
      onFixEntries={onFixEntries}
      fixAllWorking={fixAllWorking}
      fixAllError={fixAllError}
    />
  );
};

WrappedPreupgradeReports.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WrappedPreupgradeReports;
