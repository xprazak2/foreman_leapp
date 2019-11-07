# frozen_string_literal: true

module Utils
  extend ActiveSupport::Concern

  def last_report(host_id, date = nil)
    full_report = {}
    report = PreupgradeReport.where(:host => host_id).order(:reported_at).last
    # XXX FIXME make sure date comparison is right
    unless report.nil? || !(date && report.reported_at.to_f >= date.to_f)
      full_report = report.attributes.merge('entries': report.preupgrade_report_entries)
    end
    full_report
  end
end
