import { request } from './axios'

const url = 'http://localhost:3000/';

export class VideoService {

    static async getFollowing_list(params) {
        return request(url + 'following_list', params, 'get')
    }
    static async getFor_you_list(params) {
        return request(url + 'for_you_list', params, 'get')
    }

}

