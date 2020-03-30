FactoryBot.define do
  factory :preupgrade_report do |f|
    host { nil }
    status { 0 }
    metrics { nil }
    type { 'PreupgradeReport' }
    sequence(:reported_at) { |n| Time.new(1490 + n, 0o1, 13, 15, 24, 0o0) }
    sequence(:created_at) { |n| Time.new(1490 + n, 0o1, 13, 15, 24, 0o0) }
  end
end
