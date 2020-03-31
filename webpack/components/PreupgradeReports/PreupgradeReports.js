import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import { LoadingState, Row } from 'patternfly-react';
import PropTypes from 'prop-types';

import PreupgradeReportsList from '../PreupgradeReportsList';
import FixAllButton from './components/FixAllButton';

import {
  flattenEntries,
  isEmpty,
  anyEntriesFixable,
} from './PreupgradeReportsHelpers';

const PreupgradeReports = ({
  preupgradeReports,
  loading,
  error,
  csrfToken,
  newJobInvocationUrl,
}) => {
  if (!isEmpty(error)) {
    return (
      <MessageBox
        key="preupgrade-reports-error"
        icontype="error-circle-o"
        msg={`Could not retrieve data: ${error.statusText} - ${error.errorMsg}`}
      />
    );
  }

  return (
    <LoadingState loading={loading}>
      <Row>
        <div className="title-filter col-md-4">&nbsp;</div>
        <div id="title_action" className="col-md-8">
          <div className="btn-toolbar pull-right">
            <FixAllButton
              postUrl={newJobInvocationUrl}
              disabled={!anyEntriesFixable(preupgradeReports)}
              csrfToken={csrfToken}
              preupgradeReports={preupgradeReports}
            />
          </div>
        </div>
      </Row>
      <PreupgradeReportsList allEntries={flattenEntries(preupgradeReports)} />
    </LoadingState>
  );
};

PreupgradeReports.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  csrfToken: PropTypes.string.isRequired,
  newJobInvocationUrl: PropTypes.string.isRequired,
};

export default PreupgradeReports;
