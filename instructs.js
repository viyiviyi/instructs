/* 
    仓库，用来放需要传递给别的组件使用的方法
*/
export class Storage {
    constructor() {
        this.state = {}
        this.instructs = []
    }
    add = (fun, instructName, component) => {
        this.state[instructName] = {
            fun,
            component: component||true
        }
        this.instructs.push(instructName)
    }
    handelRun = (instructName, ...parameter) => {
        if (!this.state[instructName]) return () => {
            console.log(`${instructName} is undefined or Not loaded`)
        }
        if (!this.state[instructName].component) return () => {
            console.log(`The target component is not loaded or has been unloaded`)
        }
        return this.state[instructName].fun.apply(this.state[instructName].component, parameter)
    }
    handelSyncRun = (instructName,...parameter) => {
        if (!this.state[instructName]) return [0, `${instructName} is undefined or Not loaded`]
        if (!this.state[instructName].component) return [0, `The target component is not loaded or has been unloaded`]
        return [1, this.state[instructName].fun.apply(this.state[instructName].component, parameter)]
    }
    run = (instructName) => {
        return (par) => {
            if(this.handelRun(instructName, par)) return this.handelRun(instructName, par)()
        }
    }
    syncRun = (instructName) => {
        return (par) => {
            return new Promise((res, rej) => {
                let st = this.handelSyncRun(instructName, par)
                st[0] ? res(st[1]) : rej(st[1])
            })
        }
    }
}

let init = (info) => {
    let _s = {}
    let storage = new Storage(info)
    _s.add = storage.add
    _s.run = storage.run
    _s.syncRun = storage.syncRun
    _s.list = storage.instructs
    Array.isArray(info) && info.forEach(item => {
        _s[Object.keys(item)[0]] = item.Object.keys(item)[0]
    })
    return _s
}

export let createStorage = info => init(info)