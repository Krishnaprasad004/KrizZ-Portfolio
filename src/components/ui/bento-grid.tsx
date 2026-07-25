import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="font-heading mt-2 mb-2 font-semibold tracking-tight text-white">
          {title}
        </div>
        <div className="text-xs font-normal text-zinc-400">
          {description}
        </div>
      </div>
    </div>
  );
};
