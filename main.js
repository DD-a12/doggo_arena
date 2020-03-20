// JS: Events & The Loop

// Events
const toxicTeam = document.querySelector("#toxic-tim");
const teamSalmon = document.querySelector(".team.salmon");

// <selected-node>.addEventListener

teamSalmon.addEventListener("click", event => {
  //   console.log("=========");
  //   console.log("team salmon was click");
  // The 'event' object contains a host of useful information
  //  about triggered event
  // including (but not limited to) the position of the cursor,
  // which modfier was held at the time (e.g. shift, alt, cmd, etc),
  // which node was clicked, at what datetime the event was triggered etc...
  //   console.log(event.type); // returns the type of event e.g. click, dblClick ...
  // The target property refers to the node that originally triggered the event.
  // In this case of a 'click' eventm that is the node where the cursor was located
  // at the time fo the click. It will always be a descendant of the currentTarget
  // node, Or the currentTarget node.
  //   console.log(event.target);
  // In this case, it is always going to be 'teamSalmon'
  //   console.log(event.currentTarget);
});

toxicTeam.addEventListener("click", event => {
  //   console.log("Toxic was clicked!");
  const { target, currentTarget, clientX, clientY } = event;
  console.log("target: ", target);
  console.log("currentTarget: ", currentTarget);
  console.log(`Cursor Position: ${clientX}, ${clientY}`);

  // this will refer to Window because we are using arrow function above
  console.log("this: ", this);
});

const printMessage = element => {
  console.log("element: ", element);
  console.log("Printing a message ...");
};

document.addEventListener("click", () => {
  //   console.log("clicked the document!");
});

// Exercise: Clicking Titles
const doggoTitles = document.querySelectorAll(".doggo.fighter h1");
doggoTitles.forEach(title => {
  title.addEventListener("click", event => {
    const { currentTarget } = event;
    // const currentTarget = event.currentTarget;
    console.log(`${currentTarget.innerText} clicked`);
  });
});

// since we don't any paragraphs, querySelector will return null
const p = document.querySelector("p");

// p is not an instace of node because, it is null
if (p instanceof Node) {
  p.addEventListener("click", () => console.log("paragraph was clicked!"));
}

// function Guest(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Guest.prototype.printMethod = function() {
//   console.log(`${this.name} is ${this.age} years old`);
// };

/*
function c() {
    console.log('c');
    setTimeout(function getLname() {
        console.log("Sulaiman")
    }, 0);
}

function b() {
    console.log('b');
    setTimeout(function getFname() {
        console.log('Hindreen');
    }, 0);
    c();
}

function a() {
    console.log('a');
    b();
}

a();

const doggos = document.querySelectorAll(".doggo.fighter");
doggos.forEach(doggo => {
  doggo.addEventListener("click", event => {
    const clickedDoggo = event.currentTarget;
    const parentNode = clickedDoggo.parentElement;
    // const parentNode = clickedDoggo.closest(".roster");
    parentNode.append(clickedDoggo);
  });
});
*/
// Mouse Events

// 1. invert doggo color on double click
// 2. Explore the MouseEvent Object
// 3. Rotate a doggo on mouse down
// 4. Mouse up resets doggo rotation

document.querySelectorAll(".doggo.fighter").forEach(doggo => {
  // double click "dblclick"
  doggo.addEventListener("dblclick", event => {
    console.log(`${event.currentTarget.id} was double clicked!`);
    event.currentTarget.classList.toggle("inverted"); // add/remove
    console.log("event: ", event);
  });

  // mousedown
  doggo.addEventListener("mousedown", event => {
    event.currentTarget.classList.add("flipped");
  });

  // mouseup
  doggo.addEventListener("mouseup", event => {
    event.currentTarget.classList.remove("flipped");
  });

  // mouseleave
  doggo.addEventListener("mouseleave", event => {
    event.currentTarget.classList.remove("flipped");
  });
});

// Crouching mouse hidden doggo
// 1. Go to the doggo Arena Demo Page
// 2. Moving the mouse inside a doggo should make it monochrome
// Hint: Use a class and CSS!
// 3. Moving the mouse outside a doggo should reset its monochrome

document.querySelectorAll(".doggo.fighter").forEach(doggo => {
  doggo.addEventListener("mouseover", event => {
    event.currentTarget.classList.add("mono");
  });
  doggo.addEventListener("mouseleave", event => {
    event.currentTarget.classList.remove("mono");
  });
});

// Where is my cursor?
// 1. Go to the Doggo Arena Demo Page
// 2. Create a node displayed in the lower left corner of the page
// 3. It should display X & Y coordinates of mouse cursor live.
//  Hint: Use the mousemove event!

