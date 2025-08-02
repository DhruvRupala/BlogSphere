import React from 'react';
import Icon from '../../../components/AppIcon';

const AboutSection = ({ author }) => {
  return (
    <div className="space-y-6">
      {/* Extended Bio */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">About {author?.name}</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {author?.extendedBio || author?.bio}
          </p>
        </div>
      </div>
      {/* Achievements */}
      {author?.achievements && author?.achievements?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {author?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                  <Icon name={achievement?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                  {achievement?.date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.date)?.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Skills/Expertise */}
      {author?.skills && author?.skills?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {author?.skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Contact Information */}
      {author?.contactInfo && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
          <div className="space-y-3">
            {author?.contactInfo?.email && (
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={18} className="text-muted-foreground" />
                <a
                  href={`mailto:${author?.contactInfo?.email}`}
                  className="text-primary hover:text-primary/80 transition-colors duration-150"
                >
                  {author?.contactInfo?.email}
                </a>
              </div>
            )}
            {author?.contactInfo?.website && (
              <div className="flex items-center gap-3">
                <Icon name="Globe" size={18} className="text-muted-foreground" />
                <a
                  href={author?.contactInfo?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-150"
                >
                  {author?.contactInfo?.website?.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {author?.contactInfo?.location && (
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={18} className="text-muted-foreground" />
                <span className="text-muted-foreground">{author?.contactInfo?.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;