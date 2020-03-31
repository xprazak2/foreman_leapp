import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';
import PropTypes from 'prop-types';
import { Button, Row } from 'patternfly-react';

import { deepPropsToSnakeCase } from 'foremanReact/common/helpers';

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

    const entryFixable = entry => {
      return entry.detail && entry.detail.remediations && entry.detail.remediations.some(remediation => remediation.type === 'command');
    };

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

    onFixEntries(invocationFactory(res)).then((response) => {
      console.log('redirect!')
      // window.location.pathname = `/job_invocations/${response.id}`;
    });
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