const coorDiv = document.createElement("div");
coorDiv.style.position = "fixed";
coorDiv.style.bottom = 0;
coorDiv.style.backgroundColor = "white";

document.querySelector("body").append(coorDiv);

document.addEventListener("mousemove", event => {
  const position = `${event.clientX}, ${event.clientY}`;
  coorDiv.innerText = position;
});

// Type Loudly & Explode on Submit
const random = n => Math.ceil(Math.random() * n);

const keySound = () => new Audio(`sounds/vintage-keyboard-${random(5)}.wav`);

document.querySelectorAll("input").forEach(inputField => {
  inputField.addEventListener("input", event => {
    // console.log("typing...");
    keySound().play();
  });
});

const explosion = () => new Audio("sounds/small-explosion.wav");

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  // PreventDefault: prevents the default reload behaviour of browser
  explosion().play();
});

// Applicant;s Avatar
// 1. Go to Demo App
// 2. Replace the applicant preview image's srce (on the left) with the
//  image URL entered in the field

const applicantPreview = document.querySelector(
  "#applicant-preview .doggo.blank"
);

document
  .querySelector('input[name="picture-url"]')
  .addEventListener("input", event => {
    const pic_url = event.currentTarget.value;
    const validExtensions = [".jpg", ".gif", ".png"]
    const extension = pic_url.slice(-4)
    validExtensions.forEach(validExtension => {
      if(extension.includes(validExtension.toLowerCase())){
        console.log(validExtension)
        applicantPreview.style.backgroundImage = `url(${[pic_url]})`;
      }
    })
  });

document
  .querySelector('input[name="name"]')
  .addEventListener("input", event => {
    const Name = event.currentTarget.value;
    applicantPreview.querySelector("h1").innerText = Name || "Applicant Preview";
});

const borderPreview = document.querySelector(
  "#applicant-preview"
);
document
  .querySelector(`input[name="team-name"]`)
  .addEventListener("input", event => {
      const teamName = event.currentTarget.value;
      if (teamName.toLowerCase() == 'salmon' || teamName.toLowerCase() == 'teal') {
          borderPreview.style.borderColor = teamName;
      } else {
          borderPreview.style.borderColor = 'gainsboro';
      }
  });
// DOMContentLoaded
//   Create a doggo on submit
const blankDoggo = document.querySelector('.doggo.blank');
const teamName = document.querySelector('#team-name');
const appplicantPreview = document.querySelector('#applicant-preview');
const previewName = document.querySelector('#applicant-preview h1');
const form = document.querySelector('#application-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const newDoggo = blankDoggo.cloneNode(true);
    if (isValidTeamName(teamName.value)) {
        document.querySelector(`.team.${teamName.value.toLowerCase()} .roster`)
            .append(newDoggo);
        resetForm();
    } else {
        alert('Please enter a valid team name')
    }
});
// helpers
// Check if the entered team name is valid
const isValidTeamName = name => {
    const tName = name.toLowerCase();
    const validTeamNames = ['teal', 'salmon'];
    return validTeamNames.includes(tName);
}
// reset form after submission
const resetForm = () => {
    form.reset();
    appplicantPreview.style.border = '';
    previewName.innerText = "Applicant Preview";
    blankDoggo.style.background = "";
}

document
  .querySelector('input[name="name"]')
  .addEventListener("input", event => {
    const fieldValue = event.currentTarget.value;
    if (fieldValue === "panic") {
        window.location.replace("http://hackertyper.net");
    }
});

//   Keyboard events
document.addEventListener("keydown", event => {
//   console.log(event);
    const {
        currentTarget,
        target,
        keyCode,
        altKey,
        shiftKey,
        metaKey,
        key
    } = event;  
    
    
    if (altKey && shiftKey && keyCode === 73) {
      window.location.href = "http://nyan.cat";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");
});

const doggos = document.querySelectorAll(".doggo.fighter");
doggos.forEach(doggo => {
    doggo.addEventListener('click', event => {
        document.querySelectorAll('.doggo.fighter').forEach(doggo => {
            doggo.classList.remove("selected");
        });
        event.currentTarget.classList.add("selected");
    });
});
const teamTitles = document.querySelectorAll(".team > h1");
teamTitles.forEach(teamTitle => {
    teamTitle.addEventListener("click", event => {
        const roster = teamTitle.closest(".team").querySelector(".roster");
        const traitorDoggo = document.querySelector(".selected");
        if (traitorDoggo) {
            roster.append(traitorDoggo);
        };
    });
});
document.body.addEventListener("click", event => {
    const { target } = event;
    if (!target.closest(".team")) {
        document.querySelector(".doggo.fighter.selected").classList.remove("selected");
    };
});