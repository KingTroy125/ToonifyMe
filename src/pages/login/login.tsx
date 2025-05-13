import { GalleryVerticalEnd } from "lucide-react"
import { Link } from "react-router-dom"
import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#f5f6fa] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ToonifyMe
        </Link>
        <LoginForm isSignUp={false} />
      </div>
    </div>
  )
}
