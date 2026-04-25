import { Package } from 'lucide-react';

export default function NoProductSelected({ page = 'this page' }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-primary/60" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">No product selected</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Select a product from the sidebar to view {page} data.
      </p>
    </div>
  );
}
