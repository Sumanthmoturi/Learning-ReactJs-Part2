//B.State:A Component memory

//1.State:- In React, data that changes over time is called state. You can add state to any component, and update it as needed.
import { useState } from 'react';
export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}


/*3.Hooks:-
            1.In React, useState, as well as any other function starting with “use”, is called a Hook.
            2.Hooks are special functions that are only available while React is rendering.They let you “hook into” different React features
            3.useState():-When you call useState, you are telling React that you want this component to remember something
*/                              
const [index, setIndex] = useState(0);

//4.Giving a component multiple state variables:-
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
/*5.State is isolated and private:-
                                 1.State is local to a component instance on the screen. 
                                 2.if you render the same component twice, each copy will have completely isolated state,changing one of them will not affect the other.
*/





//C.Render and Commit Concept
/*1.Render and Commit:-
                         1.Before your components are displayed on screen, they must be rendered by React
                         2.Any screen update in a React app happens in three steps:
                                                      1.Trigger
                                                      2.Render
                                                      3.Commit

Step1:-Trigger a render:-There are two reasons for a component to render:
                                                                          ->It’s the component’s initial render.
                                                                          ->The component’s state has been updated.
*/
//index.js file
import Image from './Image.js';
import { createRoot } from 'react-dom/client';
const root1 = createRoot(document.getElementById('root'))
root1.render(<Image />);
//image.js file
export default function Image() {
    return (
      <img
        src="https://i.imgur.com/ZF6s192.jpg"
        alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
      />
    );
  }
/*Step2:-React renders your components:-
                                        ->After you trigger a render, React calls your components to figure out what to display on screen
                                        ->“Rendering” is React calling your components.
*/
//index.js file
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
//Gallery.js file
export default function Gallery() {
    return (
      <section>
        <h1>Inspiring Sculptures</h1>
        <Image />
        <Image />
        <Image />
      </section>
    );
  }
  
  function Image() {
    return (
      <img
        src="https://i.imgur.com/ZF6s192.jpg"
        alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
      />
    );
  }
/*Step 3:-
           ->React commits changes to the DOM
           ->After rendering (calling) your components, React will modify the DOM.
           ->React only changes the DOM nodes if there’s a difference between renders.
           ->Example
*/
export default function Clock({ time }) {
    return (
      <>
        <h1>{time}</h1>
        <input />
      </>
    );
  }



/*D.State as a snapshot:-
                         1.state behaves more like a snapshot. 
                         2.Setting it does not change the state variable you already have, but instead triggers a re-render.
*/
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}

//3.Rendering takes a snapshot in time
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

//4.State over time
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}

//5.Updating the same state multiple times before the next render
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
//6.update state after replacing it 
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}