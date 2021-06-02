import {getEnvVariable} from '../environment';
import {Http} from './http';

export class Api {
  static login(data) {
    return Http.post(getEnvVariable().auth_url, data, {baseURL: null});
  }
  static getDiaryItems() {
    return Http.get('/diary.json');
  }
  static addDiaryItem(data) {
    return Http.post('/diary.json', data);
  }
  static updateDiaryItem(data, id) {
    return Http.patch('/diary/' + `${id}.json`, data);
  }
  static deleteDiaryItem(id) {
    return Http.delete('/diary/' + `${id}.json`);
  }
}
