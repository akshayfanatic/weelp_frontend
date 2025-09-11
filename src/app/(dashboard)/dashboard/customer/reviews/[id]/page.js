const ReviewPage = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Review Details</h1>
      <p>Viewing review ID: {id}</p>
    </div>
  );
};

export default ReviewPage;
