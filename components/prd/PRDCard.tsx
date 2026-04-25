"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  "In Review": "bg-blue-50 text-blue-700 border-blue-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Archived: "bg-slate-100 text-slate-500 border-slate-200",
};

interface Props {
  prd: Record<string, unknown>;
  onView: (prd: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export default function PRDCard({ prd, onView, onDelete }: Props) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{prd.product_name as string}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {prd.created_at ? format(new Date(prd.created_at as string), "MMM d, yyyy") : "No date"}
            </p>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            statusColors[prd.status as string] || ""
          }`}
        >
          {(prd.status as string) || "Draft"}
        </span>
      </div>

      {!!prd.goal && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{prd.goal as string}</p>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onView(prd)}
          className="gap-1.5 text-xs flex-1"
        >
          <Eye className="w-3.5 h-3.5" />
          View PRD
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(prd.id as string)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
}
