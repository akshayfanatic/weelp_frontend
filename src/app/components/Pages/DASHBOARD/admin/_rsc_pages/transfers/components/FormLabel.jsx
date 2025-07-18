import { Label } from "@/components/ui/label";

export default function FormLabel({ htmlFor, text, error }) {
  return (
    <Label htmlFor={htmlFor} className={`block text-sm font-medium ${error ? "text-red-500" : "text-black"}`}>
      {text}
    </Label>
  );
}
