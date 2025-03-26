import { useRef, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BACKEND_URL } from "../assets/config.jsx";


const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
const {selectedUser} = useSelector(store => store.user);
const {messages} = useSelector(store => store.message);
//   const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
        const res = await axios.post(
            `${BACKEND_URL}/api/message/send/${selectedUser._id}`,
            { message: text, picture:imagePreview },  // Change `input` to `message`
            {
                headers: {
                    'Content-Type': 'application/json'  // Corrected header
                },
                withCredentials: true
            }
        );
       dispatch(setMessages([...messages, res?.data?.message]))
console.log('res---------',res);

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
{/* 
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md bg-white text-black block"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} color="red"/>
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle bg-white "
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form> */}

<form onSubmit={handleSendMessage} className="flex items-center gap-2">
  <div className="flex-1 flex gap-2 items-center">
    {/* Text Input */}
    <input
      type="text"
      className="w-full input input-bordered rounded-lg input-sm sm:input-md bg-white text-black block"
      placeholder="Type a message..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={fileInputRef}
      onChange={handleImageChange}
    />

    {/* Image Select Button */}
    <button
      type="button"
      className={`sm:flex items-center justify-center w-8 h-8 rounded-full
                  ${imagePreview ? "bg-emerald-100 text-emerald-500" : "bg-transparent text-gray-400"}
                  md:hover:bg-gray-300 focus:outline-none transition duration-200`}
      onClick={() => fileInputRef.current?.click()}
    >
      <Image size={20} />
    </button>
  </div>

  {/* Send Button */}
  <button
    type="submit"
    className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${text.trim() || imagePreview ? "bg-green-500 text-white" : "bg-transparent text-gray-400"}
                hover:bg-green-600 focus:outline-none transition duration-200`}
    disabled={!text.trim() && !imagePreview}
  >
    <Send size={20} />
  </button>
</form>


    </div>
  );
};
export default MessageInput;