import { Box } from "@chakra-ui/layout";
import { React, useState } from "react";
import Chatbox from "../component/Chatbox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
console.log(user)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box   backgroundColor="#ffffff" display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
