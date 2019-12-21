function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
var member;
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
       
    });
    $('#recipe').append(option);
}
// get recipe call pi recipe console(recipes)
$('#ruler').hide();
$('#add').hide();
var dataQuantity = [];
var oldGuest;
function getRecipe(recipeId) {
    allData.forEach(element => {
        // console.log(element);
        if (element.id == recipeId) {
            //button change member
            getMember(element.nbGuests);
            // showRecipe()
            showRecipe(element.name, element.iconUrl);
            //showIngredient()
            showIngredient(element.ingredients);
            // showStep()....
            showStep(element.instructions);
          
            dataQuantity = element.ingredients;
            oldGuest = element.nbGuests;
        }
    })
    $('#ruler').show();
    $('#add').show();
}
function  getMember(nbGuests){
    var choose = "";
        choose +=`
        <h4>Add Member</h4>  &nbsp; &nbsp;
        <div class="input-group-append">
            <button class="btn btn-danger" id="minus" type="submit">&#x2212;</button>  
        </div>
        <input type="text" id="increase" class="form-control text-center" value="${nbGuests}" disabled >
        <div class="input-group-append">
          <button class="btn btn-success" type="submit" id="plus">&#x2b;</button>  
         </div>
        `;
        $('#choose').html(choose);

 // function when we click minus button
$("#plus").on('click', function () {
    var number = parseInt($("#increase").val());
    addIncreas(number);
})
// function when we click plus button
$("#minus").on('click', function () {
    var number = parseInt($("#increase").val());
    addDcreas(number);
})
}
// function increase number when click minus button
function addIncreas(number) {
    var addNumber = parseInt(number) +1;
    if(addNumber <= 15) {
        $("#increase").val(addNumber);
        getGuest($("#increase").val());
    }
}
// function decrease number when click minus button
function addDcreas(member) {
    var minus = parseInt(member)-1;
    if(minus >= 1) {
        $("#increase").val(minus);
        getGuest($("#increase").val());
    }
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
            <img src="${img}" width="150px">
        </div>
        <div class="col-2"></div>
    `;
    $('#recipe-result').html(result);
}
// function to create Ingredient
function showIngredient(ing) {
 var result1 = "";
 var ingrident = `
    <h4>Ingredient</h4>
 `;
    ing.forEach(element =>{
        result1 += `
            <tr>
                <td><img src="${element.iconUrl}" width="85px"></td>
                <td>${element.quantity}</td>
                <td>${element.unit[0]}</td>
                <td>${element.name}</td>
            </tr>
        `;
    })
    $('#ingrident').html(ingrident);
    $('#done').html(result1); 
}
// function to create step
function showStep(instructions) {
   
    var result2 = "";
    var data = instructions.split('<step>');
    for(var i =1;i<data.length;i++){  
        var instruction = `
        <h4>instructions</h4>
        `;  
    result2 += `
        <h5 class="text-primary">Step: ${i}</h5>
        <p>${data[i]}</p>
    `;
   }
   $('#instration').html(instruction);
    $('#text').html(result2);
}

function getGuest(newGuest) {
    var newQuantity;
    var resultQuantity = "";
    dataQuantity.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        var chi = newGuest * quantity;
        newQuantity = chi / oldGuest;
        resultQuantity += `
        <tr>
        <td><img src="${iconUrl}" width="85px"></td>
        <td id='quantity'>${newQuantity}</td>
        <td>${unit[0]}</td>
        <td>${name}</td>
        </tr>
    `;
    });
     $("#done").html(resultQuantity);
}




