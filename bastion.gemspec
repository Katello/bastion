$LOAD_PATH.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "bastion/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "bastion"
  s.version     = Bastion::VERSION
  s.authors     = ["Eric D Helms", "Walden Raines"]
  s.email       = ["ericdhelms@gmail.com", "walden@redhat.com"]
  s.homepage    = "http://www.github.com/Katello/bastion"
  s.summary     = "UI library of AngularJS based components for Foreman"
  s.description = "Bastion provides a UI library of AngularJS based components designed " \
                  "to integrate and work with Foreman."

  s.files = Dir["{app,config,lib,vendor,grunt}/**/*"] + 
               ["Rakefile", "README.md", "Gruntfile.js", "package.json", "bower.json", "bastion.js", "eslint.yaml",
                "LICENSE", ".jshintrc"]

  s.test_files = Dir["test/**/*"]

  s.add_dependency "angular-rails-templates", "0.1.2"
  s.add_development_dependency "uglifier"
  s.add_development_dependency "less-rails", "~> 2.5.0"
end
