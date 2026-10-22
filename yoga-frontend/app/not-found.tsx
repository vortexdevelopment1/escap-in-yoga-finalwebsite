import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";

export default function NotFound() {
  return (
    <div className="px-5 pb-24 pt-40">
      <EmptyState title="We couldn't find that page" action={<Button href="/">Back to home</Button>}>The link may be old or mistyped.</EmptyState>
    </div>
  );
}
