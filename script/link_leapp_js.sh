#!/bin/bash

# This script allows you to link your local leapp-report-ui
#
# This script designed to run using `npm run link-leapp-js` in foreman_leapp root

set -e

if [[ -z "${JS_LOCATION}" ]]; then # JS_LOCATION is empty
  JS_LOCATION="../leapp-report-ui"
  echo "JS_LOCATION is not defined, location \"${JS_LOCATION}\" instead"
elif [ ! -d "${JS_LOCATION}" ]; then
  echo "Can't find folder ${JS_LOCATION}"
  exit 1
fi

JS_INSTALL_LOCATION="$(pwd)/node_modules/leapp-report-ui"
JS_LOCATION="$(pwd)/${JS_LOCATION}"

if [ -L "${JS_INSTALL_LOCATION}" ]; then
  unlink $JS_INSTALL_LOCATION
fi

set -x

ln -s $JS_LOCATION $JS_INSTALL_LOCATION
