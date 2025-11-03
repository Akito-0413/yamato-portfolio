import Header from '../components/features/header/Header';
import Profile from '../components/features/profile/Profile';
import TechStack from '../components/features/tech/TechStack';
import Career from '../components/features/career/Career';
import ContactForm from '../components/features/contact/ContactForm';
import ScrollToContact from '../components/ui/utils/ScrollToContact';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const shouldScroll = Boolean(params.error || params.sent === '1');

  return (
    <div>
      <ScrollToContact trigger={shouldScroll} hash="contact" />

      <Header />
      <Profile />
      <TechStack />
      <Career />
      <ContactForm errorMessage={params.error} sent={params.sent === '1'} />
    </div>
  );
}
