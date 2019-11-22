# frozen_string_literal: true

module Api
  module V2
    class AggregationController < ::Api::V2::BaseController
      include Utils
      def aggregate_by_invocation_id
        invoc_id = params[:id]
        reports = []
        job_invocation = JobInvocation.find(invoc_id)
        hosts = Hash[job_invocation.template_invocations.collect { |x| [x.host_id, x.host_name] }]
        hosts.each_key { |key| reports << last_report(key, job_invocation.start_at) }
        render :json => { "hosts": hosts, "reports": reports }
      end
    end
  end
end
