import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import PropTypes from 'prop-types';
import { Button, Row } from 'patternfly-react';

// import { uniq } from 'lodash';

import { translate as __ } from 'foremanReact/common/I18n';

import PreupgradeReportsList from '../PreupgradeReportsList';

const PreupgradeReports = ({ preupgradeReports, loading, error, onFixEntries }) => {
  const flattenEntries = reports => {
    return preupgradeReports.reduce(
      (memo, report) => [...memo, ...report.entries],
      []
    );
  }

  if (Object.keys(error).length > 0) {
    return (
      <MessageBox
        key="preupgrade-reports-error"
        icontype="error-circle-o"
        msg={`Could not retrieve data: ${error.statusText} - ${error.errorMsg}`}
      />
    );
  }

  const onFixAll = (reports) => {
    console.log(reports);
    const hostIds = reports.map(report => report.hostId);
    const flattEntries = flattenEntries(reports);
    console.log(flattEntries);
  }

  return (
    <React.Fragment>
      <Row>
      <div className="title-filter col-md-4">&nbsp;</div>
      <div id="title_action" className="col-md-8">
        <div className="btn-toolbar pull-right">
          <Button onClick={() => onFixAll(preupgradeReports)}>{__('Fix All')}</Button>
        </div>
      </div>
      </Row>
      <PreupgradeReportsList allEntries={flattenEntries(preupgradeReports)} />
    </React.Fragment>
  );
};

PreupgradeReports.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

export default PreupgradeReports;
