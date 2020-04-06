# frozen_string_literal: true

module ForemanLeapp
  module RemoteExecutionHelperExtension
    def job_invocation_task_buttons(task)
      job_invocation = task.task_groups.find { |group| group.class == JobInvocationTaskGroup }.job_invocation
      return super unless job_invocation.remote_execution_feature&.label == 'leapp_remediation_plan'

      path = new_job_invocation_path(host_ids: job_invocation.triggering.hosts.map(&:id),
                                     feature: 'leapp_preupgrade')

      super.insert(2,
                   link_to(_('Rerun preupgrade check'),
                           path,
                           class: 'btn btn-default',
                           title: _('Run Leapp Preupgrade check again'),
                           method: :get))
    end
  end
end
