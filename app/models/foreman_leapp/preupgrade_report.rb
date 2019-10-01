module ForemanLeapp
  class PreupgradeReport < ::Report
    def self.create_report(host, date, status, data)
      report = PreupgradeReport.create(:host => host,
                                       :reported_at => date,
                                       :status => status)
      if data[:entries]
        data[:entries].each do |entry|
          msg = Message.find_or_create(entry[:title])
          # XXX FIXME add leapp-specific attributes
          msg.attributes = {}
          msg.save!
          log = Log.create!(:source_id => 'REX',
                            :message_id => msg.id,
                            :level => :info,
                            :report => report)
        end
      end
      return report
    end


    def self.find_report(report_id)
      return PreupgradeReport.where(:id => report_id).first
    end
  end
end
