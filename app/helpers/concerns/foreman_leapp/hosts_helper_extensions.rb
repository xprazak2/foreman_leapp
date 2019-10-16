# frozen_string_literal: true

module ForemanLeapp
  module HostsHelperExtensions
    extend ActiveSupport::Concern

    included do
      # execute callbacks
    end

    # create or overwrite instance methods...
    def instance_method_name; end
  end
end
