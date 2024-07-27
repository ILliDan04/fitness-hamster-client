import { Button } from "@/shadcn-components/ui/button";
import CopyIcon from "../icons/CopyIcon";
import referImg from "@/assets/refer_img.png";
import { useClipboard } from "@/hooks/useClipboard";
import Message from "./Message";
import useSession from "@/api/auth/useSession";
import { useMemo } from "react";
import useReferralsUsed from "@/api/account/useReferralsUsed";

const ReferralLink = () => {
  const { data: session } = useSession();
  const { data: referralsUsed } = useReferralsUsed();
  const copyToClipboard = useClipboard();

  const link = useMemo(
    () =>
      session
        ? `https://t.me/${import.meta.env.VITE_TELEGRAM_APP}?ref=${session.id}`
        : "",
    [session]
  );

  return (
    <div className="bg-white bg-opacity-10 rounded-3xl p-4">
      {session?.whitelisted && (
        <>
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
            <div className="font-extrabold">
              {referralsUsed ?? 0}/{session.max_referrals}
            </div>
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
        </>
      )}
      {!session?.whitelisted && (
        <p className="text-center text-lg">
          <span>Finish your first exercise</span>
          <br />
          <span>to enter the whitelist!</span>
        </p>
      )}
    </div>
  );
};

export default ReferralLink;
