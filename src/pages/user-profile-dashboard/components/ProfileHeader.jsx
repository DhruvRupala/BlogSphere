import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    linkedin: user?.linkedin || ''
  });

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || '',
      website: user?.website || '',
      twitter: user?.twitter || '',
      linkedin: user?.linkedin || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative group">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
                alt={user?.name || 'User Avatar'}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-background"
            >
              <Icon name="Camera" size={16} />
            </Button>
          </div>
          <div className="mt-4 text-center lg:text-left">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Users" size={16} />
                <span>{user?.followersCount || 0} followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="UserPlus" size={16} />
                <span>{user?.followingCount || 0} following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="flex-1">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user?.name || 'User Name'}</h1>
                  <p className="text-muted-foreground">@{user?.username || 'username'}</p>
                  <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Profile
                </Button>
              </div>

              {user?.bio && (
                <p className="text-foreground leading-relaxed">{user?.bio}</p>
              )}

              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                {user?.website && (
                  <a
                    href={user?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name="Globe" size={16} />
                    <span>Website</span>
                  </a>
                )}
                {user?.twitter && (
                  <a
                    href={`https://twitter.com/${user?.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name="Twitter" size={16} />
                    <span>@{user?.twitter}</span>
                  </a>
                )}
                {user?.linkedin && (
                  <a
                    href={user?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name="Linkedin" size={16} />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  value={editData?.name}
                  onChange={(e) => setEditData({ ...editData, name: e?.target?.value })}
                  placeholder="Enter your display name"
                />
                <Input
                  label="Website"
                  value={editData?.website}
                  onChange={(e) => setEditData({ ...editData, website: e?.target?.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  label="Twitter Username"
                  value={editData?.twitter}
                  onChange={(e) => setEditData({ ...editData, twitter: e?.target?.value })}
                  placeholder="username"
                />
                <Input
                  label="LinkedIn URL"
                  value={editData?.linkedin}
                  onChange={(e) => setEditData({ ...editData, linkedin: e?.target?.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={editData?.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e?.target?.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="default" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;