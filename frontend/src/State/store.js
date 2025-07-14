import { configureStore } from "@reduxjs/toolkit";
import Sidebar from "./Slice/Sidebar"
import Channel from "./Slice/Channel"
import Video from "./Slice/Videos"
import VideoList from "./Slice/VideoList"
import IsLogged from "./Slice/IsLogged"

const Store = configureStore({
    reducer:{
        Sidebar,
        Channel,
        Video,
        VideoList,
        IsLogged
    }
})

export default Store