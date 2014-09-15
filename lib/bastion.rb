require File.expand_path('bastion/engine', File.dirname(__FILE__))
require 'less-rails'
require 'angular-rails-templates'

module Bastion

  @@plugins = {};

  def self.plugins
    @@plugins
  end

  def self.register_plugin(plugin)
    @@plugins[plugin[:name]] = plugin
  end

end
