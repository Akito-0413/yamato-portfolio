import Header from "../components/Header/Header";
import Profile from "../components/profile/Profile";
import TechStack from "../components/TechStack/TechStack";
import Career from "../components/career/Career";

export default function Home() {
  return (
    <div>
      <Header />
      <Profile />
      <TechStack />
      <Career />
    </div>
  );
}
