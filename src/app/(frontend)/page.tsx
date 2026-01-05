import PageTemplate, { generateMetadata } from './[slug]/page'

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

const Page = async (props: Args) => {

  return <PageTemplate {...props} />
}

export default Page
export { generateMetadata }
