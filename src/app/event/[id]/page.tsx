type Props = {
  params: {
    id: string
  }
}

const Page = ({params}: Props) => {
  return (
    <div>
      <div>ID do envento: {params.id}</div>
    </div>
  );
}

export default Page;