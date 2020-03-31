object @preupgrade_report_entry

attributes :id, :preupgrade_report_id, :host_id, :hostname, :title, :actor, :audience,
           :severity, :leapp_run_id, :summary, :created_at, :updated_at

node :tags do |entry|
  JSON.parse(entry.tags)
end

node :detail do |entry|
  JSON.parse(entry.detail)
end
