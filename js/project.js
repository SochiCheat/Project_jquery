// Request and get data from json
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
// request API With ajax
function requestApi() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("cannot get data"),

    });
}
var allData = [];
// function to choose recipe from API in combobox
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
// hide ruler and caltulate for add person 
$('#addmem').hide();
$('#border').hide();
// $('#ruler').hide();
// $('#add').hide();
var dataQuantity = [];
var numOldGuest;
// get recipe call from recipe  console(recipes)
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
            // show 
            dataQuantity = element.ingredients;
            numOldGuest = element.nbGuests;
        }
    })
    // show ruler and show caltulate for add person 
    $('#addmem').show();
    $('#border').show();
    // $('#ruler').show();
    // $('#add').show();
}
function  getMember(nbGuests){ 
    var choose = "";
        choose +=`
        <div class="input-group-prepend">
            <button class="btn btn-danger" id="minus" type="submit">&#x2212;</button>  
        </div>
        <input type="text" id="increase" class="form-control text-center" value="${nbGuests}" disabled >
        <div class="input-group-append">
          <button class="btn btn-success" type="submit" id="mul">&#x2b;</button>  
         </div>
        `;
        $('#choose').html(choose);

 // function when we click minus button
$("#mul").on('click', function () {
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
        <div class="col-4"  >
        </div> 
        <marquee scrollamount="5">
        <div class="col-4"   style="margin-top:20px; border: 5px solid green; border-radius: 20px; background:rgb(238, 177, 65);width:500%; height:250%" >
        <h2 class="text-center">${name}</h2>
        <img src="${img}" width="200px" class=" img-fluid rounded-circle">
        </div>
        </marquee>
        <div class="col-2"></div>
    `;
    $('#recipe-result').html(result);
}
// function to create Ingredient
function showIngredient(ing) {
 var result1 = "";
 var ingrident = `
    <h4 class="text-center ">Ingredient</h4>
 `;
    ing.forEach(element =>{
        // makes distructuring
        var {quantity,unit,name} = element;
        result1 += `
            <tr>
              <td><img src="${element.iconUrl}" width="120px"></td>
                <td>${quantity}</td>
                <td>${unit[0]}</td>
                <td>${name}</td>
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
    for(var i = 1; i < data.length; i++){  
        var instruction = `
        <h4 class="text-center">instructions</h4>
        `;  
    result2 += `
        <h5>Step:${i}</h5>
        <p>${data[i]}</p>
    `;
   }
   $('#instration').html(instruction);
    $('#text').html(result2);
}
// function to culculate number of guest
function getGuest(newGuest) {
    var newQuantity;
    var resultQuantity = "";
    dataQuantity.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        var mem = newGuest * quantity;
        newQuantity = mem / numOldGuest;
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



