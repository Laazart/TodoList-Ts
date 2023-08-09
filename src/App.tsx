import Note from './components/Note/Note';
import { useRef, useState } from 'react';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components';
const StyledNotes = styled.div`
  padding-top:1rem;
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
`;
function App() {
  const [notes, setnotes] = useState([
    {id:uuid(),title:'Titulo 1',description:'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint ',important:true},
    {id:uuid(),title:'Titulo 2',description:'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint ',important:false},
    {id:uuid(),title:'Titulo 3',description:'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint ',important:false}
  ])
  const [message, setmessage] = useState('')
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const importantRef = useRef<HTMLInputElement>(null);
  const addNote = () =>{
    const title = titleRef.current?.value??'';
    const description = descriptionRef.current?.value??'';
    const important = importantRef.current?.checked?? false;
    if (title.trim() === '' || description.trim() === '') {
      setmessage('Debe rellenar los campos vacios')
      setTimeout(() => {
        setmessage('')
      }, 3000);
      return
    }
    const note = {
      id:uuid(),
      title:title,
      description:description,
      important:important
    }
    const newList = [...notes, note]
    setnotes(newList)
    if (titleRef.current && descriptionRef.current){
      titleRef.current.value = ''
      descriptionRef.current.value = ''
    }
  }
  const delateNote = (id:string) => {
    const newList = notes.filter((el) => el.id !==id);
    setnotes(newList)
  }
  return (
    <div className="m-3 ">
      <h1 className="text-center" >Post It!</h1>
      <form className='d-flex gap-3'>
        <input ref={titleRef} className='form-control' type="text" placeholder='Titulo'/>
        <input ref={descriptionRef} className='form-control' type="text" placeholder='Descripcion'/>
        <input ref={importantRef} type="checkbox" />
        <label className='pt-1' >Importante</label>
        <button onClick={addNote} className='btn btn-success' type='button' >Agregar</button>
      </form>
      <div className=' alert alert-danger text-center' hidden={!message}>{message}</div>
      <StyledNotes>
        {
          notes.map((el) => <Note key={el.id} note={el} delateNote={delateNote} />)
        }
      </StyledNotes>
    </div>
  )
}

export default App
