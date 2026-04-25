import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Package, Plus, Trash2, Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const emptyForm = { name: '', company: '', description: '' };

export default function Products() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      setShowModal(false);
      setForm(emptyForm);
      toast.success('Product added!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product removed.');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await createMutation.mutateAsync(form);
    setSaving(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">My Products</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage the products you're collecting feedback for</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No products yet</p>
          <p className="text-sm mt-1">Add your first product to start collecting feedback</p>
          <Button onClick={() => setShowModal(true)} className="mt-4 gap-2" variant="outline">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/feedback/${p.id}`)}
              className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-3 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm">{p.name}</p>
                  {p.company && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3" />{p.company}
                    </p>
                  )}
                  {p.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(p.id); }}
                  className="text-muted-foreground hover:text-destructive h-7 w-7"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Product Name *</Label>
              <Input placeholder="e.g. My SaaS App" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input placeholder="e.g. Acme Inc." value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea placeholder="Brief description of this product…" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Add Product'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
