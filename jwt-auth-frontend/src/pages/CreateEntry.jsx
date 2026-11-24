import React from 'react'
import { useState } from 'react'
import { createEntry } from '../services/entriesServer'
import { useNavigate } from "react-router"

function CreateEntry() {
    const [formData, setFormData] = useState({
        title: "",
        entryBody: "",
        isPublic: false
    })
    const navigate = useNavigate()
    function handleChange(event) {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await createEntry(formData)
        navigate('/entries/my-entries')
    }

  return (
    <div>
        <h1>Create Entry</h1>

            <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Entry Body</label>
                <textarea
                    name="entryBody"
                    value={formData.entryBody}
                    onChange={handleChange}
                />

                <label>Public</label>
                <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                />
                <button type="submit">Create Entry</button>
            </form>      
    </div>
  )
}

export default CreateEntry
