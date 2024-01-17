import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../../../public/logo.png"; // Adjust the path to your logo

const SignUpPage = () => (
  <div className="bg-gray-950 min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-md">
      <div className="p-6">
        <div className="text-center mb-6">
          <Image src={logo} alt="FrameRate Logo" width={150} height={50} className="mx-auto"/>
          <h1 className="font-bold text-2xl text-gray-300 mt-2">Join FrameRate</h1>
          <p className="text-gray-600 mt-2">Create your account to get started!</p>
        </div>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  </div>
);

export default SignUpPage;
