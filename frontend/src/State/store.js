import { configureStore } from "@reduxjs/toolkit";
import Sidbar from "./Slice/Sidebar"


const Store = configureStore({
    reducer:{
        Sidebar:Sidbar
    }
})

export default Store