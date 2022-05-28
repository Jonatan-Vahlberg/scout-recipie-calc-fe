


export type StorageKey = "@LOCAL_CART" | "@LOCAL_CART_UPDATED_AT" | "@LOCAL_ACCESS" | "@LOCAL_REFRESH" | "@LOCAL_PORTIONS";


class StorageKit {


    checkWindowStatus(){
        if(typeof window !== "undefined"){
            return true
        }
        return false
    }


    getItem(key: StorageKey): string | null{
        if(this.checkWindowStatus()){
            return localStorage.getItem(key)
        }
        return null
    }

    setItem(key: StorageKey, value: string): void{
        if(this.checkWindowStatus()){
            localStorage.setItem(key, value)
        }
    }

    removeItem(key: StorageKey): void {
        if(this.checkWindowStatus()){
            localStorage.removeItem(key)
        }
    }
}


export default new StorageKit()