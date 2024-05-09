import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import { auth, app } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref as fref, set, push, get, remove } from "firebase/database";
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const Mexplorer = () => {
    const [muser, setMuser] = useState('');
    const [me, setMe] = useState('');
  const [messages, setMessages] = useState([]);
  const [messagesF, setMessagesF] = useState([]);
  const [lastMsg, setLastMsg] = useState('');
  const [imgUploaded, setImgUploaded] = useState('');
  const history = useHistory();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchData();
        //   return history.push("/");
        } else {
          return history.push("/Login");
        }
      });
    console.log(messages);
    scrollToBottom();
    
    
  }, [messages]);

  const handleLogout = () => {               
    signOut(auth).then(() => {
        localStorage.clear();
        return history.push("/Login");
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  const [searchType, setSearchType] = useState('prompt');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const ref = useRef(null);


  const clear = async () => {
    const db = getDatabase(app);
    const dbRef = fref(db,  localStorage.getItem('email').replace("@gmail.com", ""));
    await remove(dbRef);
    window.location.reload();
  }

  const fetchData = async () => {
    console.log(localStorage);
    const db = getDatabase(app);
    const email = localStorage.getItem('email');
    if (email) {
      const dbRef = fref(db, email.replace("@gmail.com", ""));
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setMessagesF(Object.values(snapshot.val()));
      } else {
        console.log("error");
      }
    } else {
      console.log("Email not found in local storage");
    }
  }


  const saveData = async () => {
    // const db = getDatabase(app);
    // const newDocRef = push(ref(db, localStorage.getItem('email').replace("@gmail.com", "")));
    // set(newDocRef,{
    //     usermsg: muser,
    //     MEmsg: me,
    // }).then(() => {
    //     console.log('Document successfully written!');
    //     console.log(muser, me);
    //     setMuser('');
    //     setMe('');
    // }).catch((error) => {
    //     console.error('Error writing document: ', error);
    // })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let message;
      let prompt;
      if (searchType === 'prompt') {
        message = JSON.stringify({ prompt: input });
        prompt = input;
      } else if (searchType === 'image') {
        console.log(url);
        message = JSON.stringify({ imgURL: url });
        prompt = url;
        ref.current.value = '';
        setSearchType('prompt');
      }
      setLastMsg(prompt);
      setInput('');
      setImgUploaded('');
      setFile(null);
      setUrl('');
      const response = await fetch(searchType === 'prompt' ? '/Search' : '/SearchIMG', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: message
      });
      const data = await response.json();
      setResult(data);
      setMessages([
        ...messages,
        {
          prompt,
          answer: data,
        },
      ]);

    console.log(prompt);
    const db = getDatabase(app);
    const newDocRef = push(fref(db, localStorage !== null && localStorage.getItem('email').replace("@gmail.com", "")));
    set(newDocRef,{
        usermsg: prompt,
        MEmsg: data,
    }).then(() => {
        console.log('Document successfully written!');
        console.log(prompt, data);
        setMuser('');
        setMe('');
    }).catch((error) => {
        console.error('Error writing document: ', error);
    })


      setMuser(prompt);
      setMe(data);
      setLastMsg('');
      saveData();
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  const uploadImage = async () => {
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', "mexplo");
  
      const response = await fetch('https://api.cloudinary.com/v1_1/djrcqw5df/upload', {
        method: 'POST',
        body: form
      });
  
      if (response.ok) {
        const data = await response.json();
        setUrl(data.secure_url);
        setImgUploaded(data.secure_url);
        setSearchType('image');
        console.log(imgUploaded);
        // setInput(url);
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // return (
  //   <div>
  //     <h1>Moroccan Explorer</h1>
      
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         {/* <input
  //           type="radio"
  //           id="prompt"
  //           name="searchType"
  //           value="prompt"
  //           checked={searchType === 'prompt'}
  //           onChange={() => setSearchType('prompt')}
  //         /> */}
  //         {/* <label htmlFor="prompt">Search by Prompt</label> */}
  //       </div>
  //       <div>
  //         {/* <input
  //           type="radio"
  //           id="image"
  //           name="searchType"
  //           value="image"
  //           checked={searchType === 'image'}
  //           onChange={() => setSearchType('image')}
  //         />
  //         <label htmlFor="image">Search by Image URL</label> */}
  //       </div>
  //       {/* <label htmlFor="input">Enter {searchType === 'prompt' ? 'prompt' : 'image URL'}:</label> */}
  //       <input
  //         type="text"
  //         id="input"
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //       />
  //       <input type="file" 
  //       accept="image/*" 
  //       onChange={(e) => setFile(e.target.files[0])}
  //       ref = {ref}/>
  //       {/* <button onClick={uploadImage}>upload</button> */}
  //       <button type="button" onClick={uploadImage}>upload</button>
  //       <img src={url} />
  //       <button type="submit" >Search</button>
  //     </form>
  //     {result && (
  //       <div>
  //         <h2>Result:</h2>
  //         <p>{result}</p>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="guidini">
      <div className="px-[10%] p-4 border-gray-200 fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-700 z-10 flex flex-row items-center justify-between">
      <div className='text-white text-xl font-bold'>Morocco Explorer</div>
      <div className='flex items-start'>
        <button className='text-white bg-white/5 hover:bg-white/10 rounded px-2 py-1 mb-2' onClick={handleLogout}>signOut</button>
        <button className='text-white bg-white/5 hover:bg-white/10 rounded px-2 py-1 ml-2' onClick={clear}>Clear chat</button>
      </div>
      </div>
      
      {/* <div className="flex h-screen "> */}
        <div className="flex flex-col flex-1 relative">
          <div className="overflow-y-auto space-y-4 flex-1 mb-20">
            <div className="messages mt-28">
            
              {/* {lastMsg} */}
              {messagesF.map((message, index) => (
                <div key={index}>
                  <div className="text-right px-[10%] flex flex-col items-end">
                    <div className='flex items-center flex-row-reverse mb-2 '>
                      <div>
                        <img className='w-10 rounded-full ml-2' src={localStorage.getItem("photo")} alt='profileImg'/>
                      </div>
                      <div className='text-sm text-white font-bold'>
                        {localStorage.getItem("user")}
                      </div>
                    </div>
                    
                      {message.usermsg.includes("https://res.cloudinary.com/") ?
                      <div className="inline-block text-white  bg-white/5 rounded-xl px-4 py-2 w-72">
                        <img src={message.usermsg}/> 
                      </div>
                        : <div className="inline-block text-white  bg-white/5 rounded-xl px-4 py-2">
                        {message.usermsg}
                      </div>}
                    
                  </div>

                  <div className="text-left my-4 px-[10%] flex flex-col items-start">
                  <div className='flex items-center flex-row mb-2 '>
                      <div>
                        <img className='w-10 rounded-full' src='https://cdn.countryflags.com/thumbs/morocco/flag-400.png' alt='profileImg'/>
                      </div>
                      <div className='text-sm text-white font-bold ml-2'>
                        Morocco Explorer
                      </div>
                    </div>
                    <div className="inline-block text-white bg-white/10 rounded-xl px-4 py-2">
                      {message.MEmsg}
                    </div>
                  </div>
                </div>
              ))}
              {lastMsg && 
              <div className="text-right px-[10%] flex flex-col items-end">
                    <div className='flex items-center flex-row-reverse mb-2 '>
                      <div>
                        <img className='w-10 rounded-full ml-2' src={localStorage.getItem("photo")} alt='profileImg'/>
                      </div>
                      <div className='text-sm text-white font-bold'>
                        {localStorage.getItem("user")}
                      </div>
                    </div>
                      {lastMsg.includes("https://res.cloudinary.com/") ? 
                      <div className="inline-block text-white  bg-white/5 rounded-xl px-4 py-2 w-72"> 
                        <img src={lastMsg}/> 
                      </div>
                      : 
                      <div className="inline-block text-white  bg-white/5 rounded-xl px-4 py-2"> 
                        {lastMsg} 
                      </div>}
                    
            </div>}
            <div ref={messagesEndRef}>
            </div>
            </div>
          </div>

          <div className="p-4 border-gray-200 fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-700">
            {!lastMsg && <div>
              {imgUploaded && 
                  <div className=" opacity-50 size-52">
                        <div className="inline-block text-white rounded px-4 py-2">
                          <img src={imgUploaded}/>
                        </div>
                </div>}
                <div className="flex gap-4  px-[10%]">
                  <form onSubmit={handleSubmit} id="fr" className="w-full relative">
                    <input
                      type="text"
                      name="chat"
                      id="chat"
                      className="className=flex-1 p-2 outline-none border border-gray-500 focus:border-gray-400 text-white rounded-xl w-full bg-transparent"
                      placeholder="Enter prompt"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    
                    <input type="file" 
                      accept="image/*" 
                      id='files'
                      onChange={(e) => setFile(e.target.files[0])}
                      ref = {ref}
                      className='hidden'/>
                      {/* <button onClick={uploadImage}>upload</button> */}
                      
                      {/* <img src={url} /> */}
                      <div className='flex items-center absolute bottom-1.5 right-2'>
                    {file && !url && <button type="button" className='text-amber-700 font-bold' onClick={uploadImage}>
                        <svg className='stroke-white/70 hover:stroke-white/100 w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                      </button>}
                    {!file &&
                      <label className='cursor-pointer' for="files">
                        <svg className='stroke-white/70 hover:stroke-white/100 w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                      {/* <svg className='stroke-white/20 hover:stroke-white/30 w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg> */}

                      </label>
                      
                      }
                    {(input || url)  && <button className=" text-white/70 hover:text-white/100 rounded font-bold mx-1 " type="submit" form="fr"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>

                    </button>}
                    {!(input || url)  && <button disabled className=" text-white/20 rounded font-bold mx-1" type="submit" form="fr"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>

                    </button>}
                      
                  </div>
                  </form>
                  
                </div>
                </div>}
            {lastMsg &&
              <div className='flex justify-center'>
                <BeatLoader 
                  color='white'
                  loading='loading'
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Mexplorer;
