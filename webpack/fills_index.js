import React from 'react';
import { addGlobalFill } from 'foremanReact/components/common/Fill/GlobalFill';



addGlobalFill('jobInvocationsTabHeaderSlot', '[leapp]ReportTabHeader',   <li><a href="#leapp_upgrade" data-toggle="tab">In-Place Upgrade Reports</a></li>, 100);

addGlobalFill('jobInvocationsTabContentSlot', '[leapp]ReportTabContent', <div>TabContent</div>, 100);