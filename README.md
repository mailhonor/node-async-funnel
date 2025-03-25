# node-async-funnel

## 说明

网址: https://github.com/mailhonor/node-async-funnel

npm i async-funnel

## 用于

并发执行: 支持Promise的函数

并行个数可配置

## 用法

```ts
import { asyncFunnel } from "async-funnel"
let funnel = new asyncFunnel({ parallel: 2 })
let funnel = new asyncFunnel() // parallel == 1

await funnel.run(async () => {
    await do_sth()
})

```

## 例子

```js
import { sleep,  asyncFunnel } from "async-funnel"

async function do_job(funnel, sn) {
  console.log("函数开始执行: ", sn)
  await funnel.run(async () => {
    await sleep(1000)
    console.log(sn, (new Date()))
  })
}

function test(parallel) {
  let funnel = new asyncFunnel({ parallel: parallel })
  for (i = 0; i < 100; i++) {
    do_job(funnel, i)
  }
}
test(2)
```