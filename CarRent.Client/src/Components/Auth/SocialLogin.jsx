import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

export default function SocialLogin({ type = "sign in" }) {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-sm text-gray-500 bg-white">or {type} with</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
          <FcGoogle className="w-5 h-5" />
          <span className="text-gray-600 font-medium group-hover:text-gray-900">Continue with Google</span>
        </Link>
        <Link className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
          <FaFacebook className="w-5 h-5 text-blue-600" />
          <span className="text-gray-600 font-medium group-hover:text-gray-900">Continue with Facebook</span>
        </Link>
      </div>
    </>
  )
}
