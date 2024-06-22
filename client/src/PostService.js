import axios from 'axios';

const url = 'api/posts/';

class PostService{


    static getPosts() {
        return axios.get(url)
            .then(res => res.data.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt)
            })))
            .catch(err => {
                throw err;
            });
    }

    static insertPost(title, name, age, gender, contact, sport, skillLevel, activityType, location, travelDistance, description, date){

        return axios.post(url, {
            title,
            name,
            age,
            gender,
            contact,
            sport,
            skillLevel,
            activityType,
            location,
            travelDistance,
            description,
            date,
        });
    }

    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }

    static updatePost(id, title, name, age, gender, contact, sport, skillLevel, activityType, location, travelDistance, description, date){
        return axios.patch(`${url}${id}`, {
            title,
            name,
            age,
            gender,
            contact,
            sport,
            skillLevel,
            activityType,
            location,
            travelDistance,
            description,
            date,
        });
    }

}

export default PostService;