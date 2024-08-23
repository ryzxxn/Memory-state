import { FaGithub } from "react-icons/fa";
import { RiNpmjsFill } from "react-icons/ri";
export default function Navbar() {
  return (
    <>
    <div className="flex justify-between w-full items-center text-white">
        <div className="flex gap-4 text-[.8rem]">
            <p>memorystate</p>
            <p>Documentation</p>
        </div>
        <div className="flex gap-4 text-[1.3rem]">
            <FaGithub />
            <RiNpmjsFill />
        </div>
    </div>
    </>
  )
}
