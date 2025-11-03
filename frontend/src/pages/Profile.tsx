import React from 'react';
import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Button from '../components/ui/Button';

const PROFILE_STORAGE_KEY = 'devconnect_profile';

type ProfileData = {
  fullName: string;
  headline: string;
  bio: string;
  skills: string;
};

const defaultProfile: ProfileData = {
  fullName: '',
  headline: '',
  bio: '',
  skills: '',
};

const loadProfile = (): ProfileData => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    return {
      fullName: parsed.fullName ?? '',
      headline: parsed.headline ?? '',
      bio: parsed.bio ?? '',
      skills: parsed.skills ?? '',
    } satisfies ProfileData;
  } catch (err) {
    console.warn('Failed to load profile from storage', err);
    return defaultProfile;
  }
};

const Profile: React.FC = () => {
  const [profile, setProfile] = React.useState<ProfileData>(defaultProfile);
  const [saving, setSaving] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const initial = loadProfile();
    setProfile(initial);
    if (
      initial.fullName.trim() ||
      initial.headline.trim() ||
      initial.bio.trim() ||
      initial.skills.trim()
    ) {
      setSavedAt(new Date());
    }
  }, []);

  const handleChange = (key: keyof ProfileData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProfile(prev => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaving(true);

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      setSavedAt(new Date());
    } catch (err) {
      setError('Could not save profile locally');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setProfile(defaultProfile);
    setSavedAt(null);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  };

  const lastSavedLabel = savedAt
    ? savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className='profile-page'>
      <header className='profile-header'>
        <div>
          <span className='profile-pill'>Complete your profile</span>
          <h1>Tell the community who you are</h1>
          <p>
            Share a short bio, your headline, and the skills you want to highlight. We'll
            keep it safe until the backend endpoints arrive.
          </p>
        </div>
        <Button variant='secondary' type='button' onClick={handleReset}>
          Reset form
        </Button>
      </header>

      <form className='profile-form' onSubmit={handleSubmit}>
        <InputField
          id='full-name'
          label='Full name'
          placeholder='Jane Developer'
          value={profile.fullName}
          onChange={handleChange('fullName')}
          required
        />

        <InputField
          id='headline'
          label='Headline'
          placeholder='Full-stack developer @ DevConnect'
          value={profile.headline}
          onChange={handleChange('headline')}
        />

        <TextareaField
          id='bio'
          label='Bio'
          placeholder='Tell the community about your experience, focus, and goals.'
          value={profile.bio}
          onChange={handleChange('bio')}
        />

        <TextareaField
          id='skills'
          label='Key skills (comma separated)'
          placeholder='React, Node.js, UX, Mentorship'
          value={profile.skills}
          onChange={handleChange('skills')}
        />

        {error ? <p className='profile-error'>{error}</p> : null}
        {lastSavedLabel ? (
          <p className='profile-success'>Saved locally at {lastSavedLabel}</p>
        ) : null}

        <div className='profile-actions'>
          <Button type='submit' disabled={saving}>
            {saving ? 'Saving…' : 'Save profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
