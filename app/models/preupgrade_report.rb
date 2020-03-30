# frozen_string_literal: true

class PreupgradeReport < ::Report
  belongs_to :job_invocation
  has_many :preupgrade_report_entries, dependent: :destroy

  scoped_search :on => :job_invocation_id, :only_explicit => true

  def self.create_report(host, data, job_invocation_id)
    report = PreupgradeReport.create(host: host, status: 0,
                                     job_invocation_id: job_invocation_id,
                                     reported_at: DateTime.now.utc)
    entries = []

    data['entries']&.each do |entry|
      entries << entry.except('timeStamp', 'id')
                      .merge(preupgrade_report: report,
                             hostname: host.hostname,
                             leapp_run_id: data['leapp_run_id'])
    end

    PreupgradeReportEntry.create!(entries)
  end
end
