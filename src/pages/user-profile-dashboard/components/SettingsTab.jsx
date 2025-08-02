import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsTab = ({ user, onUpdateSettings }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    name: user?.name || '',
    bio: user?.bio || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailComments: true,
    emailLikes: true,
    emailFollowers: true,
    emailNewsletter: false,
    pushComments: true,
    pushLikes: false,
    pushFollowers: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowComments: true,
    moderateComments: true
  });

  const settingSections = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'password', label: 'Password & Security', icon: 'Lock' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy & Safety', icon: 'Shield' },
    { id: 'danger', label: 'Danger Zone', icon: 'AlertTriangle' }
  ];

  const handleProfileSave = () => {
    onUpdateSettings('profile', profileData);
  };

  const handlePasswordSave = () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    onUpdateSettings('password', passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationSave = () => {
    onUpdateSettings('notifications', notifications);
  };

  const handlePrivacySave = () => {
    onUpdateSettings('privacy', privacy);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Display Name"
            value={profileData?.name}
            onChange={(e) => setProfileData({ ...profileData, name: e?.target?.value })}
            placeholder="Enter your display name"
          />
          <Input
            label="Username"
            value={profileData?.username}
            onChange={(e) => setProfileData({ ...profileData, username: e?.target?.value })}
            placeholder="Enter your username"
            description="This will be your unique identifier"
          />
        </div>
        <Input
          label="Email Address"
          type="email"
          value={profileData?.email}
          onChange={(e) => setProfileData({ ...profileData, email: e?.target?.value })}
          placeholder="Enter your email"
          className="mt-4"
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          <textarea
            value={profileData?.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e?.target?.value })}
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
        </div>
        <Button variant="default" onClick={handleProfileSave} className="mt-4">
          Save Profile Changes
        </Button>
      </div>
    </div>
  );

  const renderPasswordSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Password & Security</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e?.target?.value })}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e?.target?.value })}
            placeholder="Enter new password"
            description="Must be at least 8 characters long"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e?.target?.value })}
            placeholder="Confirm new password"
          />
          <Button variant="default" onClick={handlePasswordSave}>
            Update Password
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="text-md font-medium text-foreground mb-4">Two-Factor Authentication</h4>
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="font-medium text-foreground">Enable 2FA</p>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline">Setup 2FA</Button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Comments on my posts"
            description="Get notified when someone comments on your blog posts"
            checked={notifications?.emailComments}
            onChange={(e) => setNotifications({ ...notifications, emailComments: e?.target?.checked })}
          />
          <Checkbox
            label="Likes on my posts"
            description="Get notified when someone likes your blog posts"
            checked={notifications?.emailLikes}
            onChange={(e) => setNotifications({ ...notifications, emailLikes: e?.target?.checked })}
          />
          <Checkbox
            label="New followers"
            description="Get notified when someone follows you"
            checked={notifications?.emailFollowers}
            onChange={(e) => setNotifications({ ...notifications, emailFollowers: e?.target?.checked })}
          />
          <Checkbox
            label="Newsletter and updates"
            description="Receive our weekly newsletter and platform updates"
            checked={notifications?.emailNewsletter}
            onChange={(e) => setNotifications({ ...notifications, emailNewsletter: e?.target?.checked })}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="text-md font-medium text-foreground mb-4">Push Notifications</h4>
        <div className="space-y-4">
          <Checkbox
            label="Comments on my posts"
            checked={notifications?.pushComments}
            onChange={(e) => setNotifications({ ...notifications, pushComments: e?.target?.checked })}
          />
          <Checkbox
            label="Likes on my posts"
            checked={notifications?.pushLikes}
            onChange={(e) => setNotifications({ ...notifications, pushLikes: e?.target?.checked })}
          />
          <Checkbox
            label="New followers"
            checked={notifications?.pushFollowers}
            onChange={(e) => setNotifications({ ...notifications, pushFollowers: e?.target?.checked })}
          />
        </div>
      </div>

      <Button variant="default" onClick={handleNotificationSave}>
        Save Notification Preferences
      </Button>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Public profile"
            description="Make your profile visible to everyone"
            checked={privacy?.profilePublic}
            onChange={(e) => setPrivacy({ ...privacy, profilePublic: e?.target?.checked })}
          />
          <Checkbox
            label="Show email address"
            description="Display your email address on your public profile"
            checked={privacy?.showEmail}
            onChange={(e) => setPrivacy({ ...privacy, showEmail: e?.target?.checked })}
          />
          <Checkbox
            label="Allow comments"
            description="Let others comment on your blog posts"
            checked={privacy?.allowComments}
            onChange={(e) => setPrivacy({ ...privacy, allowComments: e?.target?.checked })}
          />
          <Checkbox
            label="Moderate comments"
            description="Review comments before they appear on your posts"
            checked={privacy?.moderateComments}
            onChange={(e) => setPrivacy({ ...privacy, moderateComments: e?.target?.checked })}
          />
        </div>
      </div>

      <Button variant="default" onClick={handlePrivacySave}>
        Save Privacy Settings
      </Button>
    </div>
  );

  const renderDangerSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Danger Zone</h3>
        <div className="border border-error rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-md font-medium text-foreground mb-2">Export Your Data</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your blog posts, comments, and profile data.
            </p>
            <Button variant="outline">Export Data</Button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-md font-medium text-error mb-2">Delete Account</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'password':
        return renderPasswordSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'danger':
        return renderDangerSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="lg:col-span-1">
        <nav className="space-y-1">
          {settingSections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section?.icon} size={18} />
              <span className="text-sm font-medium">{section?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Settings Content */}
      <div className="lg:col-span-3">
        <div className="bg-card border border-border rounded-lg p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;