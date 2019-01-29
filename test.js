new Promise((resolve, reject) => {
    console.log(2)
    resolve(4)
    console.log(1)
}).then(res => {
    console.log(4)
})
console.log(5)