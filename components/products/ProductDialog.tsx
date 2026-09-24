import { ProductFormValues } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { ProductForm } from "./product-form/ProductForm";

type ProductDialogProps = {
  isDialogOpen: boolean;
  formKey: number;
  handleDialogChange: (open: boolean) => void;
  handleAddProduct: (product: ProductFormValues) => void;
};

export function ProductDialog({
  isDialogOpen,
  formKey,
  handleDialogChange,
  handleAddProduct,
}: ProductDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon />
            Dodaj produkt
          </Button>
        }
      />

      <DialogContent className="flex h-full w-full max-w-none flex-col rounded-none p-0 sm:h-auto sm:max-h-[90vh] sm:max-w-[720px] sm:rounded-xl sm:border sm:border-border">
        <DialogHeader className="h-[72px] shrink-0 justify-center border-b border-border px-4">
          <DialogTitle className="text-base font-medium leading-5 text-foreground">
            Dodaj nowy produkt
          </DialogTitle>
        </DialogHeader>

        <ProductForm key={formKey} onSubmit={handleAddProduct} />
      </DialogContent>
    </Dialog>
  );
}
