# to make Foreman#in_rake? helper available if Foreman's lib is available
require 'rails'

require 'less-rails' unless Rails.env.production?
require 'angular-rails-templates'

require File.expand_path('bastion/engine', File.dirname(__FILE__))

module Bastion

  @@plugins = {};

  def self.plugins
    @@plugins
  end

  def self.register_plugin(plugin)
    @@plugins[plugin[:name]] = plugin
  end

  def self.config
    base_config = {
      'markTranslated' => SETTINGS[:mark_translated] || false
    }

    Bastion.plugins.each do |name, plugin|
      base_config.merge!(plugin[:config]) if plugin[:config]
    end

    base_config
  end

  def self.localization_path(locale)
    "bastion/angular-i18n/angular-locale_#{locale}.js"
  end

end
