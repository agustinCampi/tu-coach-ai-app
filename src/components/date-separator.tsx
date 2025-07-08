interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-border"></div>
      <span className="flex-shrink mx-4 text-xs text-muted-foreground">{date}</span>
      <div className="flex-grow border-t border-border"></div>
    </div>
  );
}
