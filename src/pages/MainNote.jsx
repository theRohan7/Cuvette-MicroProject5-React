import React, { useState } from 'react'

function MainNote({activeGroup, groups, notes, addNote}) {

  const [noteText, setNoteText] =  useState('')

  

  const handleSubmit = () => {
    if (noteText.trim()) {
      const newNote = { content: noteText, createdAt: new Date().getTime() };
      addNote(newNote);
      setNoteText("");
    }
  };
  
 
  return (
    <div className='main' >
      {!activeGroup? <div className='no-active-note'>
        <img src="https://s3-alpha-sig.figma.com/img/f2b5/d356/00b6d4748cd536df01bd2b4fecc1d821?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ux~VIcqU6rCuspIUlKrS823Gn3Ac7sHL94h3ks1~bgHwHa3Fl4oOpnj0f2Fgh4LnGuj4zm9dLQ1cuXkwhgAdPYqSC3lan6UnwwNU5xSR7SuoSL3LoyHTZ-kyE8Z9OYn9sTIKU4V9X1ndOUYthCIGs9wohQEsePFvbEpFqQVfNfr-tUlGdATlAVmkoYvSUBCKVZBCGaPDw8FY01x9BbJT6DToUMnuV2TBHhppSrtaL2oGqSN3B-AFfP3NovDvuILRuWosp~gD4kw8-fI3T3kN6pAslkOvC0D~qgqN4F12ReSFIrIkSH3AR2EzXfn8yFnxTNrlgBKbLV~5m94SvNDXRA__" alt="" />
        <h1>POCKET NOTES</h1>
        <p className='para'>Send and receive messages without keeping your phone online.
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

        <p className='footer'><i className="ri-lock-fill"></i> &nbsp;end-to-end encrypted</p>
      </div> :
    <div className='active-note'>
      <div className='note-header'>
        <div className='BackOption'><i className="ri-arrow-left-line"></i></div>
        <div className='logo' style={{backgroundColor:`${activeGroup.color}`}}
          >{activeGroup.name.split(' ').map(word => word[0]).join('')}</div>

          <strong><b>{activeGroup.name}</b></strong> 
    
      </div>
      <div>   
      <div className='notes-content'>
        {notes.map((note, index) =>(
          <div className='notes' key={index}>
            <div className='timestamp' >
            {
                new Date(note.createdAt).toLocaleTimeString('en-Us',{
                  hour:'2-digit',
                  minute:'2-digit',
                  hour12: true
                })
              } 
              <br />
              {new Date(note.createdAt).toLocaleDateString('en-US',{
                year: 'numeric',
                month: 'long',
                day:'numeric'
              })}
              
              
            </div>
            <div  className='note' >
              {note.content}
            </div>
          </div>
        ))}
        
      </div>
      </div>
      <div className='note-form'>
         <form >
         <input 
         type="text"
         value={noteText}
         onChange={(e) => setNoteText(e.target.value)}
         placeholder='Enter your note here...' />

         <button onClick= {(e) =>{
           e.preventDefault();
           handleSubmit()
         }}>
          {!noteText ? <i className="ri-send-plane-2-line"></i> : <i className="ri-send-plane-2-fill"></i> }
          </button>
         </form>
      </div>
    </div>}
    </div>
  )
}

export default MainNote


