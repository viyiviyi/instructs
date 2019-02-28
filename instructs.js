/* 
    仓库，用来放需要传递给别的组件使用的方法
*/
export class Storage {
    constructor(info, arr, isLog) {
        this.state = {}
        this.instructs = []
        this.isLog = isLog
    }
    add = (fun, instructName, component) => {
        this.state[instructName] = {
            fun,
            component: component || true
        }
        this.instructs.push(instructName)
    }
    handelRun = (instructName, ...parameter) => {
        if (!this.state[instructName]) this.isLog && console.log(`${instructName} is undefined or Not loaded`)
        
        if (!this.state[instructName].component) this.isLog && console.log(`The target component is not loaded or has been unloaded`)
        
        return this.state[instructName].fun.apply(this.state[instructName].component, parameter)
    }
    handelAsyncRun = (instructName, ...parameter) => {
        if (!this.state[instructName]) return [false, `${instructName} is undefined or Not loaded`]
        if (!this.state[instructName].component) return [false, `The target component is not loaded or has been unloaded`]
        return [true, this.state[instructName].fun.apply(this.state[instructName].component, parameter)]
    }
    run = (instructName,...tar) => {
        return (...par) => {
            if (this) return this.handelRun(instructName, ...tar, ...par)
        }
    }

    asyncRes = (instructName, ...par) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                let st = this.handelAsyncRun(instructName, ...par)
                st[0] && res(st[1])
                this.isLog && console.log(st[1])
            }, 0);
        })
    }

    asyncRun = (instructName,...tar) => {
        return (...par) => {
            return this.asyncRes(instructName,...tar, ...par)
        }
    }
}

let init = (info, arr, isLog) => {
    let _s = {}
    let storage = new Storage(info, arr, isLog)
    _s.add = storage.add
    _s.run = storage.run
    _s.asyncRun = storage.asyncRun
    _s.list = storage.instructs
    Array.isArray(info) && info.forEach(item => {
        _s[Object.keys(item)[0]] = item.Object.keys(item)[0]
    })
    return _s
}

export let createStorage = info => init(info)