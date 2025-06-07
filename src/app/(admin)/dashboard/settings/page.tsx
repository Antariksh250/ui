"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Download, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoRespond: false,
    responseTemplate: `Thank you for your inquiry. We have received your message and will get back to you within 24 hours.

Best regards,
Antariksh Team`,
    retentionDays: 365,
    maxFileSize: 10,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  const handleExportData = () => {
    // Trigger export
    window.open("/api/admin/contact-forms/export?format=csv", "_blank");
    toast.success("Export started! Download will begin shortly.");
  };

  const handleDeleteOldQueries = () => {
    if (
      confirm(
        "Are you sure you want to delete queries older than the retention period? This action cannot be undone."
      )
    ) {
      toast.success("Old queries deletion scheduled.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your dashboard preferences and system configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Notification Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="email-notifications"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Notifications
                  </Label>
                  <p className="text-xs text-gray-500">
                    Receive email alerts for new queries
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="auto-respond"
                    className="text-sm font-medium text-gray-700"
                  >
                    Auto-respond
                  </Label>
                  <p className="text-xs text-gray-500">
                    Send automatic response to new queries
                  </p>
                </div>
                <Switch
                  id="auto-respond"
                  checked={settings.autoRespond}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, autoRespond: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Response Template */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Auto-response Template
            </h3>

            <div>
              <Label
                htmlFor="response-template"
                className="text-sm font-medium text-gray-700"
              >
                Response Message
              </Label>
              <Textarea
                id="response-template"
                value={settings.responseTemplate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    responseTemplate: e.target.value,
                  }))
                }
                rows={6}
                className="mt-1"
                placeholder="Enter your auto-response template..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This message will be sent automatically to customers when
                auto-respond is enabled.
              </p>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Data Management
            </h3>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="retention-days"
                  className="text-sm font-medium text-gray-700"
                >
                  Data Retention Period (days)
                </Label>
                <Input
                  id="retention-days"
                  type="number"
                  value={settings.retentionDays}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      retentionDays: parseInt(e.target.value),
                    }))
                  }
                  className="mt-1 max-w-xs"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Queries older than this period will be eligible for deletion.
                </p>
              </div>

              <div>
                <Label
                  htmlFor="max-file-size"
                  className="text-sm font-medium text-gray-700"
                >
                  Maximum File Upload Size (MB)
                </Label>
                <Input
                  id="max-file-size"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      maxFileSize: parseInt(e.target.value),
                    }))
                  }
                  className="mt-1 max-w-xs"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum size for file attachments in contact forms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Save Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>

            <div className="space-y-3">
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>

              <Button
                variant="outline"
                onClick={handleExportData}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <h3 className="text-lg font-medium text-red-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Danger Zone
            </h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                These actions cannot be undone. Please proceed with caution.
              </p>

              <Button
                variant="destructive"
                onClick={handleDeleteOldQueries}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Old Queries
              </Button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              System Information
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Version:</span>
                <span className="text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Backup:</span>
                <span className="text-gray-900">Jun 7, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Database:</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Storage Used:</span>
                <span className="text-gray-900">2.3 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
