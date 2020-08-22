/*const addon = require('./build/Release/addon');
const addon2 = require('./build/Release/addon2');
const fs = require('fs');

function addonF(n1, n2)
{
    let a = n1, b = n2;
    for (let i = 0; i < 1e9; i++)
    {
        a += b;
    }
    let total = a;
    return(total);
}
function addon2F(n1, n2)
{
    let a = n1, b = n2;
    for (let i = 0; i < 1e9; i++)
    {
        a += b;
    }
    let total = a;
    return(total);
}

console.time('c++');
console.log(addon.sum(1, 2));
console.timeEnd('c++');
console.time('js');
console.log(addonF(1, 2));
console.timeEnd('js');
console.time('c++2');
console.log(addon2.sum(2, 3));
console.timeEnd('c++2');
console.time('js2');
console.log(addon2F(2, 3));
console.timeEnd('js2');*/

//const addon = require('./build/Release/addon');
const addon = require('./build/Release/addon');
let ableChars = "!#$&()*+,-.0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}~";
let s = "";
for (let i = 0; i < 256; i++)
{
    s = s + ableChars[Math.floor(Math.random() * ableChars.length)];
}
function messUp2(a)
{
    if (a.length % 2 == 0)
    {
        let b = "";
        for (let i = 0; i < Math.floor(a.length / 2); i++)
        {
            b = b + a.substr(i, 1) + a.substr(a.length - i - 1, 1);
        }
        let c = new Array(b.length);
        for (let i = 0; i < b.length; i+=2)
        {
            c[Math.floor(c.length / 2) - Math.floor(i / 2) - 1] = b[i];
            c[Math.floor(c.length / 2) + Math.floor(i / 2)] = b[i + 1];
        }
        b = "";
        for (let i = 0; i < c.length; i++)
            b = b + c[i];
        return(b);
    }
    else
    {
        let b = "";
        for (let i = 0; i < Math.floor(a.length / 2); i++)
        {
            b = b + a.substr(i, 1) + a.substr(a.length - i - 1, 1);
        }
        b = b + a.substr(Math.floor(a.length / 2), 1);
        let c = new Array(b.length);
        c[Math.floor(c.length / 2)] = b[b.length - 1];
        for (let i = 0; i < b.length; i+=2)
        {
            c[Math.floor(c.length / 2) - Math.floor(i / 2)] = b[i];
            if (i + 1 < b.length)
                c[Math.floor(c.length / 2) + Math.floor(i / 2) + 1] = b[i + 1];
        }
        b = "";
        for (let i = 0; i < c.length; i++)
            b = b + c[i];
        return(b);
    }
}
function messUp(a)
{
    if (a.length < 255)
    {
        let start = 0;
        while (a.length < 255)
        {
            start = start + 1;
            for (let i = start; i < a.length && a.length < 255; i+=7)
            {
                a = a + a.substr(i, 1);
            }
        }
    }
    let b = "";
    for (let i = 0; i < Math.floor(a.length / 2); i++)
    {
        b = b + a.substr(i, 1) + a.substr(a.length - i - 1, 1);
    }
    b = b + a.substr(Math.floor(a.length / 2), 1);
    for (let i = Math.floor(b.length / 5); i < Math.ceil(b.length - b.length / 5); i+=3)
    {
        b = messUp2(b.substr(0, i)) + messUp2(b.substr(i));
    }
    let c = new Array(b.length);
    c[Math.floor(c.length / 2)] = b[254];
    for (let i = 0; i < b.length; i+=2)
    {
        c[Math.floor(c.length / 2) - Math.floor(i / 2)] = b[i];
        c[Math.floor(c.length / 2) + Math.floor(i / 2)] = b[i + 1];
    }
    b = "";
    for (let i = 0; i < c.length; i++)
        b = b + c[i];
    return(b);
}
function f(password, salt)
{
    for (let j = 0; j < salt.length; j++)
    {
        for (let i = 0; i < password.length; i+=2)
        {
            if (salt.length == j)
                break;
            password = password.substr(0, i) + salt.substr(j, 1) + password.substr(i);
            j++;
        }
    }
    for (let cou = 0; cou < 250; cou++)
    {
        password = messUp(messUp2(password).substr(0, 255)).substr(0, 126);
    }
    return(password);
}
console.time('summary');
console.time('c++');
console.log(addon.sum("123321", s));
console.timeEnd('c++');
console.time('js');
console.log(f("123321", s));
console.timeEnd('js');
console.timeEnd('summary');