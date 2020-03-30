# frozen_string_literal: true

module ForemanLeapp
  JOB_CATEGORY = 'Leapp'

  class Engine < ::Rails::Engine
    engine_name 'foreman_leapp'

    config.autoload_paths += Dir["#{config.root}/app/controllers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/controllers/api/v2/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/helpers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/models/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/overrides"]
    config.autoload_paths += Dir["#{config.root}/test/"]

    # Add any db migrations
    initializer 'foreman_leapp.load_app_instance_data' do |app|
      ForemanLeapp::Engine.paths['db/migrate'].existent.each do |path|
        app.config.paths['db/migrate'] << path
      end
    end

    initializer 'foreman_leapp.register_plugin', :before => :finisher_hook do |_app|
      Foreman::Plugin.register :foreman_leapp do
        requires_foreman '>= 1.16'

        extend_template_helpers ForemanLeapp::TemplateHelper

        # add dashboard widget
        widget 'foreman_leapp_widget', name: N_('Foreman plugin template widget'), sizex: 4, sizey: 1

        extend_page "job_invocations/show" do |cx|
          cx.add_pagelet :main_tabs,
                         partial: "job_invocations/leapp_preupgrade_report",
                         name: _('Leapp preupgrade report'),
                         id: 'leapp_preupgrade_report',
                         onlyif: Proc.new { |subject| RemoteExecutionFeature.find_by(job_template_id: subject.template_invocations[0]&.template_id)&.label == 'leapp_preupgrade' }
        end
      end
    end

    # Include concerns in this config.to_prepare block
    config.to_prepare do
      begin
        Host::Managed.include ForemanLeapp::HostExtensions
        HostsHelper.prepend ForemanLeapp::HostsHelperExtensions
        Host::JobInvocation.include ForemanLeapp::JobInvocationExtensions
      rescue StandardError => e
        Rails.logger.warn "ForemanLeapp: skipping engine hook (#{e})"
      end

      RemoteExecutionFeature.register(
          :leapp_preupgrade,
          N_('Preupgrade check with Leapp'),
          :description => N_('Upgradeability check for RHEL 7 host'),
          :host_action_button => false
      )

      RemoteExecutionFeature.register(
          :leapp_upgrade,
          N_('Upgrade with Leapp'),
          :description => N_('Run Leapp upgrade job for RHEL 7 host'),
          :host_action_button => false
      )
    end

    rake_tasks do
      Rake::Task['db:seed'].enhance do
        ForemanLeapp::Engine.load_seed
      end
    end

    initializer 'foreman_leapp.register_gettext', after: :load_config_initializers do |_app|
      locale_dir = File.join(File.expand_path('../..', __dir__), 'locale')
      locale_domain = 'foreman_leapp'
      Foreman::Gettext::Support.add_text_domain locale_domain, locale_dir
    end

    initializer 'ForemanLeapp.require_dynflow',
                before: 'foreman_tasks.initialize_dynflow',
                after: 'foreman_remote_execution.require_dynflow' do |_app|
      ForemanTasks.dynflow.require!
      ForemanTasks.dynflow.config.eager_load_paths << File.join(ForemanLeapp::Engine.root, 'app/lib/actions')
    end
  end
end
