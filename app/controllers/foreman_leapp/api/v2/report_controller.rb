module ForemanLeapp
  module Api
    module V2
      class ReportController < ::Api::V2::BaseController
  
        def create
          require 'date'
          date = DateTime.now
          host_name_or_id = params['host']
          # XXX find appropriate host by id or name
          host = Host.find_by(name: host_name_or_id) || Host.find_by(id: host_name_or_id)
          report = PreupgradeReport.create_report(host, date, status, params['report'])
          render :json => report
        end

        def fetch
          report = PreupgradeReport.find_report(params['id'])
          full_report = report.attributes.merge({'messages': report.messages})
          render :json => full_report
        end
      end
    end
  end
end
