import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import PropTypes from 'prop-types';
import { Button, Row, Spinner } from 'patternfly-react';

import { translate as __ } from 'foremanReact/common/I18n';

import './PreupgradeReports.scss';

import PreupgradeReportsList from '../PreupgradeReportsList';
import FixAlert from './components/FixAlert';

import {
  invocationFactory,
  flattenEntries,
  isEmpty,
  anyEntriesFixable,
  idsForInvocation,
} from './PreupgradeReportsHelpers';

import { PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS } from '../../consts';

const PreupgradeReports = ({
  preupgradeReports,
  loading,
  error,
  onFixEntries,
  fixAllWorking,
  fixAllError,
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

  const onFixAll = async reports => {
    const ids = idsForInvocation(reports);

    const action = await onFixEntries(invocationFactory(ids));

    if (action.type === PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS) {
      window.location.pathname = `/job_invocations/${action.payload.id}`;
    }
  };

  return (
    <React.Fragment>
      <Row>
        <div className="title-filter col-md-4">&nbsp;</div>
        <div id="title_action" className="col-md-8">
          <div className="btn-toolbar pull-right">
            {fixAllWorking && (
              <div id="toolbar-spinner">
                <Spinner loading size="sm" />
              </div>
            )}
            <Button
              onClick={() => onFixAll(preupgradeReports)}
              disabled={!anyEntriesFixable(preupgradeReports) || fixAllWorking}
            >
              {__('Fix All')}
            </Button>
          </div>
        </div>
      </Row>
      {!isEmpty(fixAllError) && <FixAlert message={fixAllError.message} />}
      <PreupgradeReportsList
        allEntries={flattenEntries(preupgradeReports)}
        fixAllWorking={fixAllWorking}
      />
    </React.Fragment>
  );
};

PreupgradeReports.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  onFixEntries: PropTypes.func.isRequired,
  fixAllWorking: PropTypes.bool.isRequired,
  fixAllError: PropTypes.object.isRequired,
};

export default PreupgradeReports;
