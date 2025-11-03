import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
import TechStack from '../components/TechStack/TechStack';
import Career from '../components/Career/Career';
import ContactForm from '../components/ContactForm/ContactForm';
import ScrollToContact from '../components/utils/ScrollToContact';

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
