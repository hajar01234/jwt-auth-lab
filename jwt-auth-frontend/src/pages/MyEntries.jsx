import React from 'react'
import { useState, useEffect } from "react"
import { getMyEntries,deleteEntry  } from "../services/entriesServer"
import { Link } from 'react-router'

function MyEntries() {
  const [entries, setEntries] = useState([])

  async function loadEntries() {
    const response = await getMyEntries()
    setEntries(response)
  }

  useEffect(() => {
    loadEntries()
  }, [])
  async function handleDelete(entryId) {
    const response = await deleteEntry(entryId)
        console.log(response)

    loadEntries()
}
  return (
    <div>
      <h1>My Entries</h1>
      {entries.map(oneEntry =>
        <div key={oneEntry._id}>
          <h3>{oneEntry.title}</h3>
          <p>{oneEntry.entryBody}</p>
              <Link to={`/entries/${oneEntry._id}/edit`}> Edit </Link>

              <button onClick={() => handleDelete(oneEntry._id)}> Delete </button>
        </div>
      )}
    </div>
  )
}

export default MyEntries
