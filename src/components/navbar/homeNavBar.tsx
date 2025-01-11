import SiteLogo from "./siteLogo";

export default function HomeNavBar(): JSX.Element {
  return (
    <header className="sticky top-0 z-10 mx-auto bg-white/75 backdrop-blur-lg dark:bg-zinc-950/75">
      <SiteLogo />
    </header>
  );
}
