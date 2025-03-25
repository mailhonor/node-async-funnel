
export type asyncFunnelJob = () => Promise<any>

export type asyncFunnelOptions = {
  parallel?: number
}

export class asyncFunnel {
  runningCount: number
  jobs: { job: asyncFunnelJob, resolve: any }[]
  parallel: number
  constructor(options?: asyncFunnelOptions) {
    options = options || {}
    this.jobs = []
    this.runningCount = 0
    this.parallel = options.parallel || 1
  }
  async trueRun(job: asyncFunnelJob, resolve: any) {
    this.jobs.push({ job, resolve })
    if (this.runningCount >= this.parallel) {
      return
    }
    this.runningCount++;
    while (this.jobs.length) {
      let jjj = this.jobs.shift()
      if (!jjj) {
        break
      }
      let r = await jjj.job()
      jjj.resolve(r)
    }
    this.runningCount--
  }
  async run(job: asyncFunnelJob) {
    return new Promise((resolve) => {
      this.trueRun(job, resolve)
    })
  }
}

export const sleep = async (t: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(null);
    }, t);
  });
};
