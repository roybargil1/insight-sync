"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/lib/db";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emptyForm = { title: "", source: "", raw_text: "", date: "", product_id: "" };

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  productId?: string;
}

export default function AddFeedbackModal({ open, onClose, onSubmit, productId }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => Products.list(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setForm(emptyForm);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input
              placeholder="e.g. Checkout flow is confusing"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Source</Label>
              <Select value={form.source} onValueChange={(v) => setForm((f) => ({ ...f, source: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internal">Internal (CSV/Manual)</SelectItem>
                  <SelectItem value="Reddit">Reddit</SelectItem>
                  <SelectItem value="App Store">App Store / Play Store</SelectItem>
                  <SelectItem value="Customer Interview">Customer Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>
          {!productId && (
            <div className="space-y-1.5">
              <Label>Product</Label>
              <Select
                value={form.product_id}
                onValueChange={(v) => setForm((f) => ({ ...f, product_id: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.length === 0 ? (
                    <SelectItem value="_none" disabled>
                      No products yet — add one first
                    </SelectItem>
                  ) : (
                    products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1.5">
            <Label>Raw Feedback Text</Label>
            <Textarea
              placeholder="Paste the raw feedback here…"
              rows={5}
              value={form.raw_text}
              onChange={(e) => setForm((f) => ({ ...f, raw_text: e.target.value }))}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Add Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
