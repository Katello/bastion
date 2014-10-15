$LOAD_PATH.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "bastion/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "bastion"
  s.version     = Bastion::VERSION
  s.authors     = ["Katello"]
  s.email       = [""]
  s.homepage    = "http://www.katello.org"
  s.summary     = "Summary of Bastion."
  s.description = "Description of Bastion."

  s.files = Dir["{app,config,lib,vendor,grunt}/**/*"] + 
               ["Rakefile", "README.md", "Gruntfile.js", "package.json", "bower.json", "bastion.js",
                "LICENSE", ".jshintrc"]

  s.test_files = Dir["test/**/*"]

  s.add_dependency "less-rails", "~> 2.5.0"
  s.add_dependency "angular-rails-templates", "~> 0.0.4"
end
