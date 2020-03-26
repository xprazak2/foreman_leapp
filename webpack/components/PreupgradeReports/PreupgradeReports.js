import React from 'react';
import MessageBox from 'foremanReact/components/common/MessageBox';

import PreupgradeReportsList from '../PreupgradeReportsList';


const PreupgradeReports = props => {
  console.log(props);
  if (props.error) {
    return (
      <MessageBox
        key="preupgrade-reports-error"
        icontype="error-circle-o"
        msg={__(`Could not receive data: ${error}`)}
      />
    )
  }

  return (
    <PreupgradeReportsList preupgradeReports={props.preupgradeReports} />
  )
}

export default PreupgradeReports;
