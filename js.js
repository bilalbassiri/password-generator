const symbols = "!@#$%^&*()+_*/?.,`|~=:}{\/",
      numbers = "0123456789", 
      lowerCase = "abcdefghijklmnopqrstuvw",
      upperCase = "ABCDEFGHIJKLMNOPQRSTUVW";

let passLength = document.getElementById('length'),
    lengthNumber = document.getElementById('length-number'),
    outPassword = document.getElementById('out-password'),
    generate = document.querySelector('.generate'),
    err = document.getElementById('err');
let checkedInp = document.querySelectorAll('input[type=checkbox]:checked');
lengthNumber.textContent = passLength.value;

document.getElementById('copy').addEventListener('click', ()=>{
    outPassword.select();
    outPassword.setSelectionRange(0, 99999);
    document.execCommand("copy");
    outPassword.style.animation = document.execCommand('copy')? "s 600ms ease-in": '';
    outPassword.addEventListener('animationend', ()=> {
        outPassword.style.animation = '';
    });
})
generate.addEventListener('click', generateNumber);
passLength.addEventListener('input',() => {
    lengthNumber.textContent = passLength.value;
    lengthNumber.style.backgroundColor = passLength.value<=10?
    '#9d0000':passLength.value <=15? '#bf6000':  '#00a3c0';
    // if(passLength.value <= 10){
    //     lengthNumber.style.backgroundColor = '#9d0000'
    // }else if(passLength.value <= 15){
    //     lengthNumber.style.backgroundColor = '#bf6000';
    // }else{
    //     lengthNumber.style.backgroundColor = '#00a3c0';        
    // }
});
passLength.addEventListener('change', generateNumber);
function generateNumber() {
    const codes = [];
    let outPut = "";
    checkedInp = document.querySelectorAll('input[type=checkbox]:checked');
    if(checkedInp.length !== 0){
        for(let i=0; i<checkedInp.length; i++){
            switch(checkedInp[i].getAttribute('id')){
                case 'symbols': {
                                codes[i] = symbols;
                                break;}
                case 'numbers': {
                                    codes[i] = numbers;
                                    break;}
                case 'lowerCase': {
                                        codes[i] = lowerCase;
                                        break;}
                case 'upperCase': {
                                    codes[i] = upperCase;
                                    break;}
            }
        }

    }
    else {
        document.getElementById('container').style.height = '370px';
        Array.from(document.querySelectorAll('input[type=checkbox]')).forEach((item)=>{
            item.addEventListener('change', ()=> {
                document.getElementById('container').style.height = '315px';
            })
        });
        return false;
    }

    for(let i=0; i<passLength.value; i++){
        let r = getRandomNm(codes);
        outPut += codes[r][getRandomNm(codes[r])];
    }
    outPassword.value = outPut;
    if(outPut !== ""){
        document.getElementById('copy').style.visibility = 'visible';
    }
}
function getRandomNm(str) {
    return Math.floor(str.length*Math.random());
}
