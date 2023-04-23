import Image from "next/image";
import MDLogo from "../../public/MDLogo.png";
const Logo = (props: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Image src={MDLogo} alt="MD Logo" width={50} height={50} />
      {props.renderDefault(props)}
    </div>
  );
};

export default Logo;
