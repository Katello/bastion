Foreman::Application.routes.draw do

  class BastionPagesConstraint

    def matches?(request)
      pages.include?(request.params[:bastion_page])
    end

    private

    def pages
      pages = Bastion.plugins.collect { |name, plugin| plugin[:pages] }
      pages.flatten
    end

  end

  scope :bastion, :module => :bastion do
    match '/:bastion_page/(*path)', :to => "bastion#index", constraints: BastionPagesConstraint.new, :via => :get
    match '/bastion/(*path)', :to => "bastion#index_ie", :via => :get
  end

end
