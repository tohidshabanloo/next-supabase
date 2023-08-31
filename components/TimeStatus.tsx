import { useCallback, useEffect, useState } from "react";

const TimeStatus = () => {
  const [time, setTime] = useState<string>("00:00 p.m.");
  const [awake, setAwake] = useState<boolean>(true);

  const updateTime = useCallback(() => {
    // set current to AEST
    const current = new Date();

    const formatter = new Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const timeString = formatter.format(current);

    setTime(timeString);
    setTimeout(updateTime, 60 * 1000);

    // If it's before 7am, I'm probably asleep
    if (current.getHours() < 7) {
      setAwake(false);
    } else {
      setAwake(true);
    }
  }, []);

  useEffect(() => {
    updateTime();
  }, [updateTime]);

  return (
    <p className="text-[#888888] text-sm mb-10">
      درحال حاضر <span className="font-semibold text-red-500">{time}</span> است
      پس من احتمالا{" "}
      <span className="font-semibold text-green-500">
        {awake ? "بیدارم" : "خواب هستم"}
      </span>
      {awake
        ? "  و در اولین فرصت جواب شما را میدهم"
        : "  وقتی بیدار بشم در سریع ترین زمان جواب شما را میدهم"}
    </p>
  );
};

export default TimeStatus;
