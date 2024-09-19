import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
const NewOrderDialog = () => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
          <DialogDescription>
            Fill the form to change the status of the order. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orderId" className="text-right">
              Order Id
            </Label>
            <Input
              id="orderId"
              className="col-span-3"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <div className="col-span-3">
              <Select
                id="status"
                options={[
                  { value: "ACCEPTED", label: "ACCEPTED" },
                  { value: "REFUSED", label: "REFUSED" },
                ]}
                placeholder="Select status"
                onChange={(option) => setStatus(option?.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={updateOrderStatus}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;
