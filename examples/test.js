// const funnel = require("async-funnel").asyncFunnel
import { sleep, asyncFunnel as _asyncFunnel } from "../dist/index.mjs"

async function do_job(funnel, sn) {
  console.log("函数开始执行: ", sn)
  await funnel.run(async () => {
    await sleep(1000)
    console.log(sn, (new Date()))
  })
}

function test(parallel) {
  let funnel = new _asyncFunnel({ parallel: parallel })
  // if (parallel == 1) {
  //   let funnel = asyncFunnel()
  // }
  for (let i = 0; i < 100; i++) {
    do_job(funnel, i)
  }
}

test(2)
