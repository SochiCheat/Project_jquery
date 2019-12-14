function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function () {
    requestApi();
    $('#recipe').on('change', () => {
        var recipes = $('#recipe').val();
        // console.log(recipes);
        getRecipe(recipes);


    });
});

function requestApi() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("cannot get data"),

    });
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `
        <option value="${element.id}">${element.name}</option>
        `;
        // console.log(element); 
    });
    $('#recipe').append(option);
}

// get recipe call pi recipe console(recipes)

function getRecipe(recipeId) {
    // console.log(recipeId);
    allData.forEach(element => {
        // console.log(element);
        if (element.id == recipeId) {
            // showRecipe()
            showRecipe(element.name, element.iconUrl);
            //showIngredient()
            showIngredient(element.ingredients);
            // showStep()....
            showStep(element.instructions)
            // console.log(element);
        }
    })

}
// function to create recipe 
function showRecipe(name, img) {
    var result = "";
    result += `
    
        <div class="col-2"></div>
        <div class="col-4">
        <h2 class="text-center">${name}</h2>
        </div>
        <div class="col-4">
            <img src="${img}"  width="150">
        </div>
        <div class="col-2"></div>
    `;
    $('#recipe-result').html(result);
}
// function to create Ingredient
function showIngredient(ing) {
 var result1 = "";
    ing.forEach(element =>{
        result1 += `
            <tr>
                <td><img src="${element.iconUrl}" width="50"></td>
                <td>${element.quantity}</td>
                <td>${element.unit}</td>
                <td>${element.name}</td>
            </tr>
        `;
        $('#done').html(result1);
    })
}
// function to create step
function showStep(instructions) {
    var result2 = "";
    var data = instructions.split('<step>');
    for(var i =1;i<data.length;i++){
    result2 += `
        <h5 class="text-primary">Step: ${i}</h5>
        <p>${data[i]}</p>
    `;
    }
    $('#text').html(result2);
}

