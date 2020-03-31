import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PreupgradeReports from './PreupgradeReports';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
} from './PreupgradeReportsSelectors';

import { getPreupgradeReports, postFixAll } from './PreupgradeReportsActions';

const WrappedPreupgradeReports = ({ url, jobInvocationsUrl }) => {
  const loading = useSelector(state => selectLoadingPreupgradeReports(state));
  const preupgradeReports = useSelector(state =>
    selectPreupgradeReports(state)
  );
  const error = useSelector(state => selectError(state));

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
    />
  );
};

WrappedPreupgradeReports.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WrappedPreupgradeReports;
