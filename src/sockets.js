import Note from './models/Note'
//import { updateNote}  from './public/socket.'

export default (io) => {
    io.on('connection', (socket) =>{
        /* console.log('New user connected'); */
        const emitNotes = async () => {
            const notes = await Note.find()
            io.emit('server:loadnotes', notes)
        }
        emitNotes()

        socket.on('client:newnote', async (data) => {
            const newNote = new Note(data)
            const savedNote = await newNote.save()
            io.emit('server:newnote', savedNote);
        }) 

        socket.on('client:deletenote', async (id) => {
            await Note.findByIdAndDelete(id)
            emitNotes()
        })

        socket.on('client:getnote', async (id) => {
            const note = await Note.findById(id)
            io.emit('server:selectednote', note)
        }) 

        socket.on('client:updatenote', async (updateNote) =>{
            await Note.findByIdAndUpdate(updateNote._id, {
                title: updateNote.title,
                description: updateNote.description
            });
            emitNotes();
        })

    })
}