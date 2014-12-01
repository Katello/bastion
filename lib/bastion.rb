# to make Foreman#in_rake? helper available if Foreman's lib is available
require 'rails'
lib_foreman = File.expand_path('lib/foreman', Rails.root)
require lib_foreman unless !Dir.exist?(lib_foreman)

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

end
