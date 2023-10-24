const fs = require('fs')
const uuid = require('uuid').v4

class  Cart {
    constructor () {
        this.cart = []
    }

    async createCart() {
        try {
            const id = uuid()
            const path = `./cart${id}.json`
            await fs.promises.writeFile(path, JSON.stringify({ id ,cart: []}), 'utf-8')
            const newFile = await fs.promises.readFile(path, 'utf-8')
            console.log(JSON.parse(newFile))
            return JSON.parse(newFile)
        } catch (error) {
            return {error: error.message}
        }
    }

    async getCart(id) {
        try {
            const path = `./cart${id}.json`
            const cartData = await fs.promises.readFile(path, 'utf-8')
            return JSON.parse(cartData)
        } catch (error) {
            return {error: error.message}
        }
    }

    async saveProduct(cid, pid) {
        try {
            const content = await fs.promises.readFile(`./cart${cid}.json`, 'utf-8')
            let data = JSON.parse(content)
            const productIndex = data.cart.findIndex((product) => product.id === pid);
            if (productIndex !== -1) {
                data.cart = data.cart.map((product, index) => {
                    if (index == productIndex) {
                        return { id: product.id, quantity: product.quantity + 1 };
                    }
                    return product;
                });
            } else {
                data.cart.push({ id: pid, quantity: 1 });
            }
            const jsonStr = JSON.stringify(data, null, '\t')
            await fs.promises.writeFile(`./cart${cid}.json`, jsonStr, 'utf-8')
            return 'Product successfully addeds'
        } catch (error) {
            return error
        }
    }
}

const newCart = new Cart()

module.exports = newCart