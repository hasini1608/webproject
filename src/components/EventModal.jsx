export default function EventModal({
  selected,
  setShow,
  saveEvent,
  setTitle,
  setDesc
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Events on {selected}</h3>

        <input
          placeholder="Event Title"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          onChange={(e)=>setDesc(e.target.value)}
        />

        <div className="buttons">
          <button onClick={saveEvent}>Save</button>
          <button onClick={()=>setShow(false)}>Cancel</button>
        </div>

      </div>
    </div>
  );
}