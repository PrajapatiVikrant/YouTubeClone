import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";
import { videosMethod } from "../State/Slice/Videos";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
   const video = useSelector((state)=>state.Video)
   const [channel,setChannel] = useState({})
   const [relatedVideos,setRelatedVideos] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  console.log(video)
  useEffect(()=>{
     getChannel();
    
  },[]) 
 

  async function getChannel(){
    const token = localStorage.getItem('token');
    try {
      
      const res = await axios.get(`http://localhost:4000/api/channel/${video.channel}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
         const videos = await axios.get(`http://localhost:4000/api/video`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRelatedVideos(videos.data)
        setChannel(res.data)
    } catch (error) {
      console.log(error);
      navigate('/login')
    }
  }
 

  

  return (
    <div className="w-full overflow-auto h-[97vh] px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Video Section */}
        <div className="w-full lg:w-[70%]">
          {/* Video Player */}
          <div className="h-[300px] md:h-[400px] mb-4">
            <iframe
              className="w-full h-full rounded-md"
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold mb-2">{video.title}</h1>

          {/* Info Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 mb-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <img
                src={channel.channelImage}
                alt="Channel Logo"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-sm font-semibold">{channel.channelName}</h2>
                <p className="text-xs text-gray-500">1.5M subscribers</p>
              </div>
              <button className="ml-4 px-4 py-1.5 bg-red-600 text-white rounded-md text-sm font-semibold">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md">
                👍 {video.likes} 
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md">
                👎 {video.dislikes}
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md">
                🔗 Share
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md">
                💾 Save
              </button>
            </div>
          </div>

          {/* Views & Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">
              {video.views} views 
            </p>
            <p className="text-sm whitespace-pre-line">{video.description}</p>
          </div>

          {/* Comments */}
         <Comment comments={video.comments} videoId={video._id}/>
        </div>

        {/* Related Videos */}
        <div className="w-full lg:w-[30%]">
          <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
          <div className="flex flex-col gap-4">
           
            {relatedVideos.map((video) => (
              <div  onClick={()=>dispatch(videosMethod(video))} key={video._id} className="flex gap-3 cursor-pointer">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-36 h-20 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{video.title.slice(0,48)}.....</p>
                 
                  <p className="text-xs text-gray-500">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
