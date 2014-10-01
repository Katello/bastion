# to make Foreman#in_rake? helper available if Foreman's lib is available
lib_foreman = File.expand_path('lib/foreman', Rails.root)
require lib_foreman unless !Dir.exist?(lib_foreman)

require 'less-rails' if !Rails.env.production? || Foreman.in_rake?
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
