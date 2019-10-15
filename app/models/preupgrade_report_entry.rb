class PreupgradeReportEntry < ApplicationRecord
  belongs_to :preupgrade_report

  validates :preupgrade_report_id, :presence => true
end
