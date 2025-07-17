import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">System Configuration</h1>
            <p className="page-subtitle">
              Enterprise settings and system administration
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <SettingsIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Enterprise Configuration
          </h3>
          <p className="text-slate-500">
            Advanced system settings with role-based access control and enterprise integrations.
          </p>
        </div>
      </div>
    </div>
  )
}