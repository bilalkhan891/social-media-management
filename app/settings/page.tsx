import { SettingsCard } from "@/components/settings/SettingsCard"

const settingsItems = [
  {
    title: "Account Settings",
    description: "Manage your profile and preferences",
  },
  {
    title: "Notifications",
    description: "Control your notification preferences",
  },
  {
    title: "Dark Mode",
    description: "Currently enabled",
  },
]

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="space-y-3">
        {settingsItems.map((item) => (
          <SettingsCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  )
}
