type CustomHeadingPropType = {
  heading: string;
  textAlign?: string;
};

export default function CustomHeading({
  heading,
  textAlign,
}: CustomHeadingPropType) {
  const restClass =
    "text-3xl lg:text-5xl xl:text-6xl text-[rgb(57,60,69)] font-medium mb-4";
  const alignment = textAlign ? textAlign : "text-left";

  return (
    <>
      <h2 className={`${restClass} ${alignment}`}>{heading}</h2>
    </>
  );
}
