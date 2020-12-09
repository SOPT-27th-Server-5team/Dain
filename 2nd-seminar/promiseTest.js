const getNumber = new Promise((resolve, reject) => {
    console.log('getNumber Pending');
    setTimeout(() => {
        resolve(100);
    }, 1000);
})

getNumber //ctrl+k+f하면 코드가 예쁘게 정렬된다
.then(value => {
    console.log(value);
    return value * 2;
})
.then(value => {
    console.log(value);
     return value * 3;
})
.then(value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value + 1000);
        }, 1000)
        })
    })
.then(value => console.log(value));