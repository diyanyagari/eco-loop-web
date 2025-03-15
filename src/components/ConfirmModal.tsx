import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function ConfirmModal({
  isActive,
  setActive,
  title = "Konfirmasi",
  description = "Apakah Anda Yakin?",
  onClick,
}: {
  isActive: boolean;
  setActive: (e: boolean) => void;
  title?: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <Dialog open={isActive} onOpenChange={setActive}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <div className="flex flex-row gap-10 justify-center">
            <Button type="button" variant="secondary">
              Gak Jadi
            </Button>
            <Button onClick={onClick} type="button" variant="destructive">
              Hapus!
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
