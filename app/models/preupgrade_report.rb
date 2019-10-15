class PreupgradeReport < ::Report
  has_many :preupgrade_report_entries
  has_many :messages, :through => :preupgrade_report_entries

  def self.create_report(host, date, status, data)
    report = PreupgradeReport.create(:host => host,
                                     :reported_at => date,
                                     :status => status)
    if data[:entries]
      data[:entries].each do |entry|
        # XXX FIXME might be removed
        msg = Message.find_or_create(entry[:title])
        msg.attributes = {}
        msg.save!
        PreupgradeReportEntry.create!(:message => msg,
                                      :preupgrade_report => report,
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
