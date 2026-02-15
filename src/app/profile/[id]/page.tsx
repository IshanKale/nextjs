async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>page {id}</div>
    </div>
  );
}

export default page;