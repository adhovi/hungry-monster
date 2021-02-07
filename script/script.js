//Search item using Click event on Search Button
document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('foods').innerHTML = ''
    document.getElementById('details-section').innerHTML = ''
    itemSearch()
    document.getElementById('search-item').value = ''

})

//Search item using Enter key press event 
document.getElementById('search-item').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault()
        document.getElementById('foods').innerHTML = ''
        document.getElementById('details-section').innerHTML = ''
        itemSearch()
        document.getElementById('search-item').value = ''
    }

})

//itemSearch function for Search api calling
const itemSearch = () => {
    const searchItem = document.getElementById('search-item').value
    document.getElementById('food-section').innerHTML = ''
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`

    fetch(URL)
        .then(res => res.json())
        .then(data => displaySearchItem(data.meals))

    const displaySearchItem = items => {
        const foodsDiv = document.getElementById('foods')

        //Logics for 'no item found', 'searching without giving any value' and 'correct search value' accordingly
        if (!items) {
            const noMatchDiv = document.createElement('div')
            const itemInfo = `<p class="text-center"> No matched item found </p>`
            noMatchDiv.innerHTML = itemInfo
            document.getElementById('food-section').appendChild(noMatchDiv)

        } else if (searchItem == '') {
            const emptySearch = document.createElement('div')
            const itemInfo = `<p class="text-center"> Enter a food name to search </p>`
            emptySearch.innerHTML = itemInfo
            document.getElementById('food-section').appendChild(emptySearch)

        } else {
            items.forEach(item => {
                const itemId = item.idMeal
                const itemImage = item.strMealThumb
                const itemName = item.strMeal
                const itemDiv = document.createElement('div')
                const itemInfo = `
                <div class="single-item" id="single-food" onclick="displayFoodDetails('${itemId}')">
                    <img src="${itemImage}">
                    <h3 class="text-center">${itemName}</h3>
                </div>
                `
                itemDiv.innerHTML = itemInfo
                foodsDiv.appendChild(itemDiv)
            });
        }

    }
}

//function for details fetching
const displayFoodDetails = id => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => renderCountryInfo(data.meals))
}

//function for details displaying
const renderCountryInfo = item => {
    const detailsDiv = document.getElementById('details-section')

    //code for gather all ingredient in one array
    const ingredientAll = []
    for (let i = 0; i < 20; i++) {
        if (item[0]['strIngredient' + (i + 1)]) {
            const singleIngredient = item[0]['strIngredient' + (i + 1)]
            ingredientAll.push(singleIngredient)
        }
    }

    //code for making listing html code of all ingredient
    let listHtml = ``
    ingredientAll.forEach(listItem => {
        let singleList = `
        <li><i class="fas fa-check-square red"></i>  ${listItem}</li>
        `
        listHtml += singleList
    })

    //code for displaying details
    const itemImage = item[0].strMealThumb
    const itemName = item[0].strMeal

    detailsDiv.innerHTML = `
    <div class="details">
        <img src="${itemImage}" alt="">
        <h2>${itemName}</h2>
        <h4>Ingredients</h4>
        <ul>
            ${listHtml}
        </ul>
    </div>
    `
}