# frozen_string_literal: true

Rails.application.routes.draw do
  resources :preupgrade_reports, :only => %i[index]

  namespace :api, :defaults => { :format => 'json' } do
    scope '(:apiv)', :module => :v2, :defaults => { :apiv => 'v2' }, :apiv => /v2/,
                     :constraints => ApiConstraints.new(:version => 2, :default => true) do
      resources :preupgrade_reports, only: %i[show create]
      # XXX FIXME find a way to utilize built-in routing
      get '/preupgrade_reports/hosts/:host/last', :to => 'preupgrade_reports#show_last_report'
      get '/aggregation/:id', :to => 'aggregation#aggregate_by_invocation_id'
    end
  end
end
