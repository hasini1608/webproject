import {useState} from "react";
import axios from "axios";

export default function EventSearch(){

const [query,setQuery]=useState("");
const [results,setResults]=useState([]);
const search=async()=>{

try{

const res =
await axios.get(
`http://localhost:8002/event-search/search/${query}`
);
setResults(res.data);
}

catch(error){
console.log(error);
alert("Search failed");
}
}

return (

<div className="search-container">

<h1 className="search-title">
🔎 Search Events
</h1>

<input
className="search-input"

placeholder="Search events..."

value={query}

onChange={
e=>setQuery(e.target.value)
}

/>
<button 
className="search-btn"
onClick={search}>
Search
</button>

{
results.map(event=>(
<div
className="search-card"
key={event._id}
>


<h3>
{event.title}
</h3>


<p>
{event.description}
</p>


<p>
Venue: {event.venue}
</p>


<p>
Date: {event.eventDate}
</p>

</div>

))
}

</div>


)

}