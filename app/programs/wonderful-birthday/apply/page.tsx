import PublicPage from '../../../components/PublicPage';
import BirthdayApplicationForm from './BirthdayApplicationForm';

export default function BirthdayApplicationPage() {
  return (
    <PublicPage
      title="Apply for a Wonderful Birthday"
      intro="Complete the application below to be considered for the Wonderful Birthday Project. All information is kept confidential and used solely for application review and experience planning."
    >
      <div className="max-w-3xl">
        <BirthdayApplicationForm />
      </div>
    </PublicPage>
  );
}
