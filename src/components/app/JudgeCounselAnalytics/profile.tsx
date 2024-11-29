import Image from "next/image";
import React from "react";
type JudgeCounselProfile = {
  children: React.JSX.Element;
  profilePicture: string;
  profileName: string;
};
const JudgeCounselProfile: React.FC<JudgeCounselProfile> = ({
  children,
  profilePicture,
  profileName,
}) => {
  return (
    <section className="mt-10 p-10 border-gray-200 border-solid border ">
      <div className="rounded-full overflow-clip relative w-[80px] h-[80px] border border-solid border-[black]">
        <Image
          style={{ objectFit: "cover" }}
          className=""
          fill
          loading="lazy"
          src={profilePicture}
          alt=""
        />
      </div>
      <h3 className="text-base text-primary mt-5">{profileName}</h3>

      {children}
    </section>
  );
};

export default JudgeCounselProfile;
