# frozen_string_literal: true

class PreupgradeReportEntry < ApplicationRecord
  belongs_to :preupgrade_report

  validates :preupgrade_report_id, :presence => true
end
