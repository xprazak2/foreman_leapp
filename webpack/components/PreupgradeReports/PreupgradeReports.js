import React, { useState } from 'react';
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
  idsForInvocationFromReports,
  idsForInvocationFromEntries,
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

  const [checked, setChecked] = useState([]);

  const isSelected = entry => checked.some(item => item.id === entry.id);

  const anySelected = checked.length > 0;

  const toggleSelected = (entry, isEntrySelected) => {
    if (isEntrySelected) {
      setChecked(checked.filter(item => item.id !== entry.id));
    } else {
      setChecked([entry, ...checked]);
    }
  };

  const onFixAll = reports => {
    const ids = idsForInvocationFromReports(reports);

    onFix(ids);
  };

  const onFixSelected = () => {
    const ids = idsForInvocationFromEntries(checked);

    onFix(ids);
  };

  const onFix = async ids => {
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
              onClick={() => onFixSelected()}
              disabled={!anyEntriesFixable(preupgradeReports) || fixAllWorking || !anySelected}
            >
              {__('Fix Selected')}
            </Button>
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
        isSelected={isSelected}
        toggleSelected={toggleSelected}
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
