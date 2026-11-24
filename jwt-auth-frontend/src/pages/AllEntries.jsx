import React from 'react'
import {useState, useEffect} from 'react'
import { getAllEntries } from '../services/entriesServer'

function AllEntries() {
    const [entries, setEntries] = useState([])
    async function loadEntries() {
        const response = await getAllEntries()
        setEntries(response)
    }
    useEffect(() => {
        loadEntries()
    }, [])
  return (
    <div>
        <h1>Public Entries</h1>
            {entries.map(oneEntry =>
                <div key={oneEntry._id}>
                    <h3>{oneEntry.title}</h3>
                    <p>{oneEntry.entryBody}</p>
                </div>
            )}
      
    </div>
  )
}

export default AllEntries
