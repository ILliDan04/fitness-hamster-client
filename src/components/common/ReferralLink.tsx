import { Button } from "@/shadcn-components/ui/button";
import CopyIcon from "../icons/CopyIcon";
import referImg from "@/assets/refer_img.png";
import { useClipboard } from "@/hooks/useClipboard";
import Message from "./Message";

const link = "https://t.me/fittonapp_bot/app?ref=illidan04";

const ReferralLink = () => {
  const copyToClipboard = useClipboard();

  return (
    <div className="bg-white bg-opacity-10 rounded-3xl p-4">
      <div className="flex">
        <div className="mr-2">
          <img src={referImg} width={60} />
        </div>
        <div className="capitalize font-extrabold text-lg">
          <p>Refer friends and</p>
          <p>Earn rewards!</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-6 text-lg">
        <div>Referees</div>
        <div className="font-extrabold">2/10</div>
      </div>
      <div className="bg-white px-3 h-11 rounded-xl flex items-center">
        <p className="flex-1 text-slate-900 truncate pr-1">{link}</p>
        <Button
          icon={<CopyIcon />}
          size="nosize"
          onClick={() => {
            copyToClipboard(link);
            Message.info("Link copied");
          }}
        />
      </div>
    </div>
  );
};

export default ReferralLink;
