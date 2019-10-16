# frozen_string_literal: true

module Api
  module V2
    class PreupgradeReportsController < ::Api::V2::BaseController
      before_action :resolve_host, only: [:create]
      def resolve_host
        host_name_or_id = params['host']
        @host = Host.where(:name => host_name_or_id).or(Host.where(:id => host_name_or_id)).first
      end

      def create
        date = DateTime.now.utc
        status = params['status']
        if @host.nil?
          render :json => { "error": format("Couldn't find host %<host>s", host: params['host']) }
        else
          report = PreupgradeReport.create_report(@host, date, status, params['preupgrade_report'])
          render :json => report
        end
      end

      def show
        report = PreupgradeReport.find(params['id'])
        full_report = report.attributes.merge('entries': report.preupgrade_report_entries)
        render :json => full_report
      end
    end
  end
end
