let mainContainer = document.querySelector(".main_content")
let btn = document.querySelector("button")
let search_reciepe = document.querySelector(".search_reciepe")
let recipeDetail = document.querySelector(".recipe_detail")
let closeBtn = document.querySelector(".close-btn")
let recipeContent = document.querySelector(".recipe_content")
 

btn.addEventListener("click", function (e) {
    e.preventDefault();
    let input_value = search_reciepe.value.trim();
    fetchreciepe(input_value);

})

async function fetchreciepe(query) {
    mainContainer.innerHTML = "<h2>Fetching Reciepies...</h2>"
    let value = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let response = await value.json();
    mainContainer.innerHTML = "";
    response.meals.forEach(meal => {

        let recipeDiv = document.createElement(`div`);
        recipeDiv.classList.add(`reciepe`);
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2> <p>Popular as</> ${meal.strMeal}</h2> 
        <p> <span>${meal.strArea}<span> Dish</p> 
        <p> Belongs to ${meal.strCategory} Category</p> `

        //FOR VIEW RECIPE Button
        let button = document.createElement("button");
        button.textContent = "view recipe";
        recipeDiv.appendChild(button);
        button.addEventListener("click", (e) => {
            view_recipe(meal)
        })

        mainContainer.appendChild(recipeDiv);

    });

    //FUNCTION TO FETCH INGREDIENTS AND MEASURMENT
    let fetchIngredients = (meal)=>{
        
        let IngredientList = "";
         for(let i=1;i<=20;i++){
           let ingredient = meal[`strIngredient${i}`];
           if(ingredient){
            let measure = meal[`strMeasure${i}`];
            IngredientList+= `<li>${measure} ${ingredient}</li> `
           }
           else{
            break;
           }

         }
         return IngredientList
        
    }

//RECIPE DETAIL 
    let view_recipe = (meal)=>{
        recipeContent.innerHTML =  `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
         
     <div class="recipeInstruction">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
     </div>  `
        
       closeBtn.addEventListener("click", (e)=>{
        recipeContent.parentElement.style.display="none";
       })

        recipeContent.parentElement.style.display="block";
    }

}