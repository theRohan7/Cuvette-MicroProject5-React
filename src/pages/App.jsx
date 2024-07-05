import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Sidebar from './Sidebar'
import MainNote from './MainNote';


function App() {

    
    const [groups, setGroups] = useState(localStorage.groups ? JSON.parse(localStorage.groups) : [])

    const[ activeGroup, setActiveGroup] = useState(false)
    

    useEffect(() => {
      localStorage.setItem("groups", JSON.stringify(groups));
    }, [groups]);

    const formatDateTime = () => {
      const date = new Date();
    
      const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
      const timeString = date.toLocaleString('en-US', timeOptions);
    
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const dateString = date.toLocaleDateString('en-GB', dateOptions);
    
      return { timeString, dateString };
    };


    

    const addGroup = (color, name) => {
      const { timeString, dateString } = formatDateTime();

      const newGroup = {
        id: uuidv4(),
        name: name,
        color: color,
        notes: [],
        time: timeString,
        date: dateString
      };
      setGroups([newGroup, ...groups]);
    };


    const addNote = (noteText) => {
      const updatedGroups = groups.map(group => {
        if (group.id === activeGroup.id) {
          return { ...group, notes: [...group.notes, noteText] };
        }
        return group;
      });
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(groups));
    };

    

    console.log(activeGroup);

  return (
    <div className='App'>
        <Sidebar 
        groups={groups} 
        addGroup={addGroup} 
        activeGroup= {activeGroup} 
        setActiveGroup={setActiveGroup}
        />

        <MainNote 
        activeGroup={activeGroup}
        groups={groups}
        addNote={addNote}
        notes ={groups.find((group) => group.id === activeGroup.id)?.notes || []}
      
        />

      
    </div>
  )
}

export default App
