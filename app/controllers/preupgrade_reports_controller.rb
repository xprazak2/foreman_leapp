class PreupgradeReportsController < ::Api::V2::BaseController
  include Utils

  def index
    @preupgrade_reports = resource_scope.search_for(*search_options)
    render :json => @preupgrade_reports.map { |report| full_report(report) }
  end
end
