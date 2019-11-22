# ForemanLeapp

This plugin allows to run inplace upgrades for rhel7 vms in foreman using leapp tool.
For more information about leapp check [github](https://github.com/oamg/leapp) or
[developer docs](https://leapp.readthedocs.io/en/latest/).

## Installation

See [How_to_Install_a_Plugin](http://projects.theforeman.org/projects/foreman/wiki/How_to_Install_a_Plugin)
for how to install Foreman plugins

## Usage

The plugin will add 2 remote execution jobs, "Run preupgrade via leapp" and "Run upgrade via leapp". Only
preupgrade reports storage and retrieval has been implemented so far.

After running a preupgrade remote execution job on one or more foreman hosts the report can be retrieved from foreman db.

The retrieval api looks like:

- to fetch a specific preupgrade report - GET http://FOREMAN_URL:FOREMAN_PORT/api/v2/preupgrade_reports/REPORT_ID.
- to fetch all reports for specific job invocation - GET http://FOREMAN_URL:FOREMAN_PORT/api/v2/aggregation/JOB_INVOCATION_ID.
- to fetch last preupgrade report per host - GET http://FOREMAN_URL:FOREMAN_PORT/api/v2/preupgrade_reports/hosts/HOST_NAME_OR_ID/last.

## TODO

- Unit tests
- Automate rubocop checks
- Frontend (either from scratch or adapt the react/patternfly/typescript one for cockpit upgrades)

## Contributing

Fork and send a Pull Request. Thanks!

## Copyright

Copyright (c) 2019 Inessa Vasilevskaya

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
