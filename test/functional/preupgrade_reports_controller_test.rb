require 'test_plugin_helper'

class PreupgradeReportsControllerTest < ActionController::TestCase
  setup do
    @host = FactoryBot.create :host
    FactoryBot.create :preupgrade_report, :host => @host
  end

  test "should get index" do
    get :index, :session => set_session_user
    response = ActiveSupport::JSON.decode(@response.body)
    assert_equal @host.id, response.first['host_id']
  end
end
