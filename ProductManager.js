const fs = require('fs')
const uuid = require('uuid').v4

class ProductManager {
    constructor (path){
        this.myArray = []
        this.path = path
    }

    async getProducts() {
        try {
            const exitsFile = fs.existsSync(this.path)

            if (!exitsFile) {
                await fs.promises.writeFile(this.path, JSON.stringify({products: []}), 'utf-8')
                const newFile = await fs.promises.readFile(this.path, 'utf-8')
                return console.log(JSON.parse(newFile))
            }

            const content = await fs.promises.readFile(this.path, 'utf-8')

            return JSON.parse(content)
        } catch (error) {
            return {error: error.message}
        }
    }

    async getNumberProducts(limit) {
        const content = await fs.promises.readFile(this.path, 'utf-8')
        let data = JSON.parse(content)
        const contentNew = []
        for (let i = 0; i < limit; i++) {
            contentNew.push(data.products[i])
        }
        return contentNew
    }
    
    async addProducts(title, description, price, thumbnail, code, stock) {
        try {

            const isUndefined = {title, description, price, code, stock}

            if (Object.values(isUndefined).includes(undefined)) throw new Error('All fields are required')

            const exitsFile = fs.existsSync(this.path)

            let data = {}

            if (!exitsFile) throw new Error('File not fount')

            const content = await fs.promises.readFile(this.path, 'utf-8')

            data = JSON.parse(content)

            const codeRepeat = data.products.find(cod => cod.code === code)

            if (codeRepeat) throw new Error('Code repeats')

            // let productId = data.products.length + 1

            const newProduct = {
                // id: productId,
                id: uuid(),
                title,
                description,
                price,
                thumbnail,
                code, 
                stock
            }

            data.products.push(newProduct)

            const jsonStr = JSON.stringify(data, null, '\t')

            await fs.promises.writeFile(this.path, jsonStr, 'utf-8')
            
            return 'Product create with success'
        } catch (error) {
            return {error: error.message}
        }
    }

    async getProductById(id) {
        try {
            const content = await fs.promises.readFile(this.path, 'utf8')

            let data = JSON.parse(content)

            let oneProduct = await data.products.find(produ => produ.id == id)

            if (!oneProduct) throw new Error('Not found')

            return oneProduct
        } catch (error) {
            return {message: error.message}
        }
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');

            let data = JSON.parse(content);   
            
            let isId = data.products.find(product => product.id == id)

            if (!isId) throw new Error('not found product')

            const productIndex = data.products.findIndex(product => product.id == id);

            if (productIndex !== -1) {
                data.products[productIndex].title = title;
                data.products[productIndex].description = description;
                data.products[productIndex].price = price;
                data.products[productIndex].thumbnail = thumbnail;
                data.products[productIndex].code = code;
                data.products[productIndex].stock = stock;
  
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'), 'utf-8');

                return 'Producto actualizado exitosamente.'
            } else {
                throw new Error('Producto no encontrado.');
            }
        } catch (error) {
            return {error: error.message}
        }
    }

    async deleteProduct(id) {
        try {
            let data = {}

            let newData = []
            
            const content = await fs.promises.readFile(this.path, 'utf8')

            data = JSON.parse(content)

            let isId = data.products.find(produ => produ.id == id)

            if (!isId) throw new Error('not found')

            newData = data.products.filter(produ => produ.id != id)

            data.products = newData

            const jsonStr = JSON.stringify(data, null, '\t')

            await fs.promises.writeFile(this.path, jsonStr, 'utf8')

            return 'success delete'
        } catch (error) {
            return {error: error.message}
        }
    }
}

const newProduct = new ProductManager('./data.json')

module.exports = newProduct