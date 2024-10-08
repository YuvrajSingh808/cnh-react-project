import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch } from "../services/store";
import { useNavigate } from "react-router-dom";
import Dashboard, { CompanyProp } from "./Dashboard";
import CreateCompany from "./CreateCompany";
import Profile from "./Profile";
import { logout } from "../services/authSlice";

export default function App() {
  const { userInfo, userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const company:CompanyProp = {
    companyName: '',
    createdAt: Date.now().toString(),
    accountName: '',
    address: '',
    department: '',
    description: '',
    product: '',
    id: ''
  }

  const [currItem, setCurrItem] = useState({label: '', element: <div></div>})
  const menuItems = [
    { label: 'Dashboard', element: <Dashboard setCurrItem={setCurrItem} currItem={currItem} /> },
    { label: 'Create', element: <CreateCompany company={company} /> },
    { label: 'Profile', element: <Profile/> },
  ]


  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
    setCurrItem(menuItems[0])
  }, [userInfo, dispatch])
  return (
    <div className="h-screen w-screen font-mont flex items-center justify-center bg-cover bg-center bg-no-repeat bg-blend-multiply bg-opacity-40 bg-black px-20 py-10" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}>
      <div className="bg-white/20 backdrop-blur-lg w-full h-full rounded-3xl shadow-md flex p-4 gap-x-4">
        <div className="w-1/5 h-full  relative py-6 px-4 rounded-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <img src={userInfo?.avatar} className="rounded-full w-12" />
            <div className="">
              <p className="text-xl text-white">{userInfo?.first_name} {userInfo?.last_name}</p>
              <p className="text-sm text-white/50">{userInfo?.email}</p>
            </div>
          </div>

          {menuItems.map((menuItem) => <MenuItem item={menuItem} currItem={currItem} setCurrItem={setCurrItem} />)}
          <button className={`flex w-full absolute bottom-2 border border-transparent my-2 rounded-full py-2 px-4 text-white hover:bg-white/10`} onClick={() => {
            dispatch(logout())
            console.log(userInfo)
          }}>
            Sign Out
          </button>
        </div>
        {currItem.element}
      </div>
    </div>
  )
}

interface menuItemProps {
  item: any;
  currItem: any;
  setCurrItem: Function;
  additonalClasses?: string | ''
}

function MenuItem(props: menuItemProps) {
  return (
    <button className={`flex w-full border border-transparent my-2 rounded-full py-2 px-4 ${props.item.label === props.currItem.label ? `font-bold text-primary bg-white/20` : `text-white hover:bg-white/10`} ${props.additonalClasses}`} onClick={() => {
      props.setCurrItem(props.item)
    }}>
      {props.item.label}
    </button>
  )
}