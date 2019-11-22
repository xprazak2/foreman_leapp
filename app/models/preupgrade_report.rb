# frozen_string_literal: true

class PreupgradeReport < ::Report
  has_many :preupgrade_report_entries, dependent: :destroy

  def self.create_report(host, date, status, data)
    report = PreupgradeReport.create(:host => host,
                                     :reported_at => date,
                                     :status => status)
    data[:entries]&.each do |entry|
      data = entry.slice(:title, :actor, :summary, :audience, :severity)
                  .merge(:preupgrade_report => report,
                         :hostname => host.hostname,
                         :tags => entry[:tags].to_json,
                         :detail => entry[:detail].to_json,
                         :leapp_run_id => data[:leapp_run_id])
      data.permit!
      PreupgradeReportEntry.create! data
    end
    report.save!
    report
  end
end
