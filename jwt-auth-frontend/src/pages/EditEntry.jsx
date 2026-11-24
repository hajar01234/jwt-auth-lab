import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getMyEntries, updateEntry } from '../services/entriesServer'

function EditEntry() {
       const { entryId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        entryBody: "",
        isPublic: false
    })

    const [isOwner, setIsOwner] = useState(false)

    async function loadEntry() {
        const response = await getMyEntries()
        const entry = response.find(oneEntry => oneEntry._id === entryId)

        if (entry) {
            setFormData({
                title: entry.title,
                entryBody: entry.entryBody,
                isPublic: entry.isPublic
            })
            setIsOwner(true)
        } else {
            navigate('/entries')
        }
    }

    useEffect(() => {
        loadEntry()
    }, [entryId])

    function handleChange(event) {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await updateEntry(entryId, formData)
        navigate('/entries/my-entries')
    }

    if (!isOwner) {
        return null
    }
  return (
    <div>
         <h1>Edit Entry</h1>

            <form onSubmit={handleSubmit}>

                <label>Title: </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Entry Body: </label>
                <textarea
                    name="entryBody"
                    value={formData.entryBody}
                    onChange={handleChange}
                />

                <label>Public: </label>
                <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                />

                <button type="submit">Save Changes</button>

            </form>
      
    </div>
  )
}

export default EditEntry
