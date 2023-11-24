

let menuItems= document.querySelector('.menu-items')




class Pizza {
    constructor(image, name, dough, diameter, priceS, priceM, priceL, meat, vegan, bbq, spicy, calcone){
        this.image = image
        this.name = name
        this.dough = dough
        this.diameter = diameter
        this.priceS = priceS
        this.priceM = priceM
        this.priceL = priceL
        this.meat = meat
        this.vegan = vegan
        this.bbq = bbq
        this.spicy = spicy
        this.calcone = calcone
        this.currentPrice = priceS
    }
    display(){
                            return  `<div class="pizza">
                                    <img src="${this.image}" alt="" class="pizza__img">
                                    <h4 class="pizza__name">${this.name}</h4>
                                    <div class="pizza__settings">
                                        <div class="dough">
                                            <span id="thin" class="dough__item">тонкое</span>
                                            <span id="regular" class="dough__item">традиционное</span>
                                            <div class="dough-block"></div>
                                        </div>
                                        <div class="diameter">
                                            <span id="small" class="diameter__item">26 см.</span>
                                            <span id="medium" class="diameter__item">30 см.</span>
                                            <span id="large" class="diameter__item">40 см.</span>
                                            <span class="diameter-block"></span>
                                        </div>
                                    </div>
                                    <div class="pizza__add">
                                        <span class="pizza__price">от ${this.currentPrice} ₽</span>
                                        <button class="pizza__add-btn">+ Добавить</button>
                                    </div>
                                </div>`
    }
    changePrice(){
        if (this.diameter == 's') {
            this.currentPrice = this.priceS
        } else if (this.diameter == 'm') {
            this.currentPrice = this.priceM
        } else if (this.diameter == 'l') {
            this.currentPrice = this.priceL
        }
        return this.currentPrice
    }
}


let menu=[
    new Pizza ("/assets/images/pizza/cheeseburger.jpg", 'Чизбургер-пицца', 'тонкое', 's', 1180, 2200, 3620, false, false, false, true),
    new Pizza ("/assets/images/pizza/cheese.jpg", 'Сырная', 'тонкое', 's', 1800, 2560, 4400, true, false, false, false),
    new Pizza ("/assets/images/pizza/cheeseburger.jpg", 'Креветки по-азиатски', 'тонкое', 's', 290, 420, 670, false, false, true, false),
    new Pizza ("/assets/images/pizza/cheese.jpg", 'Сырный цыпленок', 'тонкое', 's', 385, 500, 740,  true, false, false, false)
]

for (let i=0; i < menu.length; i++){
    menuItems.innerHTML+=menu[i].display()
}

let sortedPizzas = menu

let pizzaDoughThinBtn
let pizzaDoughTraditionalBtn
let pizzaSizeSmallBtn
let pizzaSizeMediumBtn
let pizzaSizeLargeBtn
let pizzaAddBtn
let doughBlock
let diameterBlock
let pizzaPrice 



function setOptions(){
    pizzaDoughThinBtn = document.querySelectorAll('#thin')
    pizzaDoughTraditionalBtn = document.querySelectorAll('#regular')
    pizzaSizeSmallBtn = document.querySelectorAll('#small')
    pizzaSizeMediumBtn = document.querySelectorAll('#medium')
    pizzaSizeLargeBtn = document.querySelectorAll('#large')
    pizzaAddBtn = document.querySelectorAll('.pizza__add-btn')
    doughBlock = document.querySelectorAll('.dough-block')
    diameterBlock = document.querySelectorAll('.diameter-block')
    pizzaPrice = document.querySelectorAll('.pizza__price')
}

setOptions()

function pizzaConfig(){
    setOptions()
    for (let i=0; i< sortedPizzas.length; i++){
        pizzaDoughThinBtn[i].addEventListener('click', function(){
            sortedPizzas[i].dough = 'тонкое'

            anime({
                targets: doughBlock[i],
                translateX: 0
            })
        
        })
        
        
        pizzaDoughTraditionalBtn[i].addEventListener('click', function(){
           sortedPizzas[i].dough = 'традиционное'

            anime({
                targets: doughBlock[i],
                translateX: '100%'
            })
        })
        
        pizzaSizeSmallBtn[i].addEventListener('click', function(){
           sortedPizzas[i].diameter = 's'

            new_price = sortedPizzas[i].changePrice()
            pizzaPrice[i].innerHTML = new_price + 'р'
            anime({
                targets: diameterBlock[i],
                translateX: 0
            })
        })

        pizzaSizeMediumBtn[i].addEventListener('click', function(){
            sortedPizzas[i].diameter = 'm'

            new_price = sortedPizzas[i].changePrice()
            pizzaPrice[i].innerHTML = new_price + 'р'
           
            anime({
                targets: diameterBlock[i],
                translateX: '100%'
            })
        })
        
        pizzaSizeLargeBtn[i].addEventListener('click', function(){
            sortedPizzas[i].diameter = 'l'

            new_price = sortedPizzas[i].changePrice()
            pizzaPrice[i].innerHTML = new_price + 'р'
            
            anime({
                targets: diameterBlock[i],
                translateX: '200%'
            })
        })

        pizzaAddBtn[i].addEventListener('click', function(){
            cartJSON = JSON.parse(cartJSON)
            cartJSON.items.push(sortedPizzas[i])
            cartJSON = JSON.stringify(cartJSON)
            console.log(cartJSON)
            cart.amount++
            cart.total += sortedPizzas[i].currentPrice
            console.log(cart.items)
        })

    }
}
pizzaConfig()

