# frozen_string_literal: true

class PreupgradeReport < ::Report
  has_many :preupgrade_report_entries, dependent: :destroy

  def self.create_report(host, date, status, data)
    report = PreupgradeReport.create(:host => host,
                                     :reported_at => date,
                                     :status => status)
    data[:entries]&.each do |entry|
      PreupgradeReportEntry.create!(:preupgrade_report => report,
                                    :hostname => host.hostname,
                                    :title => entry[:title],
                                    :actor => entry[:actor],
                                    :summary => entry[:summary],
                                    :audience => entry[:audience],
                                    :severity => entry[:severity],
                                    :tags => entry[:tags],
                                    :detail => entry[:detail],
                                    :leapp_run_id => data[:leapp_run_id])
    end
    report.save!
    report
  end
end
