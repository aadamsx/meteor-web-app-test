import { People_1, People_2 } from './collections';

export class Person {
  constructor(id, db) {

    if (db === 'database_1') {
      ({
        firstName: this._First,
        middleName: this._Middle,
        lastName: this._Last,
        gender: this._Gender,
      } = People_1.findOne({ _personId: id }));
    }
    else if (db === 'database_2') {
      ({
        firstName: this._First,
        middleName: this._Middle,
        lastName: this._Last,
        gender: this._Gender,
      } = People_2.findOne({ _personId: id }));
    }
  }
  get First() { return this._First; }
  get Middle() { return this._Middle; }
  get Last() { return this._Last; }
  get Gender() { return this._Gender; }
}
