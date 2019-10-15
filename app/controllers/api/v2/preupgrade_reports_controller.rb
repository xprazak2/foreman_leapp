module Api
  module V2
    class PreupgradeReportsController < ::Api::V2::BaseController
      def create
        date = DateTime.now
        host_name_or_id = params['host']
        status = params['status']
        host = Host.where(:name => host_name_or_id).or(Host.where(:id => host_name_or_id)).first
        report = PreupgradeReport.create_report(host, date, status, params['preupgrade_report'])
        render :json => report
      end

      def show
        report = PreupgradeReport.find(params['id'])
        full_report = report.attributes.merge('entries': report.preupgrade_report_entries)
        render :json => full_report
      end
    end
  end
end
