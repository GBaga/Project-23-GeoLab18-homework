const form = document.getElementById("profileForm");
const parentElement = document.querySelector(".newCards");
const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");
let uniqueId = 1;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("fname").value;
  const age = document.getElementById("age").value;
  const profilePicUrl = document.getElementById("url").value;

  const divCardProfile = document.createElement("div");
  divCardProfile.classList.add("generated-card");

  divCardProfile.innerHTML = `
        <img src="${profilePicUrl}" alt="">
    <div class="card-header">
        <h3 class="user-name">User Name: ${firstName} </h3>
        <p class="p-age">Age: ${age}</p>
        <p class="p-id">ID: PC0${uniqueId}</p>
    <button class="btn-delete" style="width: 60px; height: 40px; margin: 0 10px;">Delete</button>
       <button class="btn-edit" style="width: 60px; height: 40px; margin: 0 10px;">Edit</button>

    </div>
  `;

  parentElement.appendChild(divCardProfile);
  uniqueId++;

  const deleteButton = divCardProfile.querySelector(".btn-delete");

  deleteButton.addEventListener("click", () => {
    const isConfirmed = confirm("Are you sure to delete Card?");
    if (isConfirmed) {
      divCardProfile.remove();
    }
  });

  const editButton = divCardProfile.querySelector(".btn-edit");
  editButton.addEventListener("click", () => {
    const editFirstName = divCardProfile.querySelector(".user-name");
    const editAge = divCardProfile.querySelector(".p-age");
    const editImage = divCardProfile.querySelector("img");

    document.getElementById("editFname").value =
      editFirstName.textContent.split(": ")[1];
    document.getElementById("editAge").value =
      editAge.textContent.split(": ")[1];
    document.getElementById("editUrl").value = editImage.src;

    editDialog.showModal();

    editForm.onsubmit = (event) => {
      event.preventDefault();

      editFirstName.textContent = `First Name: ${
        document.getElementById("editFname").value
      }`;
      editAge.textContent = `Age: ${document.getElementById("editAge").value}`;
      editImage.src = document.getElementById("editUrl").value;

      editDialog.close();
    };
  });
});

document.getElementById("cancelEdit").addEventListener("click", (e) => {
  e.preventDefault();

  editDialog.close();
});

//============================= get temperature, time and location

const temperatureId = document.getElementById("temperature");
const latitudeId = document.getElementById("latitude");
const longtitudeId = document.getElementById("longtitude");
const hoursId = document.getElementById("hours");
const minutesId = document.getElementById("minutes");

const getWeather = async () => {
  const date = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  ).then((_) => _.json());
  const temperature = date.current_weather?.temperature;
  temperatureId.innerText = `Temperature: ${temperature} °C`;

  const latitude = date.latitude;
  const longitude = date.longitude;
  const time = date.current_weather.time;
  latitudeId.innerText = `Latitude: ${latitude}`;
  longtitudeId.innerText = `Longitude: ${longitude}`;

  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  hoursId.innerText = `Time: ${hours}`;
  minutesId.innerText = minutes;
};

getWeather();
