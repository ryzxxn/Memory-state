import { FaRegCopy } from "react-icons/fa";
import { Toaster, toast } from 'sonner'
export default function Documentation() {
  return (
    <>
    <Toaster />
    <div className="text-white">
        <div className="flex flex-col">
            <div className="flex p-2 bg-[rgb(12,12,12)] rounded-md w-1/2 justify-between items-center">
            <div>
                <p className="uppercase text-blue-500">Install</p>
                <p>npm install memory-state</p>
            </div>
                <p onClick={() => {toast("Copied")}}><FaRegCopy /></p>
            </div>
        </div>
    </div>
    </>
  )
}