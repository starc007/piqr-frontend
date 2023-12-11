import { CheckRoundedFilledSVG, DashedCircleSVG } from "@assets/index";
import { Link } from "@components";

interface DataProps {
  id: number;
  title: string;
  checked: boolean;
  url: string;
}

const FloatingProfileProgress = ({
  data,
  progress,
}: {
  data: DataProps[];
  progress: number;
}) => {
  const styles = {
    checked: "text-primary flex gap-2 items-center font-medium mt-2 text-sm",
    unchecked: "text-gray-500 flex gap-2 items-center font-medium mt-2 text-sm",
  };
  return (
    <div className="mt-4 rounded-xl w-full border border-gray-300 bg-gray-100 p-3 font-poppins">
      <h6 className="font-semibold">Complete your profile</h6>
      <p className="text-xs font-medium text-gray-500 mt-1">
        {Math.round(progress)}% profile completed
      </p>
      {/* progress */}
      <div className="h-1 rounded-full bg-gray-200  mt-4 overflow-hidden">
        <div
          style={{ width: progress + "%" }}
          className={`rounded-full  bg-primary h-full`}
        />
      </div>
      {/* Checklist */}
      <div className="flex flex-col">
        {data.map((item) => (
          <Link
            href={item.url}
            key={item.id}
            className={item.checked ? styles.checked : styles.unchecked}
          >
            {item.checked ? (
              <CheckRoundedFilledSVG className="w-5 fill-primary" />
            ) : (
              <DashedCircleSVG />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FloatingProfileProgress;
