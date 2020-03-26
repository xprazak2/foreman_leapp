# frozen_string_literal: true

module Api
  module V2
    class PreupgradeReportsController < ::Api::V2::BaseController
      include Utils
      before_action :resolve_host, only: %i[create show_last_report]

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
        render :json => full_report(PreupgradeReport.find(params['id']))
      end

      def index
        render :json => [PreupgradeReport.all.map { |report| full_report(report) }]
      end

      def show_last_report
        if @host.nil?
          render :json => { "error": format("Couldn't find host %<host>s", host: params['host']) }
        else
          render :json => last_report(@host)
        end
      end
    end
  end
end
