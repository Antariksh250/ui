type CustomHeadingPropType = {
  heading: string;
  textAlign?: string;
  textColor?: string;
};

export default function CustomHeading({
  heading,
  textAlign,
  textColor,
}: CustomHeadingPropType) {
  const restClass =
    "text-3xl lg:text-5xl xl:text-6xl text-[rgb(57,60,69)] font-medium mb-4";
  const alignment = textAlign ? textAlign : "text-left";
  const color = textColor ? textColor : "";

  return (
    <>
      <h2 className={`${restClass} ${alignment} ${color}`}>{heading}</h2>
    </>
  );
}
