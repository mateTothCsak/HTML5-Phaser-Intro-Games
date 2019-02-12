

class Model{
    contructor(){
        this._score = 0;
    }

    set score(val){
        this._score = val;
        console.log("score updated!");
    }

    get score(){
        return this._score;
    }

}