# frozen_string_literal: true

module Utils
  extend ActiveSupport::Concern

  def last_report(host_id, date = nil)
    res = {}
    report = PreupgradeReport.where(:host => host_id).order(:reported_at).last
    unless report.nil?
      res = full_report(report) if date.nil? || date && report.reported_at.to_f >= date.to_f
    end
    res
  end

  def full_report(report)
    report.nil? ? {} : report.attributes.merge('entries': report.preupgrade_report_entries)
  end
end
