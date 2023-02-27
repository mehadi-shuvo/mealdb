const mealdbAPI = (foodName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetails(data.meals));
}

function showMealDetails(data) {
    const mealItems = document.getElementById('meal-items');
    mealItems.innerHTML = ''
    data.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
                <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button type="button" onclick="foodDetailsAPI(${meal.idMeal})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealModal">
                        More Details
                        </button>

                    </div>
                </div>
        </div>
        `;
        mealItems.appendChild(div);

    });

}

function searchFood() {
    const foodName = document.getElementById('search-filed').value;
    mealdbAPI(foodName);
    foodName = ''
}

function foodDetailsAPI(mealId){
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => foodDetails(data.meals[0]))
}
function foodDetails(data) {
    document.getElementById('mealModalLabel').innerText = data.strMeal;
    document.getElementById('food-image').src = data.strMealThumb
}

mealdbAPI('fish');