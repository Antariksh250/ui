type CustomHeadingPropType = {
  heading: string;
};

export default function CustomHeading({ heading }: CustomHeadingPropType) {
  return (
    <>
      <h2 className="text-3xl lg:text-5xl xl:text-6xl text-[rgb(57,60,69)] font-medium mb-4">
        {heading}
      </h2>
    </>
  );
}
