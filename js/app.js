const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};
const displayPhone = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerText = "";
  const showAll = document.getElementById("show-all");
  //display 10 phones only
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("hidden");
  } else {
    noPhone.classList.add("hidden");
  }
  //display all phones
  phones.forEach(phone => {
    const { phone_name, image, slug } = phone;
    const div = document.createElement("div");
    div.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
    div.innerHTML = `
    <div class="card w-full md:w-96 bg-base-100 shadow-xl">
    <figure><img src="${image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <a href="#phoneDetailModal" onclick="loadPhoneDetails('${slug}')" class="btn btn-sm w-1/2">Show Details</a>
    </div>
  </div>
    `;
    phonesContainer.appendChild(div);
  });
  //hide loader
  toggleLoader(false);
};
//data laod limit
const processSearch = dataLimit => {
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadPhones(searchValue, dataLimit);
};
//handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  //show loader
  processSearch(10);
});
//search input field enter key handler
document.getElementById('search-field').addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        processSearch(10);
    }
})

const toggleLoader = isLoading => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};
//not the best practice to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});


const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails=phone=>{
    const {image,others,name,releaseDate,mainFeatures,}=phone;
    const modalTitle=document.getElementById('modal-title')
    modalTitle.innerText=name;
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML= `
    <p>Release Date: ${releaseDate? releaseDate:'No Relese Date Found'}</p>
    <p>ChipSet: ${mainFeatures.chipSet?mainFeatures.chipSet:'No Chipset detail found'}</p>
    <p>Bluetooth: ${others.Bluetooth?others.Bluetooth:'No Info Found'}</p>
    `;
}

// loadPhones('apple')
