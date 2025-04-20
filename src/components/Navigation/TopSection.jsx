function TopSection({ data }) {
  return (
    <>
      <section className="flex flex-col items-center text-5xl font-semibold space-y-5">
        <div >{data.genric}</div>
        <div>{data.name}</div>
      </section>
    </>
  );
}

export default TopSection;
