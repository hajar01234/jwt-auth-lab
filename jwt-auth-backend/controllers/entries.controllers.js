const User =require('../models/User')
const Entry =require('../models/Entry')


async function createEntry(req, res) {
    try {
        console.log(req.user)

        const { title, entryBody, isPublic } = req.body

        const createdEntry = await Entry.create({
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
            owner: req.user._id
        })

        res.status(201).json(createdEntry)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


async function getAllEntries(req, res) {
  try {
    const myEntries  = await Entry.find({ isPublic: true })

    return res.status(200).json(myEntries )
  } catch (err) {
    console.error(err)

    return res.status(500).json({message: "Internal Server Error"})
  }
}

async function getMyEntries(req, res) {
    try {
        const myEntries = await Entry.find({ owner: req.user._id })


        res.status(200).json(myEntries)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })

    }
}


async function updateEntry(req, res) {
    try {
        const entry = await Entry.findById(req.params.entryId)

        if (!entry) {
            return res.status(404).json({ message: "Entry not found" })
        }

        if (entry.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not the owner of this entry" })
        }

        const { title, entryBody, isPublic } = req.body

        const updatedEntry = await Entry.findByIdAndUpdate(req.params.entryId,
            {
                title: title,
                entryBody: entryBody,
                isPublic: isPublic
            },
        {returnDocument: "after",runValidators: true},
        )

        res.status(200).json(updatedEntry)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

async function deleteEntry(req, res) {
    try {
        const entry = await Entry.findById(req.params.entryId)

        if (!entry) {
            return res.status(404).json({ message: "Entry not found" })
        }

        if (entry.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not the owner of this entry" })
        }

        await Entry.findByIdAndDelete(req.params.entryId)

        res.status(200).json({ message: "Entry deleted successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
  createEntry,
  getAllEntries,
  getMyEntries,
  updateEntry,
  deleteEntry
};
