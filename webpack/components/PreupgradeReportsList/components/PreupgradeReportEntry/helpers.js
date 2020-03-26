import React from 'react';

import EmptyInfoItem from './EmptyInfoItem';
import StringInfoItem from './StringInfoItem';

export const itemIteratorId = (entry, ...rest) =>
  `${entry.id}-${entry.preupgradeReportId}-${rest.join('-')}`;

export const additionalInfo = entry => {
  const infoAttrs = ['title', 'severity'];

  return infoAttrs.map(attr => {
    const key = itemIteratorId(entry, attr);

    if (!entry[attr]) {
      return <EmptyInfoItem entry={entry} attr={attr} key={key} />;
    }

    switch (attr) {
      case 'title':
        return <StringInfoItem entry={entry} attr={attr} key={key} />;
      case 'severity':
        return <StringInfoItem entry={entry} attr={attr} key={key} />;
      default:
        return '';
    }
  });
};
