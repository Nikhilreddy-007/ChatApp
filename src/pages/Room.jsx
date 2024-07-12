import React, { useState, useEffect } from "react";
import { ID,Query,Role ,Permission } from "appwrite";
import {MessageSquare, Trash2} from 'react-feather';
import Header from "../components/Header";

import client,{
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { useAuth } from "../utils/AuthContext";
const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody,setMessageBody]=useState('');
  const {user}=useAuth()
  useEffect(() => {
    getMessages();
  const unsubscribe=client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        console.log("Message was created!!")
        setMessages((prevState) => [response.payload,...prevState])
      }
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log("Message was deleted!!")
        setMessages(prevState => prevState.filter((message) => message.$id!==response.payload.$id))
      }
  });

  return () =>{
    unsubscribe()
  }

  }, []);

  let payload={
    user_id:user.$id,
    user_name:user.name,
    body:messageBody
  }
let permissions=[
     Permission.write(Role.user(user.$id))
]
  const handleSubmit= async (e) =>{
       e.preventDefault();
       let response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        ID.unique(),
        payload,
        permissions
       )
       console.log("Response ",response)
       //setMessages((prevState) => [response,...messages])
       setMessageBody('')
  }

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    );
    console.log("Response :", response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) =>{
    await databases.deleteDocument(
        DATABASE_ID, // databaseId
        COLLECTION_ID_MESSAGES,
        message_id)
        setMessages(prevState => prevState.filter((message) => message.$id!==message_id))
    }

  return (
    <main className="container">
      <Header/>
      <form id="message--form" onSubmit={handleSubmit}>
           <div>
            <textarea
               required
               maxLength={1000}
               placeholder="Say Something..."
               onChange={(e) => {setMessageBody(e.target.value)}}
               value={messageBody}
            >
            </textarea>
           </div>
           <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="Submit" value="Send"></input>
           </div>
      </form>  
      <div className="room--container">
        <div>
          {messages.map((message) => (
            <div key={message.id} className="message--wrapper">
              <div className="message--header">
                <p>{
                  message.user_name? (<span>{message.user_name}</span>) :
                  (
                    <span>Anonymous User</span>
                  )
                }
                  <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                  </p>
                  {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
                
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
