import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import PropTypes from 'prop-types';

import PreupgradeReportsList from '../PreupgradeReportsList';

const PreupgradeReports = ({ preupgradeReports, loading, error }) => {
  if (Object.keys(error).length > 0) {
    return (
      <MessageBox
        key="preupgrade-reports-error"
        icontype="error-circle-o"
        msg={`Could not retrieve data: ${error.statusText} - ${error.errorMsg}`}
      />
    );
  }

  return <PreupgradeReportsList preupgradeReports={preupgradeReports} />;
};

PreupgradeReports.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

export default PreupgradeReports;
