// import React, { useEffect, useState, useRef, CSSProperties } from 'react';
// import BeatLoader from "react-spinners/BeatLoader";

// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [lastMsg, setLastMsg] = useState('');
//   const [imgUploaded, setImgUploaded] = useState('');
//   useEffect(() => {
//     console.log(messages);
//     scrollToBottom();
//   }, [messages]);

//   const messagesEndRef = useRef(null);
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
//   const [searchType, setSearchType] = useState('prompt');
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState('');
//   const [file, setFile] = useState(null);
//   const [url, setUrl] = useState('');
//   const ref = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let message;
//       let prompt;
//       if (searchType === 'prompt') {
//         message = JSON.stringify({ prompt: input });
//         prompt = input;
//       } else if (searchType === 'image') {
//         console.log(url);
//         message = JSON.stringify({ imgURL: url });
//         prompt = url;
//         ref.current.value = '';
//         setSearchType('prompt');
//       }
//       setLastMsg(prompt);
//       setInput('');
//       setImgUploaded('');
//       setFile(null);
//       const response = await fetch(searchType === 'prompt' ? '/Search' : '/SearchIMG', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: message
//       });
//       const data = await response.json();
//       setResult(data);
//       setMessages([
//         ...messages,
//         {
//           prompt,
//           answer: data,
//         },
//       ]);
//       setLastMsg('');
      
//     } catch (error) {
//       console.error('Error fetching result:', error);
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const form = new FormData();
//       form.append('file', file);
//       form.append('upload_preset', "mexplo");
  
//       const response = await fetch('https://api.cloudinary.com/v1_1/djrcqw5df/upload', {
//         method: 'POST',
//         body: form
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setUrl(data.secure_url);
//         setImgUploaded(data.secure_url);
//         setSearchType('image');
//         console.log(imgUploaded);
//         // setInput(url);
//       } else {
//         console.error('Error uploading file:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   // return (
//   //   <div>
//   //     <h1>Moroccan Explorer</h1>
      
//   //     <form onSubmit={handleSubmit}>
//   //       <div>
//   //         {/* <input
//   //           type="radio"
//   //           id="prompt"
//   //           name="searchType"
//   //           value="prompt"
//   //           checked={searchType === 'prompt'}
//   //           onChange={() => setSearchType('prompt')}
//   //         /> */}
//   //         {/* <label htmlFor="prompt">Search by Prompt</label> */}
//   //       </div>
//   //       <div>
//   //         {/* <input
//   //           type="radio"
//   //           id="image"
//   //           name="searchType"
//   //           value="image"
//   //           checked={searchType === 'image'}
//   //           onChange={() => setSearchType('image')}
//   //         />
//   //         <label htmlFor="image">Search by Image URL</label> */}
//   //       </div>
//   //       {/* <label htmlFor="input">Enter {searchType === 'prompt' ? 'prompt' : 'image URL'}:</label> */}
//   //       <input
//   //         type="text"
//   //         id="input"
//   //         value={input}
//   //         onChange={(e) => setInput(e.target.value)}
//   //       />
//   //       <input type="file" 
//   //       accept="image/*" 
//   //       onChange={(e) => setFile(e.target.files[0])}
//   //       ref = {ref}/>
//   //       {/* <button onClick={uploadImage}>upload</button> */}
//   //       <button type="button" onClick={uploadImage}>upload</button>
//   //       <img src={url} />
//   //       <button type="submit" >Search</button>
//   //     </form>
//   //     {result && (
//   //       <div>
//   //         <h2>Result:</h2>
//   //         <p>{result}</p>
//   //       </div>
//   //     )}
//   //   </div>
//   // );

//   return (
//     <div className="guidini">
//       <div className="flex h-screen">
//         <div className="flex flex-col flex-1">
//           <div className="overflow-y-auto p-4 space-y-4 flex-1">
//             <div className="messages">
            
//               {/* {lastMsg} */}
//               {messages.map((message, index) => (
//                 <div key={index}>
//                   <div className="text-right">
                    
//                       {message.prompt.includes("https://res.cloudinary.com/") ?
//                       <div className="inline-block bg-amber-700 text-white rounded px-4 py-2 w-72">
//                         <img src={message.prompt}/> 
//                       </div>
//                         : <div className="inline-block bg-amber-700 text-white rounded px-4 py-2">
//                         {message.prompt}
//                       </div>}
                    
//                   </div>

//                   <div className="text-left">
//                     <div className="inline-block bg-gray-300 rounded px-4 py-2">
//                       {message.answer}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {lastMsg && 
//               <div className="text-right">
                    
//                       {lastMsg.includes("https://res.cloudinary.com/") ? 
//                       <div className="inline-block bg-amber-700 text-white rounded px-4 py-2 w-72"> 
//                         <img src={lastMsg}/> 
//                       </div>
//                       : 
//                       <div className="inline-block bg-amber-700 text-white rounded px-4 py-2"> 
//                         {lastMsg} 
//                       </div>}
                    
//             </div>}
//             <div ref={messagesEndRef}>
//             </div>
//             </div>
//           </div>

//           <div className="p-4 border-t border-gray-200">
//             {!lastMsg && <div>
//               {imgUploaded && 
//                   <div className=" opacity-50 size-52">
//                         <div className="inline-block text-white rounded px-4 py-2">
//                           <img src={imgUploaded}/>
//                         </div>
//                 </div>}
//                 <div className="flex gap-4">
//                   <form onSubmit={handleSubmit} id="fr" className="w-full">
//                     <input
//                       type="text"
//                       name="chat"
//                       id="chat"
//                       className="className=flex-1 p-2 border border-gray-300 rounded w-full"
//                       placeholder="Enter prompt"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                     />
                    
//                     <input type="file" 
//                       accept="image/*" 
//                       id='files'
//                       onChange={(e) => setFile(e.target.files[0])}
//                       ref = {ref}
//                       className='hidden'/>
//                       {/* <button onClick={uploadImage}>upload</button> */}
                      
//                       {/* <img src={url} /> */}
//                   </form>
//                   <div className='flex items-center'>
//                   {file && <button type="button" className='text-amber-700 font-bold' onClick={uploadImage}>Upload</button>}
//                   {!file &&
//                     <label className='cursor-pointer' for="files">
//                     <svg className='stroke-amber-700 w-6 h-6 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
//                     </svg>

//                     </label>}
//                   <button className="bg-amber-700 text-white hover:bg-amber-600 rounded px-4 py-2 font-bold" type="submit" form="fr">Send</button>
//                   </div>
//                 </div>
//                 </div>}
//             {lastMsg &&
//               <div className='flex justify-center'>
//                 <BeatLoader 
//                   color='brown'
//                   loading='loading'
//                   size={20}
//                   aria-label="Loading Spinner"
//                   data-testid="loader"
//                 />
//               </div>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Mexplorer from "./Mexplorer";
import Login from "./Login";
const App = () => {
  return (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Mexplorer}/>
        <Route path="/Login" component={Login}/>
      </Switch>
    </Router>
  </div>
);};

export default App;