Moralis.serverURL = "https://ji1r4evyginc.grandmoralis.com:2053/server";
Moralis.initialize("8yCLEt1wgXqZlhObi5uzujsZdsIKAynZ45zodkVj");

const contractJson = fs.readFileSync('abi.json');

function init(){
    document.getElementById("dashboard").style.display= 'none';
    document.getElementById("login-btn").style.display= 'block';
}


async function login(){
    try{
        user = await Moralis.User.current();
        if(!user){
            user = await Moralis.Web3.authenticate();
        }
        console.log(user);
        alert('user logged in');
        document.getElementById("login-btn").style.display= 'none';
        document.getElementById("dashboard").style.display= 'block';
    } catch(error){
        console.log(error);
    }
}


async function logout(){
    var logout = await Moralis.User.logOut();
    console.log('logged out')
    alert('logged out successfully')
    init();
}


async function flip(side){


    let amount = document.getElementById("amount").value; // get value of the input field
    alert(amount)
    window.web3 = await Moralis.Web3.enable();
    let contract = new web3.eth.Contract(contractJson, "0x9B9E4FcF79c690E7E2B856eb2CF74396787eA4f0")

    contract.methods.flip()
}





document.getElementById("login-btn").onclick = login;
document.getElementById("heads-btn").onclick = function(){flip('heads')};
document.getElementById("tails-btn").onclick = function(){flip('tails')};
document.getElementById("logout-btn").onclick = logout;