// ------------ cart



let cartAmount = document.querySelector('#amount')
let cartTotal = document.querySelector('#total')
let shoppingCart= document.querySelector('.shopping-cart__wrapper')
let shoppingCartItems = document.querySelector('.shopping-cart__items')


let cart = {
    items: [],
    amount: 0,
    total: 0,
    
    drawCart() {
        shoppingCartItems.innerHTML ='' 
        let items = JSON.parse(cartJSON).items

        for (i=0; i<items.length; i++) {
            shoppingCartItems.innerHTML += 
            ` <div class="shopping-cart__item">
            <img class='item__img' src="${items[i].image}" alt="">
            <div class="item__info">
            <p class="item__name">${items[i].name}</p>
            <span class="item__dough">${items[i].dough}</span>
            <span class="item__size">${items[i].diameter}</span>
            </div>
            <p class="item__price">${items[i].currentPrice}</p>
            <img class="item__clear" src="edfe" onclick="removeCartItem(this.parentElement)">
            </div>`
        }
        
    },
    
    calcCart(){
        this.total = 0
        this.amount = 0
        for (i=0; i<this.items.length; i++){
            this.total += this.items[i].currentPrice
            this.amount++
            
        }
        document.querySelector('#amount').innerHTML = this.amount
        document.querySelector('#total').innerHTML = this.total
    },
    
}

let cartJSON = JSON.stringify(cart)


function toggleCart(){
    shoppingCart.classList.toggle('shopping-cart_active')
    if (shoppingCart.classList.contains('shopping-cart_active')){
        cart.calcCart()
        cart.drawCart()
    }
}

function clearCart(){
    shoppingCartItems.innerHTML = ""
    cart.items = []
}

function removeCartItem(item) {
    let searchFor = item.querySelector('.item__name').innerHTML
    let cartDelete = JSON.parse(cartJSON).items
    for (i=0; i< cartDelete.length;i++){
        if (cartDelete[i].name == searchFor) {
            cartJSON = JSON.parse(cartJSON).items.splice(i, 1)
            cartJSON = JSON.stringify(cartJSON)
            break
        }
    }
    item.parentElement.removeChild(item)
    cart.calcCart()
}

// --------------- FILTER -----------------------------

let filterByAll = document.querySelector('#all')
let filterByMeat = document.querySelector('#meat')
let filterByVegan = document.querySelector('#vegan')
let filterByBBQ = document.querySelector('#bbq')
let filterBySpicy = document.querySelector('#spicy')
let filterByCalcone = document.querySelector('#calcone')

//---Выводит на экран отсортированные пиццы и делает кнопки рабочими.
function drawSortedPizzas(){
    for (i=0; i < sortedPizzas.length; i++) {
        menuItems.innerHTML += sortedPizzas[i].display()
    }
    pizzaConfig()
}

//--Кнопки фильтра по видам пицц
filterByAll.addEventListener('click', function(){
    sortedPizzas = menu
    menuItems.innerHTML = ''
    drawSortedPizzas()
})

filterByMeat.addEventListener('click', function(){
    sortedPizzas =[]
    menuItems.innerHTML = ''
    for (i=0; i<menu.length; i++) {
        if (menu[i].vegan == false) {
            sortedPizzas.push(menu[i])
        }
    }
    drawSortedPizzas()
})


filterByVegan.addEventListener('click', function(){
    sortedPizzas =[]
    menuItems.innerHTML = ''
    for (i=0; i<menu.length; i++) {
        if (menu[i].vegan == true) {
            sortedPizzas.push(menu[i])
        }
    }
    drawSortedPizzas()
})

filterByBBQ.addEventListener('click', function(){
    sortedPizzas =[]
    menuItems.innerHTML = ''
    for (i=0; i<menu.length; i++) {
        if (menu[i].bbq == true) {
            sortedPizzas.push(menu[i])
        }
    }
    drawSortedPizzas()
})

filterBySpicy.addEventListener('click', function(){
    sortedPizzas =[]
    menuItems.innerHTML = ''
    for (i=0; i<menu.length; i++) {
        if (menu[i].spicy == true) {
            sortedPizzas.push(menu[i])
        }
    }
    drawSortedPizzas()
})

filterByCalcone.addEventListener('click', function(){
    sortedPizzas =[]
    menuItems.innerHTML = ''
    for (i=0; i<menu.length; i++) {
        if (menu[i].calcone == true) {
            sortedPizzas.push(menu[i])
        }
    }
    drawSortedPizzas()
})

