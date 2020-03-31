object @preupgrade_report

extends "preupgrade_reports/base"

child :preupgrade_report_entries => :entries do
  extends "preupgrade_report_entries/base"
end