import Header from '../components/features/header/Header';
import Profile from '../components/features/profile/Profile';
import TechStack from '../components/features/tech/TechStack';
import Career from '../components/features/career/Career';
import Qualifications from '../components/features/qualifications/Qualifications';
import ContactForm from '../components/features/contact/ContactForm';
import ScrollToContact from '../components/ui/utils/ScrollToContact';
import Reveal from '../components/ui/motion/Reveal';
import ParallaxScene from '../components/ui/motion/ParallaxScene';
import AnimatedBackdrop from '../components/ui/motion/AnimatedBackdrop';
import { SHOW_CONTACT_FORM } from '@/config/features';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const shouldScroll = Boolean(params.error || params.sent === '1');

  return (
    <div className="pageShell">
      <AnimatedBackdrop />
      <ScrollToContact trigger={shouldScroll} hash="contact" />
      <div className="pageContent">
        <Header />
        <Reveal>
          <ParallaxScene className="heroScene">
            <Profile />
          </ParallaxScene>
        </Reveal>
        <Reveal delay={120}>
          <TechStack />
        </Reveal>
        <Reveal delay={180}>
          <Career />
        </Reveal>
        <Reveal delay={200}>
          <Qualifications />
        </Reveal>
        {SHOW_CONTACT_FORM ? (
          <Reveal delay={220}>
            <ContactForm
              errorMessage={params.error}
              sent={params.sent === '1'}
            />
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
