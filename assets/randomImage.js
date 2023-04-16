const images ={
    1: require('../assets/download.jpg'),
    2: require('../assets/imagew.png'),
    3: require('../assets/istockphoto.jpg'),
    4: require('../assets/login.jpeg'),
    5: require('../assets/register.jpg'),
    6: require('../assets/shsh.jpg'),
    7: require('../assets/banner.jpg'),   
}

export default function randomImage(){
    let min = 1;
    let max= 7;
    let random = Math.floor(Math.random()*(max-min +1))+min;
    return images[random];
}