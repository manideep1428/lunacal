import { Plus } from "lucide-react";
import { useRef } from "react";

export default function InputFile({addImage}:{addImage:(e :React.ChangeEvent<HTMLInputElement>)=>void}) {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            //@ts-ignore
            fileInputRef.current.click();
            //accept only images
            
        }
    };

    return (
        <div
            className="flex items-center justify-center w-[138px] text-sm text-white h-[44px] rounded-full bg-[#363C43] input-shadow hover:cursor-pointer transtion duration-300 ease hover:w-[142px] hover:h-[46px]"
            onClick={handleClick}
        >
            <Plus className="w-3 h-3 text-white" />
            ADD IMAGE
            <input
                id="dropzone-file"
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                //@ts-ignore
                onClick={addImage}
            />
        </div>
    );
}
