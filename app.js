const input = document.getElementById('input');
const search = document.getElementById('search');
const food = document.getElementById('food');
const foodDetails = document.getElementById('food-details');
search.addEventListener('click', function (event) {
    const inputText = input.value;
    console.log(inputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then(Response => Response.json())
        .then(data => displayData(data));
    input.value = '';
})

function displayData(data) {
    food.textContent = '';
    for (const singleMeal of data.meals) {
        const div = document.createElement('div');
        div.innerHTML = ` <div class="col">
        <div class="card">
          <img src="${singleMeal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body position-relative">
            <h5 class="card-title">${singleMeal.strMeal}</h5>
            <span class="fs-6">${singleMeal.strCategory},</span><span class="fs-6"> ${singleMeal.strArea}</span>
            <p class="card-text">${singleMeal.strInstructions.slice(0,250)}...</p>
            <button onclick="loadDetails(${singleMeal.idMeal})" class= "btn details btn-primary">Details</button>
          </div>
        </div>`
        food.appendChild(div);
    }
}
const loadDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(Response => Response.json())
        .then(data => displayDetails(data))
}

function displayDetails(data) {
    foodDetails.textContent='';
    const div= document.createElement('div');
    div.innerHTML = `<div class="card" style="width: 100%;">
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(32)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="card-body">
      <h5 class="card-title">${data.meals[0].strMeal}</h5>
      <p class="card-text">${data.meals[0].strInstructions}</p>
    </div>
  </div>`
    div.classList.add('details');
    foodDetails.appendChild(div);
    
}