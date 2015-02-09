require 'rails'

module Bastion
  class Engine < ::Rails::Engine

    isolate_namespace Bastion

    initializer 'bastion.assets_dispatcher', :before => :build_middleware_stack do |app|
      app.middleware.use ::ActionDispatch::Static, "#{Bastion::Engine.root}/app/assets/javascripts/bastion"
    end

    initializer 'bastion.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{Bastion::Engine.root}/config/routes/mount_engine.rb"
      app.routes_reloader.paths.unshift("#{Bastion::Engine.root}/config/routes.rb")
    end

    initializer "bastion.assets", :group => :all do |app|
      if Rails.env.production?
        app.config.assets.paths << "#{Bastion::Engine.root}/vendor/assets/stylesheets/bastion"
      else
        app.config.less.paths << "#{Bastion::Engine.root}/vendor/assets/stylesheets/bastion"
      end
    end

    initializer "bastion.plugin", :group => :all do |app|
      SETTINGS[:bastion] = {:assets => {}} if SETTINGS[:bastion].nil?

      SETTINGS[:bastion][:assets][:precompile] = [
        'bastion/bastion.css',
        'bastion/bastion.js'
      ]
    end

    initializer "angular_templates", :group => :all do |app|
      app.config.angular_templates.ignore_prefix = %w([bastion]*\/+)
    end

    rake_tasks do
      load "#{Bastion::Engine.root}/Rakefile"
    end

  end
end
