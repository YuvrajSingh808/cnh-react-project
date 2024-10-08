import { useSelector } from "react-redux";
import store from "../services/store";

export default function Profile() {
    const { userInfo } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    return (
        <div className="w-full py-8 h-min px-8">
            <h1 className="font-bold text-white text-2xl w-auto text-nowrap">Profile</h1>
            <div className="flex items-center px-20 py-8 gap-x-16">

                <div className="bg-white/20 w-1/3 h-1/3 p-4 rounded-full">
                    <img src={userInfo?.avatar} alt="" className="w-full h-full rounded-full" />
                    
                </div><div className="bg-white/20 rounded-3xl px-8 py-4 space-y-8" >
                    <div className="text-xl text-white items-center justify-center">
                        Name: {userInfo?.first_name} {userInfo?.last_name}
                        
                    </div>
                    <div className="text-xl text-white items-center justify-center">
                        Email: {userInfo?.email}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}