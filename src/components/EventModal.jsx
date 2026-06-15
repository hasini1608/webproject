export default function EventModal({
  selected,
  setShow,
  saveEvent,
  setTitle,
  setDesc,
  setStartTime,
  setEndTime,
  setVenue
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

       <input
type="time"
placeholder="Start Time"
onChange={(e)=>setStartTime(e.target.value)}
/>

<input
type="time"
placeholder="End Time"
onChange={(e)=>setEndTime(e.target.value)}
/>

<input
placeholder="Venue"
onChange={(e)=>setVenue(e.target.value)}
/>
        <div className="buttons">
          <button onClick={saveEvent}>Save</button>

        </div>

      </div>
    </div>
  );
}