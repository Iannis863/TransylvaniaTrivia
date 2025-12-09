import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import RegistrationForm from "../RegistrationForm";

export default function RegistrationFormExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegistrationForm />
      <Toaster />
    </QueryClientProvider>
  );
}
