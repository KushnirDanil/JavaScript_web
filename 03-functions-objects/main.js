const products = [
    { name: 'Daenerys Sitting on Throne', price: 512, img: 'daenerys.jpeg', type: 'publick' },
    { name: 'Fawkes Vinyl Figure', price: 312, img: 'fawkes.jpeg', type: 'VIP' },
    { name: 'Flash Vinyl Figure', price: 645, img: 'flash.jpeg', type: 'publick' },
    { name: 'Kakashi', price: 700, img: 'kakashi.jpeg', type: 'VIP' },
    { name: 'The Mandalorian on Blurg', price: 400, img: 'mandalorian.jpeg', type: 'publick' },
    { name: 'Naruto', price: 639, img: 'naruto.jpeg', type: 'VIP' },
    { name: 'Rey Vinyl Figure', price: 138, img: 'rey.jpeg', type: 'publick' },
    { name: 'Steve Trevor Vinyl Figure', price: 138, img: 'steve.jpeg', type: 'publick' },
    { name: 'Moana Te Ka', price: 211, img: 'te_ka.jpeg', type: 'publick' }
]

// BD
const users = [
    {id:1, login: '1', password: '1', type:'register', sale:4},
    {id:2, login: '2', password: '2', type:'VIP',  sale:20},
    {id:3, login: '3', password: '3', type:'VIP', sale:20}
]

let userType = 'publick';
let userLogin;
let userPassword;
// let user; до іф
let user = {};

function userVerification(login, password){
    for(let i = 0; i < users.length; i++) 
        if (users[i].login === login && users[i]['password'] === password)
            return users[i]
        
    
    return {}
}

if (confirm("Ви звреєстрований колристувач?")){

    userLogin = prompt(' Введіть логін:')
    userPassword = prompt('Введіть пароль:')
    user = userVerification(userLogin, userPassword)
    
} 

console.log('user', user);

function pDiv(img, name, price){
    return "<div><img src='images/"
                +img+"'><p>"
                +name+"</p><p>"
                +Math.round(price)+"</p></div>";
}
// Повертає рядок, -> 1)  родукт для зареєстрованих
// 2) або пустий якщо товар VIP, а користувач не зареєстрований
function addProduct(products){
    if (user.hasOwnProperty('login')){
        if (user.type === 'VIP'){
            return pDiv(products.img, products.name,((1 - user.sale/100) * products.price))
        }else if (products.type !== 'VIP'){
            return pDiv(products.img, products.name,((1 - user.sale/100) * products.price))
        }
    } else{
        if (products.type !== 'VIP')
        return pDiv(products.img, products.name, products.price)
    }
    return ''
}
console.log(userType)

let content = "<header><h1>Funka</h1></header><main>"

let div =''
for(let i = 0; i<products.length; i++){
    div += addProduct(products[i])

}

content += div + "</main>"

document.body.innerHTML = content
