import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getExternalUserId } from './actions';
import DetailsForm from './details';
import { redirect } from 'next/navigation';

type DetailsSearchParams = {
  state: string;
};

type DetailsProps = {
  searchParams: Promise<DetailsSearchParams>;
};

export default async function DetailsPage(props: DetailsProps) {
  const { state } = await props.searchParams;

  try {
    const externalId = await getExternalUserId(state);
    return (
      <div className="flex flex-col items-center h-screen max-w-xl m-auto pt-16 pb-4 px-6">
        <Avatar>
          <AvatarImage src="/logo-icon-dark.svg" alt="Fabric Logo"/>
        </Avatar>
        <h1 className="mt-12 text-2xl font-bold text-center">
          Please enter your details so we can associate it with your data.
        </h1>
        <DetailsForm externalId={externalId} />
      </div>
    );
  } catch (err) {
    console.error(err);
    redirect(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?error=INVALID_STATE`)
  }
}
