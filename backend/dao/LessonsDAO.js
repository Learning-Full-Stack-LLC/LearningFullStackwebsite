import router from "../api/lessons.routes.js"

export default class LessonsDAO{
    static async injectDB(conn) {
        if (lessons){
            return
        }
        try{
            lessons = await con.db(process.env.RESTLESSONS_NS).collection("restaurants")
        }
        catch(e){
            console.error(
                `Unable to make a collection handle in restaurantsDAO:${e}`
            )
        }
    }

    static async getLessons({
        filters = null,
        page = 0,
        restaurantsPerPage: restaurantsPerPage = 20,
    } = {}){
        let query
        if (filters){
            if ("name" in filters){
                query = { $text: { $search: filters["name"]}}
            }else if ("cuisine" in filters){
                query = {"cuisine": {$eq: filters["cuisine"]}}
            }else if ("zipcode" in filters){
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }
        let cursor

        try {
            cursor = await restaurants
                .find(query)
        }catch (e){
            console.error(`Unable to get restaurants${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurants * page)
        try{
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = page === 0 ? await restaurants.countDocument(query) : 0

            return { restaurantsList, totalNumRestaurants }
        }catch(e){
            console.error(
                `Unable to convert cursor ${e}`
            )
            return {restaurantsList: [], totalNumRestaurants: 0}
        }

        
    }
}