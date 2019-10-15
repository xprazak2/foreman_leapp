class PreupgradeReport < ::Report
  has_many :preupgrade_report_entries

  def self.create_report(host, date, status, data)
    report = PreupgradeReport.create(:host => host,
                                     :reported_at => date,
                                     :status => status)
    if data[:entries]
      data[:entries].each do |entry|
        PreupgradeReportEntry.create!(:preupgrade_report => report,
                                      :hostname => host.hostname,
                                      :title => entry[:title],
                                      :actor => entry[:actor],
                                      :summary => entry[:summary],
                                      :audience => entry[:audience],
                                      :severity => entry[:severity],
                                      :tags => entry[:tags],
                                      :details => entry[:details],
                                      :leapp_run_id => data[:leapp_run_id])
      end
    end
    report.save!
    return report
  end
end
