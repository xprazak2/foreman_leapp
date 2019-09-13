module ForemanLeapp
  class Engine < ::Rails::Engine
    engine_name 'foreman_leapp'

    config.autoload_paths += Dir["#{config.root}/app/controllers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/helpers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/models/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/overrides"]

    # Add any db migrations
    initializer 'foreman_leapp.load_app_instance_data' do |app|
      ForemanLeapp::Engine.paths['db/migrate'].existent.each do |path|
        app.config.paths['db/migrate'] << path
      end
    end

    initializer 'foreman_leapp.register_plugin', :before => :finisher_hook do |_app|
      Foreman::Plugin.register :foreman_leapp do
        requires_foreman '>= 1.16'

        # Add permissions
        security_block :foreman_leapp do
          permission :view_foreman_leapp, :'foreman_leapp/hosts' => [:new_action]
        end

        # Add a new role called 'Discovery' if it doesn't exist
        role 'ForemanLeapp', [:view_foreman_leapp]

        # add menu entry
        menu :top_menu, :template,
             url_hash: { controller: :'foreman_leapp/hosts', action: :new_action },
             caption: 'ForemanLeapp',
             parent: :hosts_menu,
             after: :hosts

        # add dashboard widget
        widget 'foreman_leapp_widget', name: N_('Foreman plugin template widget'), sizex: 4, sizey: 1
      end
    end

    # Include concerns in this config.to_prepare block
    config.to_prepare do
      begin
        Host::Managed.send(:include, ForemanLeapp::HostExtensions)
        HostsHelper.send(:include, ForemanLeapp::HostsHelperExtensions)
      rescue => e
        Rails.logger.warn "ForemanLeapp: skipping engine hook (#{e})"
      end
    end

    rake_tasks do
      Rake::Task['db:seed'].enhance do
        ForemanLeapp::Engine.load_seed
      end
    end

    initializer 'foreman_leapp.register_gettext', after: :load_config_initializers do |_app|
      locale_dir = File.join(File.expand_path('../../..', __FILE__), 'locale')
      locale_domain = 'foreman_leapp'
      Foreman::Gettext::Support.add_text_domain locale_domain, locale_dir
    end
  end
end
