import AuthButtons from "@/app/[locale]/signin/AuthButtons";
import { Link } from "@/navigation";

export default function SignInContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-96 max-w-full p-6">
      <h1 className="text-2xl font-bold mb-2">Sign In</h1>

      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {/*Or continue with*/}
            <div className="w-1 h-1 bg-border rounded-full"></div>
          </span>
        </div>
      </div>

      <AuthButtons />
      <div className="text-sm opacity-50 text-center">
        By clicking sign in buttons, you agree to our{" "}
        <Link href="/terms-of-service" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
