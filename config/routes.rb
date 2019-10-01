Rails.application.routes.draw do
  get 'api/v2/leapp/report/:id', to: 'foreman_leapp/api/v2/report#fetch'
  post 'api/v2/leapp/report', to: 'foreman_leapp/api/v2/report#create'
end
