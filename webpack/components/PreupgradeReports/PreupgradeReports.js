import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import PropTypes from 'prop-types';
import { Button, Row, Spinner, Alert } from 'patternfly-react';

import { deepPropsToSnakeCase } from 'foremanReact/common/helpers';

import { translate as __ } from 'foremanReact/common/I18n';

import './PreupgradeReports.scss';

import PreupgradeReportsList from '../PreupgradeReportsList';
import FixAlert from './components/FixAlert';

import {
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS,
  PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_FAILURE,
} from '../../consts';

const PreupgradeReports = ({ preupgradeReports, loading, error, onFixEntries, fixAllWorking, fixAllError }) => {
  const flattenEntries = reports => {
    return preupgradeReports.reduce(
      (memo, report) => [...memo, ...report.entries],
      []
    );
  };

  const entryFixable = entry => {
    return entry.detail && entry.detail.remediations && entry.detail.remediations.some(remediation => remediation.type === 'command');
  };

  const isEmpty = obj => Object.keys(obj).length === 0;

  if (!isEmpty(error)) {
    return (
      <MessageBox
        key="preupgrade-reports-error"
        icontype="error-circle-o"
        msg={`Could not retrieve data: ${error.statusText} - ${error.errorMsg}`}
      />
    );
  }

  const anyEntriesFixable = reports => {
    return flattenEntries(reports).some(entryFixable);
  };

  const onFixAll = (reports) => {
    console.log(reports);

    const res = reports.reduce((memo, report) => {
      report.entries.map(entry => {
        if (entryFixable(entry)) {
          memo.entryIds = [...memo.entryIds, entry.id];

          if (!memo.hostIds.includes(report.hostId)) {
            memo.hostIds = [...memo.hostIds, report.hostId];
          }
        }
      });
      return memo;
    }, { hostIds: [], entryIds: [] });

    const invocationFactory = ({ hostIds, entryIds }) => {
      return deepPropsToSnakeCase({
        jobInvocation: {
          hostIds,
          feature: 'leapp_remediation_plan',
          inputs: {
            remediationIds: entryIds,
          },
        },
      });
    };

    onFixEntries(invocationFactory(res)).then((action) => {
      console.log(response);
      if (action.type === PREUPGRADE_REPORTS_REMEDIATE_ENTRIES_SUCCESS) {
        console.log('redirect!')
      // window.location.pathname = `/job_invocations/${response.id}`;
        return;
      }

      console.log('No redirect as we have errors :(')
    });
  }

  return (
    <React.Fragment>
      <Row>
      <div className="title-filter col-md-4">&nbsp;</div>
      <div id="title_action" className="col-md-8">
        <div className="btn-toolbar pull-right">
          { fixAllWorking && (
            <div id="toolbar-spinner">
              <Spinner loading size="sm" />
            </div>
          )}
          <Button onClick={() => onFixAll(preupgradeReports)} disabled={!anyEntriesFixable(preupgradeReports) || fixAllWorking}>{__('Fix All')}</Button>
        </div>
      </div>
      </Row>
      {!isEmpty(fixAllError) && <FixAlert message={fixAllError.message} />}
      <PreupgradeReportsList allEntries={flattenEntries(preupgradeReports)} fixAllWorking={fixAllWorking} />
    </React.Fragment>
  );
};

PreupgradeReports.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

export default PreupgradeReports;
