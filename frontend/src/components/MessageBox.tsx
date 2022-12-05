import React, { useEffect, useState } from "react";

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
        setTypeOfMessage(" text-red-700");
        break;
      case MessageType.Success:
        setTypeOfMessage(" text-green-700");
        break;
      case MessageType.Info:
        setTypeOfMessage(" text-blue-700");
        break;
      case MessageType.Warning:
        setTypeOfMessage(" text-yellow-700");
        break;
      default:
        setTypeOfMessage(" text-blue-700");
        break;
    }
  }, [variant]);
  return <div className={typeOfMessage}>{message}</div>;
};

export default MessageBox;
