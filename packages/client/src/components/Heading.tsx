interface IHeadingProps {
  text: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = (props: IHeadingProps): JSX.Element => {
  const { text, type } = props;

  const getHeading = (): JSX.Element => {
    const headingClassname = "text-white font-bold text-2xl";
    switch (type) {
      case "h1":
        return <h1 className={headingClassname}>{text}</h1>;
      case "h2":
        return <h2 className={headingClassname}>{text}</h2>;
      case "h3":
        return <h3 className={headingClassname}>{text}</h3>;
      case "h4":
        return <h4 className={headingClassname}>{text}</h4>;
      case "h5":
        return <h5 className={headingClassname}>{text}</h5>;
      case "h6":
        return <h6 className={headingClassname}>{text}</h6>;
    }
  };
  return <div className="flex items-center justify-center">{getHeading()}</div>;
};

export default Heading;
