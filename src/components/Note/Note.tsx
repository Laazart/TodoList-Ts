import styled from 'styled-components';
const NoteBox = styled.div`
  width:22rem;
`;
interface NoteProps{
  note:{
    id:string;
    title:string;
    description:string;
    important:boolean;
  };
  delateNote:(id:string) => void;
}
function Note({delateNote ,note}:NoteProps) {
  const {id, title, description, important} = note;
  const removeNote = () => delateNote(id)
  return (
    <NoteBox className={`card ${important ? 'bg-danger':''}`} >
      <div className="d-flex justify-content-between card-body">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div >
          <button className='btn pt-3' onClick={removeNote}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </NoteBox>
  )
}
export default Note
