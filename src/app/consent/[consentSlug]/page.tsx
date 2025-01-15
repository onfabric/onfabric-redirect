import Consent from './consent';

type ConsentRedirectParams = {
  consentSlug: string;
};

type ConsentRedirectSearchParams = {
  userId?: string;
};

type ConsentRedirectProps = {
  params: Promise<ConsentRedirectParams>;
  searchParams: Promise<ConsentRedirectSearchParams>;
};

export default async function Home(props: ConsentRedirectProps) {
  const { consentSlug } = await props.params;
  const { userId } = await props.searchParams;

  return (
    <Consent userId={userId} consentSlug={consentSlug}/>
  )
}
