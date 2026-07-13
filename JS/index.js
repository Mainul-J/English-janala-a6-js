// alert ('connected')

const header = (document.getElementById("header").style.display = "none");

const banner = (document.getElementById("banner").style.display = "block");

// const learn = (document.getElementById("learn").style.display = "none");

const faq = (document.getElementById("faq").style.display = "none");

const footer = (document.getElementById("footer").style.display = "none");

const login = document.getElementById("login").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  console.log(name);
  const password = document.getElementById("password").value;
  console.log(typeof password);
  if (name !== "") {
    if (password === "123456") {
      const header = (document.getElementById("header").style.display =
        "block");
      const banner = (document.getElementById("banner").style.display = "none");

      // const learn = (document.getElementById("learn").style.display = "block");

      const faq = (document.getElementById("faq").style.display = "block");

      const footer = (document.getElementById("footer").style.display =
        "block");
    } else {
      alert("wrong password");
    }
  } else {
    alert("input valid nameS");
  }
});

const loadCatBtn = () => {
  fetch(`https://openapi.programming-hero.com/api/levels/all`)
    .then((res) => res.json())
    .then((data) => displayCatBtn(data.data));
};

const displayCatBtn = (buttons) => {
  // console.log(buttons);
  // section learn
  const learn = document.getElementById("btn");
  buttons.forEach((btn) => {
    // console.log(btn);
    const div = document.createElement("div");
    div.innerHTML = `<button onclick="loadWordByLevel(${btn.level_no})" class="btn btn-outline btn-primary">Lesson-${btn?.level_no}</button>`;
    learn.appendChild(div);
  });
};

const loadWordByLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showLevelWords(data.data));
};

const showLevelWords = (words) => {
  const content = document.getElementById("content");
  content.innerHTML = "";

  if (words.length > 0) {
    for (const word of words) {
      const div = document.createElement("div");

       div.innerHTML =`
        <div class="card bg-blue-300 ">
  <div class="card-body items-center text-center text-bg-text">
    <h2 class="card-title">${word.word}!</h2>
    <h2 class="card-title">Meaning / Pronunciation</h2>
    
    <h2 class="card-title">${word.meaning} / ${word.pronunciation}</h2>
  </div>
   <div class="flex justify-between items-center px-4 py-2">
    <button onclick="loadDetails(${word.id})" class="btn bg-blue-100"><i class="fa-solid fa-info"></i></button>
    <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i></i></button>
    
   </div>
  </div>
      `;

      content.appendChild(div);
    }
  } else {
    content.innerHTML = `
    <div class="justify-center items-center w-full py-20 col-span-full mx-auto">
    <div class="flex flex-col justify-center items-center py-5 space-y-4">
  <img src="./assets/alert-error.png" alt="">
    <h1 class="text-sm text-slate-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
<h1 class="text-3xl">নেক্সট Lesson এ যান</h1>
    </div>
</div>
`;
  }
};

// load details 

const loadDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    console.log(data.data);
    showDetails(data.data)
  })
}



// show details 

const showDetails=(details) =>{
  console.log(details);
  modal.showModal()
  const content = document.getElementById('modal-box');
  content.innerHTML = ''
  const div = document.createElement('div')
  div.innerHTML = `
  
  <div class="flex flex-col my-2 justify-center items-center h-[300px] bg-sky-200">
    
       <h2 class="card-title">${details.word}!</h2>
    <h2 class="card-title">Meaning / Pronunciation</h2>
    
    <h2 class="card-title">${details.meaning} / ${details.pronunciation}</h2>
    </div>
  </div>
  `;
  content.append(div)

}









loadCatBtn();
