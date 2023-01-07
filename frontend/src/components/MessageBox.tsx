import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
enum MessageType {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning",
}

const MessageBox = (props: any) => {
  const { message, variant } = props;
  const [typeOfMessage, setTypeOfMessage] = useState("");

  useEffect(() => {
    switch (variant) {
      case MessageType.Error:
        setTypeOfMessage("bg-red-500");
        break;
      case MessageType.Success:
        setTypeOfMessage("bg-green-500");
        break;
      case MessageType.Info:
        setTypeOfMessage("bg-blue-500");
        break;
      case MessageType.Warning:
        setTypeOfMessage("bg-yellow-500");
        break;
      default:
        setTypeOfMessage("bg-blue-500");
        break;
    }
  }, [variant]);
  return <motion.div initial={{ scale: 0 }}
  animate={{ scale: 1 }}
   className={typeOfMessage +" text-white text-sm font-bold px-4 py-3 mb-5 rounded w-full text-center "}>{message}</motion.div>;
};

export default MessageBox;
