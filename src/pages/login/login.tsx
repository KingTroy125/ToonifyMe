import { GalleryVerticalEnd } from "lucide-react"
import { Link } from "react-router-dom"
import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ToonifyMe
        </Link>
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 opacity-75 blur"></div>
          <div className="relative rounded-2xl bg-white p-6 shadow-xl">
            <LoginForm isSignUp={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
