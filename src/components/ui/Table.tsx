import React from "react";
import { cn } from "@/lib/utils";

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full text-left border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return (
    <thead
      className={cn("bg-slate-50/80 border-b border-slate-200 text-slate-500", className)}
      {...props}
    />
  );
};

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return (
    <tbody
      className={cn("divide-y divide-slate-100 bg-white", className)}
      {...props}
    />
  );
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cn("hover:bg-slate-50/70 transition-colors", className)}
      {...props}
    />
  );
};

export const TableHead: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return (
    <th
      className={cn(
        "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
};

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return (
    <td
      className={cn("px-6 py-3.5 text-slate-700 whitespace-nowrap align-middle", className)}
      {...props}
    />
  );
};

