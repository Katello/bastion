module Bastion
  class BastionController < ::ApplicationController
    skip_before_filter :authorize

    def index
      render 'bastion/layouts/application', :layout => false
    end

    def index_ie
      render 'bastion/layouts/application_ie', :layout => false
    end
  end
end
