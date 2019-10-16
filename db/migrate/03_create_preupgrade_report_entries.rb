# frozen_string_literal: true

class CreatePreupgradeReportEntries < ActiveRecord::Migration[4.2]
  def up
    create_table :preupgrade_report_entries do |t|
      t.integer :preupgrade_report_id, :null => false
      t.string :hostname, :limit => 255, :null => false
      t.string :title, :limit => 1024, :null => false
      t.timestamps :null => false
      t.string :actor, :limit => 255, :null => false
      t.text :summary, :limit => 1024
      t.string :audience, :limit => 255, :null => false
      t.string :severity, :limit => 255, :null => false
      t.integer :leapp_run_id, :null => false
      # those will be used to dump all remediations specific data as is
      t.text :tags
      t.text :detail
    end
    add_index :preupgrade_report_entries, :preupgrade_report_id
  end

  def down
    remove_index :preupgrade_report_entries, :preupgrade_report_id
    drop_table :preupgrade_report_entries
  end
end
