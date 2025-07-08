import React from "react";

interface DateSeparatorProps {
  date: string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="my-4 flex items-center justify-center">
      <span className="text-xs font-medium text-[#9eb7ae]">{date}</span>
    </div>
  );
}
