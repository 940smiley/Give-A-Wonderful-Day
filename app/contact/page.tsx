import PublicPage from '../components/PublicPage';
import ContactForm from '../components/forms/ContactForm';

export default function ContactPage() {
  return (
    <PublicPage
      title="Contact"
      intro="Use this form for general questions. Do not include medical records, financial account details, or other highly sensitive information."
    >
      <ContactForm />
    </PublicPage>
  );
}
