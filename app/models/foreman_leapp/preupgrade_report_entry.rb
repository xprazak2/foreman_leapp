module ForemanLeapp
  class PreupgradeReportEntry < ApplicationRecord
    belongs_to :message
    belongs_to :preupgrade_report

    validates :message_id, :preupgrade_report_id, :presence => true
  end
end
