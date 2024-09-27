/*A.Responding to Events:-
                           1.React lets you add event handlers to your JSX.
                           2.Event handlers are your own functions that will be triggered in response to user interactions
*/
export default function Button() {
    function handleClick() {
      alert('You clicked me!');
    }
  
    return (
      <button onClick={handleClick}>
        Click me
      </button>
    );
  }
//3.Alternatively, you can define an event handler inline in the JSX  
<button onClick={function handleClick() {
  alert('You clicked me!');
}}></button>

/*4.For more concise,we can use arrow functions
    <button onClick={() => {
        alert('You clicked me!');
    }}>
*/
                           
/*5.Functions passed to event handlers must be passed, not called
        <button onClick={() => alert('You clicked me!')}></button>
*/


/*6.Reading props in event handlers:-
                                      1.Because event handlers are declared inside of a component, they have access to the component’s props
*/
function AlertButton({ message, children }) {
    return (
      <button onClick={() => alert(message)}>
        {children}
      </button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div>
        <AlertButton message="Playing!">
          Play Movie
        </AlertButton>
        <AlertButton message="Uploading!">
          Upload Image
        </AlertButton>
      </div>
    );
  }

//7.Passing event handlers as props
function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  
  function PlayButton({ movieName }) {
    function handlePlayClick() {
      alert(`Playing ${movieName}!`);
    }
  
    return (
      <Button onClick={handlePlayClick}>
        Play "{movieName}"
      </Button>
    );
  }
  
  function UploadButton() {
    return (
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
      </div>
    );
  }

/*8.Naming event handler props:-
                                 1.Built-in components like <button> and <div> only support browser event names like onClick.
                                 2.When you’re building your own components, you can name their event handler props
                                 3.By convention, event handler props should start with on, followed by a capital letter.
*/
function Button({ onSmash, children }) {
    return (
      <button onClick={onSmash}>
        {children}
      </button>
    );
  }
  
  export default function App() {
    return (
      <div>
        <Button onSmash={() => alert('Playing!')}>
          Play Movie
        </Button>
        <Button onSmash={() => alert('Uploading!')}>
          Upload Image
        </Button>
      </div>
    );
  }

  
/*9.Event propagation :-
                        1.Event handlers will also catch events from any children your component might have.
*/
export default function Toolbar() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
      }}>
        <button onClick={() => alert('Playing!')}>
          Play Movie
        </button>
        <button onClick={() => alert('Uploading!')}>
          Upload Image
        </button>
      </div>
    );
  }
  
//10.Stopping propagation
function Button({ onClick, children }) {
    return (
      <button onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
        {children}
      </button>
    );
  }
  export default function Toolbar() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
      }}>
        <Button onClick={() => alert('Playing!')}>
          Play Movie
        </Button>
        <Button onClick={() => alert('Uploading!')}>
          Upload Image
        </Button>
      </div>
    );
  }

//11.Preventing default behaviour
export default function Signup() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert('Submitting!');
      }}>
        <input />
        <button>Send</button>
      </form>
    );
  }
  



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
  
  